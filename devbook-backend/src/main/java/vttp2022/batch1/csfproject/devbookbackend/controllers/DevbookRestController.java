package vttp2022.batch1.csfproject.devbookbackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vttp2022.batch1.csfproject.devbookbackend.models.DevbookUser;
import vttp2022.batch1.csfproject.devbookbackend.models.Register;
import vttp2022.batch1.csfproject.devbookbackend.services.DevbookUserService;

@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class DevbookRestController {

    @Autowired
    private DevbookUserService userSvc;

    @GetMapping(path = "/hello")
    public ResponseEntity<String> getHello()
    {
        return ResponseEntity.ok("Hello World");
    }

    @PostMapping(path = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> postRegister(@ModelAttribute Register register)
    {
        System.out.println(register.getWebsites());
        return null;
        // boolean insert = userSvc.insertNewUser(DevbookUser.createFromPayload(payload));
        // if (insert) {
        //     return ResponseEntity.status(HttpStatus.CREATED.value()).body("User created.");
        // } else {
        //     return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User failed to be created.");
        // }
    }

}
