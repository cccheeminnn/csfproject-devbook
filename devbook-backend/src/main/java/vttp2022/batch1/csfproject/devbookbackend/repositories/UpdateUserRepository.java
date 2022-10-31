package vttp2022.batch1.csfproject.devbookbackend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.JsonObject;
import jakarta.json.JsonValue;
import vttp2022.batch1.csfproject.devbookbackend.models.updateUser.FirstPanel;
import vttp2022.batch1.csfproject.devbookbackend.models.updateUser.FourthPanel;
import vttp2022.batch1.csfproject.devbookbackend.models.updateUser.SecondPanel;
import vttp2022.batch1.csfproject.devbookbackend.models.updateUser.ThirdPanel;
import vttp2022.batch1.csfproject.devbookbackend.services.DigitalOceanService;

import static vttp2022.batch1.csfproject.devbookbackend.repositories.Queries.*;

@Repository
public class UpdateUserRepository {

    @Autowired
    private JdbcTemplate template;

    @Autowired
    private DigitalOceanService doSvc;

    // retrieve user id
    public String retrieveUserId(String userEmail) {
        SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_DETAILS_EMAIL, userEmail);
        if (rs.next()) {
            return rs.getString("user_id");
        } else {
            return "";
        }
    }

    // retrieve user email
    public String retrieveUserEmail(String userId) {
        SqlRowSet rs = template.queryForRowSet(SQL_RETRIEVE_USER_DETAILS_ID, userId);
        if (rs.next()) {
            return rs.getString("user_email");
        } else {
            return "";
        }
    }

    // updates bio
    public boolean updateFirstPanelBio(FirstPanel firstPanel) {
        int update = template.update(SQL_UPDATE_USER_BIO, firstPanel.getBio(), firstPanel.getUserEmail());

        if (update == 1)
            return true;
        return false;
    }

    // updates occupation and education
    public boolean updateSecondPanel(SecondPanel secondPanel) {
        int update = template.update(
                SQL_UPDATE_USER_OCCUPATION,
                secondPanel.getCurrentJob(),
                secondPanel.getCurrentCompany(),
                secondPanel.getPreviousCompany(),
                secondPanel.getEducation(),
                secondPanel.getUserEmail());

        if (update == 1)
            return true;
        return false;
    }

    // updates skills
    public boolean updateThirdPanel(ThirdPanel thirdPanel) {
        int delete = template.update(
                SQL_DELETE_USER_SKILLS, thirdPanel.getUserEmail());

        int update = 0;
        for (JsonValue v : thirdPanel.getSkills()) {
            JsonObject o = v.asJsonObject();
            update = template.update(
                    SQL_INSERT_USER_SKILLS,
                    thirdPanel.getUserEmail(),
                    o.getString("name"),
                    o.getInt("rating"));

            if (update == 0) {
                break;
            }
        }

        if (delete > 0 && update == 1)
            return true;
        return false;
    }

    // updates websites
    public boolean updateFourthPanel(FourthPanel fourthPanel) {
        int delete = template.update(
                SQL_DELETE_USER_WEBSITES, fourthPanel.getUserEmail());

        int update = 0;
        for (JsonValue v : fourthPanel.getWebsites()) {
            JsonObject o = v.asJsonObject();
            update = template.update(
                    SQL_INSERT_USER_WEBSITES,
                    fourthPanel.getUserEmail(),
                    o.getString("name"),
                    o.getString("url"));

            if (update == 0) {
                break;
            }
        }

        if (delete > 0 && update == 1)
            return true;
        return false;
    }

    public boolean deleteUserImage(String userId, String userEmail, String imageName) {
        int update = template.update(SQL_DELETE_USER_IMAGE, userEmail, imageName);
        boolean delete = doSvc.deleteImageFromDOSpaces(userId, imageName);
        if(update == 1 && delete)
            return true;
        return false;
    }

    public boolean updateUserImages(
            String userId, String userEmail,
            String imageName, MultipartFile image, String description) 
    {
        boolean updateSuccessful = false; 

        boolean imageExist = checkImageExist(userEmail, imageName);
        // user uploaded a file in input
        if (image.getSize() > 0) {
            updateSuccessful = 
                doSvc.saveImageToDOSpaces(userId, image, imageName);

            if (imageExist) {
                updateSuccessful = 
                    updateImageDescription(userEmail, imageName, description);
            } else {
                updateSuccessful = 
                    insertImage(userEmail, imageName, description);
            }
        } else { // user didnt upload a file in input01
            if (imageExist) { // update the description
                updateSuccessful = 
                    updateImageDescription(userEmail, imageName, description);
            } else {
                updateSuccessful = true;
            }// if it doesnt exist then dont do anything
        }

        return updateSuccessful;
    }

    // check if screenshot exist
    public boolean checkImageExist(String userEmail, String imageName) {
        SqlRowSet rs = template.queryForRowSet(
                SQL_CHECK_USER_IMAGE_EXIST,
                userEmail,
                imageName);

        if (rs.next())
            return true;
        return false;
    }

    // updates existing screenshots
    public boolean updateImageDescription(String userEmail, String imageName, String description) {
        int update = template.update(
                SQL_UPDATE_USER_IMAGES,
                description,
                userEmail,
                imageName);

        if (update == 1)
            return true;
        return false;
    }

    // insert new screenshot
    public boolean insertImage(String userEmail, String imageName, String description) {
        int update = template.update(
                SQL_INSERT_USER_IMAGES,
                userEmail,
                imageName,
                description);

        if (update == 1)
            return true;
        return false;
    }

}
