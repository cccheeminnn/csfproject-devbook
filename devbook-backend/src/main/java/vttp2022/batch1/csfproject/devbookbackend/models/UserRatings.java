package vttp2022.batch1.csfproject.devbookbackend.models;

import java.io.StringReader;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class UserRatings {

    private String userEmail;
    private String currentUserEmail;
    private float ratingGiven;

    public String getUserEmail() {
        return userEmail;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getCurrentUserEmail() {
        return currentUserEmail;
    }
    public void setCurrentUserEmail(String currentUserEmail) {
        this.currentUserEmail = currentUserEmail;
    }

    public float getRatingGiven() {
        return ratingGiven;
    }
    public void setRatingGiven(float ratingGiven) {
        this.ratingGiven = ratingGiven;
    }

    public static UserRatings createFromPayload(String payload)
    {
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();
        
        UserRatings userRatings = new UserRatings();
        userRatings.setUserEmail(obj.getString("userEmail"));
        userRatings.setCurrentUserEmail(obj.getString("currentUserEmail"));
        userRatings.setRatingGiven(Float.parseFloat(obj.get("ratingGiven").toString()));

        return userRatings;
    }

    public static UserRatings createFromRowSet(SqlRowSet rs)
    {
        UserRatings userRatings = new UserRatings();
        userRatings.setUserEmail(rs.getString("user_email"));
        userRatings.setCurrentUserEmail(rs.getString("rated_user"));
        userRatings.setRatingGiven(Float.parseFloat(rs.getBigDecimal("ratings").toString()));

        return userRatings;
    }
}
