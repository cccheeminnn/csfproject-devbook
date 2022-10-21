package vttp2022.batch1.csfproject.devbookbackend.models;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Response {

    private String message;
    private Integer code;
    private String data;

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public Integer getCode() {
        return code;
    }
    public void setCode(Integer code) {
        this.code = code;
    }
    public String getData() {
        return data;
    }
    public void setData(String data) {
        this.data = data;
    }

    public static JsonObject toJson(Response resp) {

        if (resp.getData() == null) {
            resp.setData("");
        }
        return Json.createObjectBuilder()
            .add("message", resp.getMessage())
            .add("code", resp.getCode())
            .add("data", resp.getData())
            .build();
    }


}
