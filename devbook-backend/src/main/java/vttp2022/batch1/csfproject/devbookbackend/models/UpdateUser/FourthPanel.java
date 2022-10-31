package vttp2022.batch1.csfproject.devbookbackend.models.updateUser;

import java.io.StringReader;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class FourthPanel {
    private String userEmail;
    private JsonArray websites;

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public JsonArray getWebsites() {
        return websites;
    }

    public void setWebsites(JsonArray websites) {
        this.websites = websites;
    }

    public static FourthPanel createFromPayload(String payload) {
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject object = reader.readObject();
        JsonArray array = object.getJsonArray("websites");

        FourthPanel fourthPanel = new FourthPanel();
        fourthPanel.setUserEmail(object.getString("userEmail"));
        fourthPanel.setWebsites(array);

        return fourthPanel;
    }

}
