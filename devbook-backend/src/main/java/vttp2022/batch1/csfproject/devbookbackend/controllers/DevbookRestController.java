package vttp2022.batch1.csfproject.devbookbackend.controllers;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp2022.batch1.csfproject.devbookbackend.models.UserComment;
import vttp2022.batch1.csfproject.devbookbackend.models.UserLikes;
import vttp2022.batch1.csfproject.devbookbackend.models.UserRatings;
import vttp2022.batch1.csfproject.devbookbackend.models.DevbookUser;
import vttp2022.batch1.csfproject.devbookbackend.models.Register;
import vttp2022.batch1.csfproject.devbookbackend.models.Response;
import vttp2022.batch1.csfproject.devbookbackend.services.DevbookUserService;
import vttp2022.batch1.csfproject.devbookbackend.services.EmailService;

@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class DevbookRestController {

    @Autowired
    private DevbookUserService userSvc;

    @Autowired
    private EmailService emailSvc;

    // test jwt auth in cookie
    @GetMapping(path = "/helloworld")
    public ResponseEntity<String> getHelloWorld() {
        return ResponseEntity.ok("hello world");
    }

    @GetMapping(path = "/quote")
    public ResponseEntity<String> getQuote() {

        RestTemplate template = new RestTemplate();
        ResponseEntity<String> resp = template.getForEntity("https://zenquotes.io/api/random", String.class);

        InputStream is = new ByteArrayInputStream(resp.getBody().getBytes());
        JsonReader reader = Json.createReader(is);
        JsonArray array = reader.readArray();

        String q = "";
        String a = "";
        JsonObject o = array.get(0).asJsonObject();
        q = o.getString("q");
        a = o.getString("a");

        Response response = new Response();
        response.setCode(HttpStatus.OK.value());
        response.setMessage("Quote received.");
        response.setData("\"" + q + "\"" + " - " + a);
        return ResponseEntity.status(resp.getStatusCode()).body(Response.toJson(response).toString());
    }

    // GetMappings to retrieve ALL users ---START---
    @GetMapping(path = "/retrieveall")
    public ResponseEntity<String> getAllUsers(
            @RequestParam String limit, @RequestParam String offset) {
        Optional<List<DevbookUser>> userListOpt = userSvc.retrieveAllUsers(Integer.parseInt(limit),
                Integer.parseInt(offset));
        Response resp = new Response();
        if (userListOpt.isEmpty()) {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Failed to retrieve users list");
            return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
        } else {
            List<DevbookUser> userList = userListOpt.get();
            JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
            for (DevbookUser user : userList) {
                arrayBuilder.add(user.toJsonForHomepage());
            }
            return ResponseEntity.ok(arrayBuilder.build().toString());
        }
    }

    @GetMapping(path = "/usercount")
    public ResponseEntity<String> getUserCount() {
        Integer ttlUserCount = userSvc.retrieveTotalUserCount();
        Response resp = new Response();
        if (ttlUserCount > 0) {
            return ResponseEntity.ok().body(ttlUserCount.toString());
        } else {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Failed to retrieve total user count.");
            return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
        }
    }
    // GetMappings to retrieve ALL users ---END---

    // GetMappings to retrieve FILTERED users ---START---
    @GetMapping(path = "/retrievefilteredresults")
    public ResponseEntity<String> getFilteredUsers(
            @RequestParam String limit, @RequestParam String offset, @RequestParam String filter) {
        Optional<List<DevbookUser>> userListOpt = userSvc.retrieveFilteredUsers(Integer.parseInt(limit),
                Integer.parseInt(offset), filter);
        Response resp = new Response();
        if (userListOpt.isEmpty()) {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Failed to retrieve filtered users list");
            return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
        } else {
            List<DevbookUser> userList = userListOpt.get();
            JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
            for (DevbookUser user : userList) {
                arrayBuilder.add(user.toJsonForHomepage());
            }
            return ResponseEntity.ok(arrayBuilder.build().toString());
        }
    }

    @GetMapping(path = "/usercount/filtered")
    public ResponseEntity<String> getFilteredUserCount(@RequestParam String filter) {
        Integer ttlUserCount = userSvc.retrieveFilteredUserCount(filter);
        Response resp = new Response();
        if (ttlUserCount > 0) {
            return ResponseEntity.ok().body(ttlUserCount.toString());
        } else {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Failed to retrieve total user count.");
            return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
        }
    }
    // GetMappings to retrieve FILTERED users ---END---

    // for details page
    @GetMapping(path = "/retrieveuserdetails")
    public ResponseEntity<String> getUserDetails(@RequestParam String id)
    {
        Optional<DevbookUser> optUser = userSvc.retrieveUserDetailsId(id);
        Response resp = new Response();
        if (optUser.isEmpty()) {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Failed to retrieve user details");
            return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
        } else {
            DevbookUser user = optUser.get();
            return ResponseEntity.ok().body(user.toJsonForDetailsPage().toString());
        }
    }

    // user verify email
    @GetMapping(path = "/verify/{userId}")
    public ResponseEntity<String> getVerify(@PathVariable(value = "userId") String userId) {
        System.out.println("pathvariable userid " + userId);
        boolean verified = userSvc.verifyUser(userId);

        Response resp = new Response();
        if (verified) {
            resp.setCode(HttpStatus.OK.value());
            resp.setMessage("Email verification successful");
        } else {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Email verification failed.");
        }
        return ResponseEntity.ok().body(Response.toJson(resp).toString());
    }

    // new user creation
    @PostMapping(path = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> postRegister(@ModelAttribute Register register) {
        Response resp = new Response();

        boolean userExist = userSvc.checkUserExist(register.getEmail());
        // if user exist we throw an error back to the request
        if (userExist) {
            resp.setMessage("User %s already exist.".formatted(register.getEmail()));
            resp.setCode(HttpStatus.BAD_REQUEST.value());
        } else {
            boolean userCreated = userSvc.insertNewUser(register);

            // user successfully created
            if (userCreated) {
                resp.setMessage("User %s successfully created.".formatted(register.getEmail()));
                resp.setCode(HttpStatus.CREATED.value());

                try {
                    String link = userSvc.generateVerificationLink(register.getEmail());
                    emailSvc.sendVerificationEmail(register.getEmail(), link);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                resp.setMessage("Something went wrong while trying to create %s user.".formatted(register.getEmail()));
                resp.setCode(HttpStatus.EXPECTATION_FAILED.value());
            }
        }

        return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
    }

    // new comments posted on user page
    @PostMapping(path = "/insertcomment", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postComment(@RequestBody String payload) {
        UserComment comment = UserComment.createFromPayload(payload);
        boolean commentUpdated = userSvc.insertComment(comment);
        Response resp = new Response();
        if (commentUpdated) {
            resp.setMessage("Comment successfully added.");
            resp.setCode(HttpStatus.OK.value());
            resp.setData(comment.toJson().toString());
            return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
        } else {
            resp.setMessage("Comment failed to be added.");
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
        }
    }

    // check if currently logged in user has given a rating to this user
    @GetMapping(path = "/checkrated") // since only logged in can check, no need add to permitAll()
    public ResponseEntity<Boolean> getWhetherUserGaveARating(@RequestParam String userEmail, @RequestParam String currentUser)
    {
        boolean ratedUser = userSvc.checkIfCurrentUserGaveARating(userEmail, currentUser);
        System.out.println("checkrated: " + ratedUser);
        return ResponseEntity.ok().body(ratedUser);
    }

    // ratings given, tallied ratings are calculated at front end, backend just updates
    // since only logged in can check, no need add to permitAll()
    @PostMapping(path = "/rated", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postRated(@RequestBody String payload) {
        UserRatings userRatings = UserRatings.createFromPayload(payload);
        float ratingsUpdated = userSvc.insertNewRatings(
            userRatings.getUserEmail(),
            userRatings.getCurrentUserEmail(),
            userRatings.getRatingGiven());

        Response resp = new Response();
        if (ratingsUpdated > 0f) {
            resp.setCode(HttpStatus.OK.value());
            resp.setMessage("User ratings updated.");
            resp.setData(String.valueOf(ratingsUpdated));
        } else {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Failed to update user ratings.");
        }

        return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
    }

    // check if currently logged in user has given a like to this user
    @GetMapping(path = "/checkliked") // since only logged in can check, no need add to permitAll()
    public ResponseEntity<Boolean> getWhetherUserGaveALike(@RequestParam String userEmail, @RequestParam String currentUser)
    {
        boolean likedUser = userSvc.checkIfCurrentUserGaveALike(userEmail, currentUser);
        if (likedUser) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.ok().body(false);
        }
    }

    // like given, tallied likes are calculated at front end, backend just updates
    // since only logged in can check, no need add to permitAll()
    @PostMapping(path = "/liked", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postLiked(@RequestBody String payload) {
        UserLikes userLikes = UserLikes.createFromPayload(payload);
        boolean likesUpdated = userSvc.insertNewLikes(
                userLikes.getUserEmail(),
                userLikes.getUserLike(),
                userLikes.getCurrentUserEmail());

        Response resp = new Response();
        if (likesUpdated) {
            resp.setCode(HttpStatus.OK.value());
            resp.setMessage("User like count updated.");
        } else {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Failed to update user like count.");
        }

        return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
    }

}
