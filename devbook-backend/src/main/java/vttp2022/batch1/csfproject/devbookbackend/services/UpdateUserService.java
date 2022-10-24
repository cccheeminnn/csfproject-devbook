package vttp2022.batch1.csfproject.devbookbackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vttp2022.batch1.csfproject.devbookbackend.models.UpdateUser.FifthPanel;
import vttp2022.batch1.csfproject.devbookbackend.models.UpdateUser.FirstPanel;
import vttp2022.batch1.csfproject.devbookbackend.models.UpdateUser.FourthPanel;
import vttp2022.batch1.csfproject.devbookbackend.models.UpdateUser.SecondPanel;
import vttp2022.batch1.csfproject.devbookbackend.models.UpdateUser.ThirdPanel;
import vttp2022.batch1.csfproject.devbookbackend.repositories.UpdateUserRepository;

@Service
public class UpdateUserService {

    @Autowired
    private UpdateUserRepository updateUserRepo;

    @Autowired
    private DigitalOceanService doSvc;

    public boolean updateFirstPanel(FirstPanel firstPanel)
    {
        boolean saveImgSuccess = false;
        boolean updateBioSuccess = false;

        if (firstPanel.getProfilePhoto().getSize() > 0) {
            String userId = updateUserRepo.retrieveUserId(firstPanel.getUserEmail());
            saveImgSuccess = doSvc.saveImageToDOSpaces(userId, firstPanel.getProfilePhoto(), "profilephoto.jpg");
            updateBioSuccess = updateUserRepo.updateFirstPanelBio(firstPanel);
        } else {
            saveImgSuccess = true;
            updateBioSuccess = updateUserRepo.updateFirstPanelBio(firstPanel);
        }

        if (saveImgSuccess && updateBioSuccess) {
            return true;
        } else {
            return false;
        }
    }

    public boolean updateSecondPanel(SecondPanel secondPanel) {
        return updateUserRepo.updateSecondPanel(secondPanel);
    }

    @Transactional
    public boolean updateThirdPanel(ThirdPanel thirdPanel) {
        return updateUserRepo.updateThirdPanel(thirdPanel);
    }

    @Transactional
    public boolean updateFourthPanel(FourthPanel fourthPanel) {
        return updateUserRepo.updateFourthPanel(fourthPanel);
    }

    public boolean updateFifthPanel(FifthPanel fifthPanel)
    {
        String userEmail = fifthPanel.getUserEmail();
        String userId = updateUserRepo.retrieveUserId(userEmail);
        // file01
        boolean file01UpdateSuccess = updateUserRepo.updateUserImages(
            userId, userEmail, 
            "image01.jpg", fifthPanel.getFile01(), fifthPanel.getFile01Description());
        System.out.println("file01 update: " + file01UpdateSuccess);
        // file02
        boolean file02UpdateSuccess = updateUserRepo.updateUserImages(
            userId, userEmail, 
            "image02.jpg", fifthPanel.getFile02(), fifthPanel.getFile02Description());
        System.out.println("file02 update: " + file02UpdateSuccess);
        // file03
        boolean file03UpdateSuccess = updateUserRepo.updateUserImages(
            userId, userEmail, 
            "image03.jpg", fifthPanel.getFile03(), fifthPanel.getFile03Description());
        System.out.println("file03 update: " + file03UpdateSuccess);

        if (file01UpdateSuccess && file02UpdateSuccess && file03UpdateSuccess)
            return true;
        return false;
    }

    public boolean deleteImage(String userId, String imageName) 
    {
        String userEmail = updateUserRepo.retrieveUserEmail(userId);
        boolean delete = updateUserRepo.deleteUserImage(userId, userEmail, imageName);
        return delete;
    }

}
