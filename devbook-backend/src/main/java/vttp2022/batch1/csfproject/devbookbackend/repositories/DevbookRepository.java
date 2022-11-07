package vttp2022.batch1.csfproject.devbookbackend.repositories;

import java.io.StringReader;
import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp2022.batch1.csfproject.devbookbackend.models.DevbookUser;
import vttp2022.batch1.csfproject.devbookbackend.models.Register;
import vttp2022.batch1.csfproject.devbookbackend.models.specificUser.UserComment;
import vttp2022.batch1.csfproject.devbookbackend.models.specificUser.UserNotification;
import vttp2022.batch1.csfproject.devbookbackend.models.specificUser.UserRatings;
import vttp2022.batch1.csfproject.devbookbackend.services.DigitalOceanService;

import static vttp2022.batch1.csfproject.devbookbackend.repositories.Queries.*;

@Repository
public class DevbookRepository {

    @Autowired
    private JdbcTemplate template;

    @Autowired
    private DigitalOceanService doSvc;

    // for jwt authentication
    public Optional<DevbookUser> checkUserExist(String email)
    {
        SqlRowSet rs = template.queryForRowSet(SQL_CHECK_USER_EXIST, email);
        if (rs.next()) {
            DevbookUser user = DevbookUser.createJwtUserFromRowSet(rs);
            return Optional.of(user);
        } else {
            return Optional.empty();
        }
    }

    // nobody using this?
    public boolean checkUserLogins(String email, String password)
    {
        SqlRowSet rs = template.queryForRowSet(SQL_CHECK_USER_LOGINS, email, password);
        boolean exist = false;
        if (rs.next()) {
            exist = true;
        }
        return exist;
    }

    public String retrieveNameFromEmail(String email) {
        SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_NAME, email);

