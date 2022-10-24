package vttp2022.batch1.csfproject.devbookbackend.models.UpdateUser;

import org.springframework.web.multipart.MultipartFile;

public class FirstPanel {

    private String userEmail;
    private String bio;
    private MultipartFile profilePhoto;

    public String getUserEmail() {
        return userEmail;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    public String getBio() {
        return bio;
    }
    public void setBio(String bio) {
        this.bio = bio;
    }
    public MultipartFile getProfilePhoto() {
        return profilePhoto;
    }
    public void setProfilePhoto(MultipartFile profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

}
