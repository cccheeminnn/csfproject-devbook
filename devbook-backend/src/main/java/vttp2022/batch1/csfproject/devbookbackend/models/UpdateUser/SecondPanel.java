package vttp2022.batch1.csfproject.devbookbackend.models.updateUser;

import java.io.StringReader;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class SecondPanel {
    private String userEmail;
    private String currentJob;
    private String currentCompany;
    private String previousCompany;
    private String education;

    public String getUserEmail() {
        return userEmail;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
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

    public static SecondPanel createFromPayload(String payload){
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject object = reader.readObject();

        SecondPanel secondPanel = new SecondPanel();
        secondPanel.setUserEmail(object.getString("userEmail"));
        secondPanel.setCurrentJob(object.getString("currentJob"));
        secondPanel.setCurrentCompany(object.getString("currentCompany"));
        secondPanel.setPreviousCompany(object.getString("previousCompany"));
        secondPanel.setEducation(object.getString("education"));
        return secondPanel;
    }
}
