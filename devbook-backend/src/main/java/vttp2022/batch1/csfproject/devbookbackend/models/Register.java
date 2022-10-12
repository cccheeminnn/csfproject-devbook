package vttp2022.batch1.csfproject.devbookbackend.models;

import org.springframework.web.multipart.MultipartFile;

public class Register {

    private String name;
    private String email;
    private String password;
    private String bio;
    private String currentJob;
    private String currentCompany;
    private String previousCompany;
    private String education;
    private String skills;
    private String file01Description;
    private String file02Description;
    private String file03Description;

    private MultipartFile file01;
    private MultipartFile file02;
    // private MultipartFile file03;
    // private MultipartFile profilePhoto;

    // public void setProfilePhoto(MultipartFile profilePhoto) {
    //     this.profilePhoto = profilePhoto;
    // }
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
    public String getBio() {
        return bio;
    }
    public void setBio(String bio) {
        this.bio = bio;
    }
    public String getCurrentJob() {
        return currentJob;
    }
    public void setCurrentJob(String currentJob) {
        this.currentJob = currentJob;
    }
    public String getCurrentCompany() {
        return currentCompany;
    }
    public void setCurrentCompany(String currentCompany) {
        this.currentCompany = currentCompany;
    }
    public String getPreviousCompany() {
        return previousCompany;
    }
    public void setPreviousCompany(String previousCompany) {
        this.previousCompany = previousCompany;
    }
    public String getEducation() {
        return education;
    }
    public void setEducation(String education) {
        this.education = education;
    }
    public String getSkills() {
        return skills;
    }
    public void setSkills(String skills) {
        this.skills = skills;
    }
    public String getFile01Description() {
        return file01Description;
    }
    public void setFile01Description(String file01Description) {
        this.file01Description = file01Description;
    }
    public String getFile02Description() {
        return file02Description;
    }
    public void setFile02Description(String file02Description) {
        this.file02Description = file02Description;
    }
    public String getFile03Description() {
        return file03Description;
    }
    public void setFile03Description(String file03Description) {
        this.file03Description = file03Description;
    }

    public MultipartFile getFile01() {
        return file01;
    }
    public void setFile01(MultipartFile file01) {
        this.file01 = file01;
    }
    public MultipartFile getFile02() {
        return file02;
    }
    public void setFile02(MultipartFile file02) {
        System.out.println(">>>> file02 " + file02);
        this.file02 = file02;
    }
    // public MultipartFile getFile03() {
    //     return file03;
    // }
    // public void setFile03(MultipartFile file03) {
    //     this.file03 = file03;
    // }
    // public MultipartFile getProfilePhoto() {
    //     return profilePhoto;
    // }

}
