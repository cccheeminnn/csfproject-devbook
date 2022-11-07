package vttp2022.batch1.csfproject.devbookbackend.models;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

public class DevbookUser {

    private String id;
    private String name;
    private String password; // used for jwt auth
    private String email;
    private String bio;
    private String currentJob;
    private String currentCompany;
    private String previousCompany;
    private String education;
    private Integer likes;
    private float ratings;
    private JsonArray skills;
    private JsonArray websites;
    private JsonArray images;
    private JsonArray comments;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public float getRatings() {
        return ratings;
    }

    public void setRatings(float ratings) {
        this.ratings = ratings;
    }

    public JsonArray getSkills() {
        return skills;
    }

    public void setSkills(JsonArray skills) {
        this.skills = skills;
    }

    public JsonArray getWebsites() {
        return websites;
    }

    public void setWebsites(JsonArray websites) {
        this.websites = websites;
    }

    public JsonArray getImages() {
        return images;
    }

    public void setImages(JsonArray images) {
        this.images = images;
    }

    public JsonArray getComments() {
        return comments;
    }

    public void setComments(JsonArray comments) {
        this.comments = comments;
    }

    // for jwt authentication
    public static DevbookUser createJwtUserFromRowSet(SqlRowSet rs) {
        DevbookUser user = new DevbookUser();
        user.setName(rs.getString("user_name"));
        user.setPassword(rs.getString("user_password"));
        user.setEmail(rs.getString("user_email"));
        return user;
    }

    // parse into jsonobj back to frontend homepage
    public JsonObject toJsonForHomepage() {
        return Json.createObjectBuilder()
                .add("id", id)
                .add("name", name)
                .add("bio", bio)
                .add("currentJob", currentJob)
                .add("currentCompany", currentCompany)
                .add("skills", skills)
                .add("images", images)
                .build();
    }

    // parse into jsonobj back to frontend personal details page
    public JsonObject toJsonForDetailsPage() {
        return Json.createObjectBuilder()
                .add("id", id)
                .add("name", name)
                .add("email", email)
                .add("bio", bio)
                .add("currentJob", currentJob)
                .add("currentCompany", currentCompany)
                .add("previousCompany", previousCompany)
                .add("education", education)
                .add("likes", likes)
                .add("ratings", ratings)
                .add("skills", skills)
                .add("websites", websites)
                .add("images", images)
                .add("comments", comments)
                .build();
    }

}
