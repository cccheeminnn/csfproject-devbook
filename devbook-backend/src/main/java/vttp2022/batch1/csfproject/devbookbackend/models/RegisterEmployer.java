package vttp2022.batch1.csfproject.devbookbackend.models;

import org.springframework.web.multipart.MultipartFile;

public class RegisterEmployer {

    private String name;
    private String email;
    private String password;

    private MultipartFile profilePhoto;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    
    public MultipartFile getProfilePhoto() {
        return profilePhoto;
    }
    public void setProfilePhoto(MultipartFile profilePhoto) {
        this.profilePhoto = profilePhoto;
    }
    
}
