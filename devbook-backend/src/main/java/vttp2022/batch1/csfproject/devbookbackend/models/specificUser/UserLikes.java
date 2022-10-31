package vttp2022.batch1.csfproject.devbookbackend.models.specificUser;

import java.io.StringReader;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class UserLikes {

    private String userEmail;
    private Integer userLike;
    private String currentUserEmail;

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Integer getUserLike() {
        return userLike;
    }

    public void setUserLike(Integer userLike) {
        this.userLike = userLike;
    }

    public String getCurrentUserEmail() {
        return currentUserEmail;
    }

    public void setCurrentUserEmail(String currentUserEmail) {
        this.currentUserEmail = currentUserEmail;
    }

    public static UserLikes createFromPayload(String payload)
    {
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();
        UserLikes userLikes = new UserLikes();

        userLikes.setUserEmail(obj.getString("userEmail"));
        userLikes.setUserLike(obj.getInt("userLike"));
        userLikes.setCurrentUserEmail(obj.getString("currentUserEmail"));

        return userLikes;

    }
}
