package vttp2022.batch1.csfproject.devbookbackend.models.UpdateUser;

import org.springframework.web.multipart.MultipartFile;

public class FifthPanel {
    private String userEmail;
    private MultipartFile file01;
    private String file01Description;
    private MultipartFile file02;
    private String file02Description;
    private MultipartFile file03;
    private String file03Description;
    
    public String getUserEmail() {
        return userEmail;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    public MultipartFile getFile01() {
        return file01;
    }
    public void setFile01(MultipartFile file01) {
        this.file01 = file01;
    }
    public String getFile01Description() {
        return file01Description;
    }
    public void setFile01Description(String file01Description) {
        this.file01Description = file01Description;
    }
    public MultipartFile getFile02() {
        return file02;
    }
    public void setFile02(MultipartFile file02) {
        this.file02 = file02;
    }
    public String getFile02Description() {
        return file02Description;
    }
    public void setFile02Description(String file02Description) {
        this.file02Description = file02Description;
    }
    public MultipartFile getFile03() {
        return file03;
    }
    public void setFile03(MultipartFile file03) {
        this.file03 = file03;
    }
    public String getFile03Description() {
        return file03Description;
    }
    public void setFile03Description(String file03Description) {
        this.file03Description = file03Description;
    }

}
