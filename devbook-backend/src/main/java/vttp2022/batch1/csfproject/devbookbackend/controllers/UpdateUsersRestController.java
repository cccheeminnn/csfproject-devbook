package vttp2022.batch1.csfproject.devbookbackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vttp2022.batch1.csfproject.devbookbackend.models.Response;
import vttp2022.batch1.csfproject.devbookbackend.models.updateUser.FifthPanel;
import vttp2022.batch1.csfproject.devbookbackend.models.updateUser.FirstPanel;
import vttp2022.batch1.csfproject.devbookbackend.models.updateUser.FourthPanel;
import vttp2022.batch1.csfproject.devbookbackend.models.updateUser.SecondPanel;
import vttp2022.batch1.csfproject.devbookbackend.models.updateUser.ThirdPanel;
import vttp2022.batch1.csfproject.devbookbackend.services.UpdateUserService;

@RestController
@RequestMapping(path = "/api/update")
public class UpdateUsersRestController {

    @Autowired
    private UpdateUserService updateUserSvc;
    
    // PostMapping for updating user profile-----------------------------------------
    // First Panel - Profile Photo and Bio
    @PostMapping(path = "/firstpanel", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> postUpdateFirstPanel(@ModelAttribute FirstPanel firstPanel)
    {
        boolean update = updateUserSvc.updateFirstPanel(firstPanel);

        Response resp = new Response();
        if (update) {
            resp.setCode(HttpStatus.OK.value());
            resp.setMessage("Update successful.");
        } else {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Update was not successful. Please try again.");
        }

        return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
    }

    // Second Panel - Occupation and Education
    @PostMapping(path = "/secondpanel", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postUpdateSecondPanel(@RequestBody String payload) {
        SecondPanel secondPanel = SecondPanel.createFromPayload(payload);
        boolean update = updateUserSvc.updateSecondPanel(secondPanel);

        Response resp = new Response();
        if (update) {
            resp.setCode(HttpStatus.OK.value());
            resp.setMessage("Update successful.");
        } else {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Update was not successful. Please try again.");
        }

        return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
    }

    // Third Panel - Skills
    @PostMapping(path = "/thirdpanel", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postUpdateThirdPanel(@RequestBody String payload) {
        ThirdPanel thirdPanel = ThirdPanel.createFromPayload(payload);
        boolean update = updateUserSvc.updateThirdPanel(thirdPanel);

        Response resp = new Response();
        if (update) {
            resp.setCode(HttpStatus.OK.value());
            resp.setMessage("Update successful.");
        } else {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Update was not successful. Please try again.");
        }

        return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
    }

    // Fourth Panel - Skills
    @PostMapping(path = "/fourthpanel", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postUpdateFourthPanel(@RequestBody String payload) {
        FourthPanel fourthPanel = FourthPanel.createFromPayload(payload);
        boolean update = updateUserSvc.updateFourthPanel(fourthPanel);

        Response resp = new Response();
        if (update) {
            resp.setCode(HttpStatus.OK.value());
            resp.setMessage("Update successful.");
        } else {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Update was not successful. Please try again.");
        }

        return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
    }

    // Fifth Panel - Skills
    @PostMapping(path = "/fifthpanel", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> postUpdateFourthPanel(@ModelAttribute FifthPanel fifthPanel) {
        boolean update = updateUserSvc.updateFifthPanel(fifthPanel);

        Response resp = new Response();
        if (update) {
            resp.setCode(HttpStatus.OK.value());
            resp.setMessage("Update successful.");
        } else {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Update was not successful. Please try again.");
        }

        return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
    }

    // delete specific image
    @GetMapping(path = "/fifthpanel/delete")
    public ResponseEntity<String> getDeleteImage(@RequestParam String userId, @RequestParam String imageName) {
        boolean delete = updateUserSvc.deleteImage(userId, imageName);

        Response resp = new Response();
        if (delete) {
            resp.setCode(HttpStatus.OK.value());
            resp.setMessage("Image delete successful.");
        } else {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Image delete was not successful. Please try again.");
        }

        return ResponseEntity.status(resp.getCode()).body(Response.toJson(resp).toString());
    }
    
}