        if (rs.next()) {
            return rs.getString("user_name");
        } else {
            return "";
        }
    }

    public boolean verifyUser(String userId) {
        int update = template.update(SQL_VERIFY_USER_EMAIL, userId);
        if (update == 1)
            return true;
        return false;
    }

    // for pagination ALL users
    public Integer retrieveTotalUserCount() {
        SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_COUNT_OF_USERS);
        Integer ttlUserCount = 0;
        if (rs.next()) {
            ttlUserCount = rs.getInt("count(*)");
        }
        return ttlUserCount;
    }

    // for pagination filtered users
    public Integer retrieveFilteredUserCount(String filter) {
        SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_COUNT_OF_FILTERED_USERS, ("%"+filter+"%"));
        Integer ttlUserCount = 0;
        if (rs.next()) {
            ttlUserCount = rs.getInt("count(*)");
        }
        return ttlUserCount;
    }

    // for individual user details page
    public Optional<DevbookUser> retrieveUserDetailsId(String id)
    {
        List<DevbookUser> userList = new LinkedList<>();

        SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_DETAILS_ID, id);
        if (rs.next()) {
            DevbookUser user = new DevbookUser();
            user.setId(rs.getString("user_id"));
            user.setName(rs.getString("user_name"));
            user.setEmail(rs.getString("user_email"));
            userList.add(user);
        }

        populateUserImages(userList);
        populateUserOccupation(userList);
        populateUserSkills(userList);
        populateUserWebsites(userList);
        populateUserComments(userList);
        populateUserLikesRatings(userList);

        return Optional.of(userList.get(0));
    }

    // for logged in user details profile page
    public Optional<DevbookUser> retrieveUserDetailsEmail(String email)
    {
        List<DevbookUser> userList = new LinkedList<>();

        SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_DETAILS_EMAIL, email);
        if (rs.next()) {
            DevbookUser user = new DevbookUser();
            user.setId(rs.getString("user_id"));
            user.setName(rs.getString("user_name"));
            user.setEmail(rs.getString("user_email"));
            userList.add(user);
        }

        populateUserImages(userList);
        populateUserOccupation(userList);
        populateUserSkills(userList);
        populateUserWebsites(userList);
        populateUserComments(userList);
        populateUserLikesRatings(userList);

        return Optional.of(userList.get(0));
    }

    public boolean insertComment(UserComment comment)
    {
        System.out.println("repooo " + comment.getEmail());
        int update = template.update(SQL_INSERT_USER_COMMENTS,
            comment.getEmail(),
            comment.getId(),
            comment.getName(),
            comment.getText());

        if (update == 1)
            return true;
        return false;
    }

    // retrieve a list of users who have given a like to this userEmail
    public List<String> retrieveWhoLikedUser(String userEmail)
    {
        List<String> stringList = new LinkedList<>();
        SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_RECEIVED_LIKES_FROM, userEmail);

        if (rs.next()) {
            do {
                String likedUserEmail = rs.getString("liked_user");
                stringList.add(likedUserEmail);
            }
            while (rs.next());
        }

        return stringList;
    }
    // user given a like, updates user_likes_ratings table and who liked user table (user_received_likes)
    public boolean updateUserLikes(
        String emailOfUserGivenALiked, Integer userUpdatedLikes,
        String emailOfUserGivingALike)
    {
        boolean updated = false;
        // update table with individual user likes and ratings, user@devbook.com | likes* | ratings
        int userLikesTableUpdated =
            template.update(SQL_UPDATE_USER_LIKES, userUpdatedLikes, emailOfUserGivenALiked);
        // update table with who given user a like, user@devbook.com | likesGivenFrom@devbook.com
        List<String> userLikedList = retrieveWhoLikedUser(emailOfUserGivenALiked);
        int whoLikedUserTableUpdated = 0;
        for (String email : userLikedList) {
            if (email.equals(emailOfUserGivingALike)) { // check if currentUser given a like already
                whoLikedUserTableUpdated = // if yes, delete from table
                    template.update(SQL_DELETE_USER_RECEIVED_LIKES_FROM, emailOfUserGivenALiked, emailOfUserGivingALike);
                updated = true; // set to true just so below dont trigger
            }
        }
        if (!updated) {
            whoLikedUserTableUpdated = // if no, insert into table
                template.update(SQL_INSERT_USER_RECEIVED_LIKES_FROM, emailOfUserGivenALiked, emailOfUserGivingALike);
        }

        if (userLikesTableUpdated == 1 && whoLikedUserTableUpdated == 1)
            return true;
        return false;
    }

    // retrieve a list of users who have given a rating to this userEmail
    public List<UserRatings> retrieveWhoRatedUser(String userEmail)
    {
        List<UserRatings> userRatingList = new LinkedList<>();
        SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_RECEIVED_RATINGS_FROM, userEmail);

        while (rs.next()) {
            UserRatings userRatings = UserRatings.createFromRowSet(rs);
            userRatingList.add(userRatings);
        }

        return userRatingList;
    }
    // user given a rating, updates user_likes_ratings table and who rated user table (user_received_ratings)
    public float updateUserRatings(
        String emailOfUserGivenARating,
        String emailOfUserGivingARating, float ratingGiven)
    {
        List<UserRatings> userRatingList = retrieveWhoRatedUser(emailOfUserGivenARating);
        float totalRating = 0f; // sum of user current rating
        float calculatedRating = 0f; // calculate user new rating
        float currentUserPrevRating = 0f; // if current user rated user previously
        int currentUserRatedPreviously = 1; // if current user rated user previously
        for (UserRatings userRatings : userRatingList) {
            float rating = userRatings.getRatingGiven();
            totalRating += rating;

            // if current user rates again, we retrieve the old rating for calculation purpose
            if(userRatings.getCurrentUserEmail().equals(emailOfUserGivingARating)) {
                currentUserPrevRating = userRatings.getRatingGiven();
                currentUserRatedPreviously = 0; // dont add to the size of current list, already included
            }
        }
        calculatedRating = (totalRating + ratingGiven - currentUserPrevRating) /
            (userRatingList.size() + currentUserRatedPreviously);

        // update table with individual user likes and ratings, user@devbook.com | likes | ratings*
        int userRatingsTableUpdated =
            template.update(SQL_UPDATE_USER_RATINGS, BigDecimal.valueOf(calculatedRating), emailOfUserGivenARating);

        int whoRatedUserTableUpdated = 0;
        System.out.println("currentUserRatedPreviously? " + currentUserRatedPreviously);
        if (currentUserRatedPreviously == 0) {
            // just updated new rating given by current user
            System.out.println("updating?");
            whoRatedUserTableUpdated =
                template.update(SQL_UPDATE_USER_RECEIVED_RATINGS_FROM, BigDecimal.valueOf(ratingGiven), emailOfUserGivenARating, emailOfUserGivingARating);
        } else {
            // insert into user_received_ratings table with currentUser email and ratingGiven
            System.out.println("inserting?");
            whoRatedUserTableUpdated =
                template.update(SQL_INSERT_USER_RECEIVED_RATINGS_FROM, emailOfUserGivenARating, emailOfUserGivingARating, BigDecimal.valueOf(ratingGiven));
        }

        if (userRatingsTableUpdated == 1 && whoRatedUserTableUpdated == 1)
            return calculatedRating;
        return -1f; // service will check if returned float is negative means something went wrong
    }

    //----------------- INSERT / RETRIEVE USER METHODS
    // for creating a new user
    public boolean insertNewUser(Register newUserReg)
    {
        String userId = UUID.randomUUID().toString().substring(0, 8);

        // user_credentials table
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        int credentials = template.update(SQL_INSERT_NEW_USER_CREDENTIALS,
            userId,
            newUserReg.getName(),
            bCryptPasswordEncoder.encode(newUserReg.getPassword()),
            newUserReg.getEmail(),
            0
        );

        // user_images table
        // profile photo is a required field
        if (newUserReg.getProfilePhoto().getSize() > 0) {
            // so no need update sql just fetch url from digitalocean
            doSvc.saveImageToDOSpaces(userId, newUserReg.getProfilePhoto(), "profilephoto.jpg");
        }
        // just check if size is > 0
        if (newUserReg.getFile01().getSize() > 0) {
            // user uploaded an image in first input id="inputFile03"
            template.update(SQL_INSERT_USER_IMAGES,
                newUserReg.getEmail(),
                "image01.jpg",
                newUserReg.getFile01Description());

            doSvc.saveImageToDOSpaces(userId, newUserReg.getFile01(), "image01.jpg");
        }
        if (newUserReg.getFile02().getSize() > 0) {
            // user uploaded an image in first input id="inputFile03"
            template.update(SQL_INSERT_USER_IMAGES,
                newUserReg.getEmail(),
                "image02.jpg",
                newUserReg.getFile02Description());

            doSvc.saveImageToDOSpaces(userId, newUserReg.getFile02(), "image02.jpg");
        }
        if (newUserReg.getFile03().getSize() > 0) {
            // user uploaded an image in first input id="inputFile03"
            template.update(SQL_INSERT_USER_IMAGES,
                newUserReg.getEmail(),
                "image03.jpg",
                newUserReg.getFile03Description());

            doSvc.saveImageToDOSpaces(userId, newUserReg.getFile03(), "image03.jpg");
        }

        // user_occupation table
        template.update(SQL_INSERT_USER_OCCUPATION,
            newUserReg.getEmail(),
            newUserReg.getCurrentJob(),
            newUserReg.getCurrentCompany(),
            newUserReg.getPreviousCompany(),
            newUserReg.getEducation(),
            newUserReg.getBio()
        );

        JsonReader reader;
        // user_skills table
        if (!newUserReg.getSkills().isEmpty()) {
            reader = Json.createReader(new StringReader(newUserReg.getSkills()));
            JsonArray skillsJsonArr = reader.readArray();
            skillsJsonArr.forEach(val -> {
                JsonObject obj = val.asJsonObject();
                template.update(SQL_INSERT_USER_SKILLS,
                    newUserReg.getEmail(),
                    obj.getString("name"),
                    obj.getInt("rating"));
            });
        }

        // user_websites table
        if (!newUserReg.getWebsites().isEmpty()) {
            reader = Json.createReader(new StringReader(newUserReg.getWebsites()));
            JsonArray websitesJsonArr = reader.readArray();
            websitesJsonArr.forEach(val -> {
                JsonObject obj = val.asJsonObject();
                template.update(SQL_INSERT_USER_WEBSITES,
                    newUserReg.getEmail(),
                    obj.getString("name"),
                    obj.getString("url"));
            });
        }

        // user_likes_ratings table
        template.update(SQL_INSERT_USER_LIKES_RATINGS, newUserReg.getEmail(), 1, 0.0); // default 1 like, ratings 0

        if (credentials == 1)
            return true;
        return false;
    }

    // user_notifications table
    public Integer retrieveNewNotificationsCount(String email) {

        SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_NEW_NOTIFICATIONS_COUNT, email);
        Integer newNotificationsCount = 0;
        if (rs.next()) {
            newNotificationsCount = rs.getInt("count(*)");
        }
        return newNotificationsCount;
    }

    public boolean updateNotificationStatus(String userEmail) {
        int update = template.update(SQL_UPDATE_USER_NOTIFICATIONS_STATUS, userEmail);
        if (update > 0)
            return true;
        return false;
    }

    public Optional<List<UserNotification>> retrieveNotifications(String email) {

        List<UserNotification> notificationsList = new LinkedList<>();

        // sorted by date_time desc, newest first then oldest
        SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_NOTIFICATIONS, email);

        while (rs.next()) {
            // add in same order
            UserNotification notification = UserNotification.createFromRs(rs);
            notificationsList.add(notification);
        }

        if (notificationsList.isEmpty())
            return Optional.empty();

        return Optional.of(notificationsList);
    }

    public int retrieveTotalNotificationsCount(String email) {
        SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_NOTIFICATIONS_TOTAL_COUNT, email);
        rs.next();
        return rs.getInt("count(*)");
    }

    public void deleteOldestNotification(String email) {
        template.update(SQL_DELETE_OLDEST_NOTIFICATION, email);
    }

    public boolean insertNewNotification(
        String emailOfUserNotified, 
        String emailOfUserNotifying, 
        String notificationContent)
    {
        String userName = retrieveNameFromEmail(emailOfUserNotifying);
        int update = template.update(SQL_INSERT_USER_NOTIFICATIONS, emailOfUserNotified, emailOfUserNotifying, userName, notificationContent, "NEW");

        if (update == 1)
            return true;
        return false;
    }

    // -------------------------- START
    // retrieve from mysql ALL users for home page
    public Optional<List<DevbookUser>> retrieveAllUsers(Integer limit, Integer offset)
    {
        // create a list
        List<DevbookUser> userList = new LinkedList<>();

        // create no of users based on total, saving their email too
        SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_LIST_OF_USERS, limit, offset);
        while (rs.next()) {
            DevbookUser user = new DevbookUser();
            user.setId(rs.getString("user_id"));
            user.setName(rs.getString("user_name"));
            user.setEmail(rs.getString("user_email"));
            userList.add(user);
        }
        // update user images
        populateUserImages(userList);
        // update user occupation
        populateUserOccupation(userList);
        // update user skills
        populateUserSkills(userList);
        // education, websites, comments not needed for homepage

        return Optional.of(userList);
    }

    // retrieve from MySQL FILTERED users for home page
    public Optional<List<DevbookUser>> retrieveFilteredUsers(Integer limit, Integer offset, String filter)
    {
        // create a list
        List<DevbookUser> userList = new LinkedList<>();

        // create no of users based on total, saving their email too
        SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_LIST_OF_FILTERED_USERS, ("%"+filter+"%"), limit, offset);
        while (rs.next()) {
            DevbookUser user = new DevbookUser();
            user.setId(rs.getString("user_id"));
            user.setName(rs.getString("user_name"));
            user.setEmail(rs.getString("user_email"));
            userList.add(user);
        }
        // update user images
        populateUserImages(userList);
        // update user occupation
        populateUserOccupation(userList);
        // update user skills
        populateUserSkills(userList);
        // education, websites, comments not needed for homepage

        return Optional.of(userList);
    }

    private void populateUserImages(List<DevbookUser> userList)
    {
        for (int i = 0; i < userList.size(); i++) {
            DevbookUser user = userList.get(i);
            String email = user.getEmail();
            SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_IMAGES, email);

            JsonArrayBuilder builder = Json.createArrayBuilder();
            while (rs.next()) {
                JsonObject jsonObj = Json.createObjectBuilder()
                    .add("name", rs.getString("image_name"))
                    .add("description", rs.getString("image_description"))
                    .build();

                builder.add(jsonObj);
            }
            user.setImages(builder.build());
        }
    }

    private void populateUserOccupation(List<DevbookUser> userList)
    {
        for (int i = 0; i < userList.size(); i++) {
            DevbookUser user = userList.get(i);
            String email = user.getEmail();
            SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_OCCUPATION, email);

            while (rs.next()) {
                user.setCurrentJob(rs.getString("current_occupation"));
                user.setCurrentCompany(rs.getString("current_company"));
                user.setPreviousCompany(rs.getString("previous_company"));
                user.setEducation(rs.getString("education_certification"));
                user.setBio(rs.getString("user_bio"));
            }
        }

    }

    private void populateUserSkills(List<DevbookUser> userList)
    {
        for (int i = 0; i < userList.size(); i++) {
            DevbookUser user = userList.get(i);
            String email = user.getEmail();
            SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_SKILLS, email);

            JsonArrayBuilder builder = Json.createArrayBuilder();
            while (rs.next()) {
                JsonObject jsonObj = Json.createObjectBuilder()
                    .add("name", rs.getString("skill_name"))
                    .add("rating", rs.getString("skill_rating"))
                    .build();

                builder.add(jsonObj);
            }
            user.setSkills(builder.build());
        }
    }

    private void populateUserWebsites(List<DevbookUser> userList)
    {
        for (int i = 0; i < userList.size(); i++) {
            DevbookUser user = userList.get(i);
            String email = user.getEmail();
            SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_WEBSITES, email);

            JsonArrayBuilder builder = Json.createArrayBuilder();
            while (rs.next()) {
                JsonObject jsonObj = Json.createObjectBuilder()
                    .add("name", rs.getString("website_name"))
                    .add("url", rs.getString("website_url"))
                    .build();

                builder.add(jsonObj);
            }
            user.setWebsites(builder.build());
        }
    }

    private void populateUserComments(List<DevbookUser> userList)
    {
        for (DevbookUser user : userList) {
            String email = user.getEmail();
            SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_COMMENTS, email);

            JsonArrayBuilder builder = Json.createArrayBuilder();
            while (rs.next()) {
                JsonObject jsonObj = Json.createObjectBuilder()
                    .add("id", rs.getString("comment_id"))
                    .add("name", rs.getString("comment_name"))
                    .add("text", rs.getString("comment_text"))
                    .build();

                builder.add(jsonObj);
            }
            user.setComments(builder.build());
        }
    }

    private void populateUserLikesRatings(List<DevbookUser> userList)
    {
        for (int i = 0; i < userList.size(); i++) {
            DevbookUser user = userList.get(i);
            String email = user.getEmail();
            SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_LIKES_RATINGS, email);

            while (rs.next()) {
                user.setLikes(rs.getInt("user_likes"));
                user.setRatings(Float.valueOf(rs.getBigDecimal("user_ratings").toString()));
            }
            System.out.println("userRating is " + user.getRatings());
        }

    }
    // retrieve from mysql
    // -------------------------- END

}