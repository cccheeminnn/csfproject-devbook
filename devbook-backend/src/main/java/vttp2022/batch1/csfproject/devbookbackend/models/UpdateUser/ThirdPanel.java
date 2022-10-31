package vttp2022.batch1.csfproject.devbookbackend.models.updateUser;

import java.io.StringReader;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class ThirdPanel {
    private String userEmail;
    private JsonArray skills;

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    public JsonArray getSkills() {
        return skills;
    }

    public void setSkills(JsonArray skills) {
        this.skills = skills;
    }

    public static ThirdPanel createFromPayload(String payload) {
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject object = reader.readObject();
        JsonArray array = object.getJsonArray("skills");

        ThirdPanel thirdPanel = new ThirdPanel();
        thirdPanel.setUserEmail(object.getString("userEmail"));
        thirdPanel.setSkills(array);

        return thirdPanel;
    }

}
