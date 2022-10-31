package vttp2022.batch1.csfproject.devbookbackend.models.specificUser;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class UserNotification 
{
    private String name;
    private String content;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public static UserNotification createFromRs(SqlRowSet rs){
        UserNotification noti = new UserNotification();
        noti.setName(rs.getString("notification_name"));
        noti.setContent(rs.getString("notification_content"));
        return noti;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder().add("name", name).add("content", content).build();
    }
    
}
