package vttp2022.batch1.csfproject.devbookbackend.models;

import java.io.StringReader;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class DevbookUser {

    private String username;
    private String password;
    private String email;

    public DevbookUser() {

    }

    public DevbookUser(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
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

    public static DevbookUser createFromRowSet(SqlRowSet rs) {
        DevbookUser user = new DevbookUser();
        user.setUsername(rs.getString("user_name"));
        user.setPassword(rs.getString("user_password"));
        user.setEmail(rs.getString("user_email"));
        return user;
    }

    public static DevbookUser createFromPayload(String payload) {
        System.out.println(">>>> payload: " + payload);
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject object = reader.readObject();
        System.out.println(object.getString("name"));
        System.out.println(object.getString("email"));
        System.out.println(object.getString("password"));
        return null;
    }

}
