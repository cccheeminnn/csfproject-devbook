package vttp2022.batch1.csfproject.devbookbackend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vttp2022.batch1.csfproject.devbookbackend.models.DevbookUser;
import vttp2022.batch1.csfproject.devbookbackend.models.Register;
import vttp2022.batch1.csfproject.devbookbackend.models.specificUser.UserComment;
import vttp2022.batch1.csfproject.devbookbackend.models.specificUser.UserNotification;
import vttp2022.batch1.csfproject.devbookbackend.models.specificUser.UserRatings;
import vttp2022.batch1.csfproject.devbookbackend.repositories.DevbookRepository;

@Service
public class DevbookUserService {

    String host = "https://devbookapp.herokuapp.com/api/verify/";

    @Autowired
    private DevbookRepository devbookRepo;

    @Transactional
    public boolean insertNewUser(Register newUserReg)
    {
        return devbookRepo.insertNewUser(newUserReg);
    }

    public String generateVerificationLink(String userEmail) {
        DevbookUser user = devbookRepo.retrieveUserDetailsEmail(userEmail).get();
        String userId = user.getId();

        String link = host+userId;
        return link;
    }

    public boolean verifyUser(String userId) {
        return devbookRepo.verifyUser(userId);
    }

    public boolean insertComment(UserComment comment) 
    {
        boolean commentInserted = devbookRepo.insertComment(comment);

        int ttlNotificationCount = devbookRepo.retrieveTotalNotificationsCount(comment.getEmail());
        if (ttlNotificationCount >= 5) {
            devbookRepo.deleteOldestNotification(comment.getEmail());
        }

        boolean notiUpdated = devbookRepo.insertNewNotification(comment.getEmail(), comment.getComment_email(), "commented on your page!");

        if (commentInserted && notiUpdated)
            return true;
        return false;
    }

    @Transactional
    public boolean insertNewLikes(
        String emailOfUserGivenALiked, Integer userUpdatedLikes,
        String emailOfUserGivingALike)
    {
        boolean likeUpdated = devbookRepo.updateUserLikes(emailOfUserGivenALiked, userUpdatedLikes, emailOfUserGivingALike);

        int ttlNotificationCount = devbookRepo.retrieveTotalNotificationsCount(emailOfUserGivenALiked);
        if (ttlNotificationCount >= 5) {
            devbookRepo.deleteOldestNotification(emailOfUserGivenALiked);
        }

        boolean notiUpdated = devbookRepo.insertNewNotification(emailOfUserGivenALiked, emailOfUserGivingALike, "gave you a like!");

        if (likeUpdated && notiUpdated)
            return true;
        return false;
    }

    public boolean checkIfCurrentUserGaveALike(String userEmail, String currentUserEmail) {
        List<String> usersWhoLiked = devbookRepo.retrieveWhoLikedUser(userEmail);
        for (String email : usersWhoLiked) {
            if (email.equals(currentUserEmail)) // those who liked this user if equals currentUser, return true
                return true;
        }
        return false;
    }

    @Transactional
    public float insertNewRatings(
        String emailOfUserGivenARating,
        String emailOfUserGivingARating, float ratingsGiven)
    {
        float updatedRating = devbookRepo.updateUserRatings(emailOfUserGivenARating, emailOfUserGivingARating, ratingsGiven);

        int ttlNotificationCount = devbookRepo.retrieveTotalNotificationsCount(emailOfUserGivenARating);
        if (ttlNotificationCount >= 5) {
            devbookRepo.deleteOldestNotification(emailOfUserGivenARating);
        }

        boolean notiUpdated = devbookRepo.insertNewNotification(emailOfUserGivenARating, emailOfUserGivingARating, "rated you!");

        if (updatedRating > 0f && notiUpdated)
            return updatedRating;
        return 0f;
    }

    public boolean checkIfCurrentUserGaveARating(String userEmail, String currentUserEmail) {
        List<UserRatings> usersWhoRated = devbookRepo.retrieveWhoRatedUser(userEmail);
        for (UserRatings userRatings : usersWhoRated) {
            if (userRatings.getCurrentUserEmail().equals(currentUserEmail)) // those who rated this user if equals currentUser, return true
                return true;
        }
        return false;
    }

    public boolean checkUserExist(String email)
    {
        Optional<DevbookUser> opt = devbookRepo.checkUserExist(email);
        if (opt.isPresent())
            return true;
        return false;
    }

    public Optional<List<DevbookUser>> retrieveAllUsers(Integer limit, Integer offset) {
        return devbookRepo.retrieveAllUsers(limit, offset);
    }

    public Integer retrieveTotalUserCount() {
        return devbookRepo.retrieveTotalUserCount();
    }

    public Optional<List<DevbookUser>> retrieveFilteredUsers(Integer limit, Integer offset, String filter) {
        return devbookRepo.retrieveFilteredUsers(limit, offset, filter);
    }

    public Optional<List<DevbookUser>> retrieveFilteredAlpUsers(Integer limit, Integer offset, String alp) {
        return devbookRepo.retrieveFilteredAlpUsers(limit, offset, alp);
    }

    public Integer retrieveFilteredUserCount(String filter) {
        return devbookRepo.retrieveFilteredUserCount(filter);
    }

    public Integer retrieveFilteredAlpUserCount(String alp) {
        return devbookRepo.retrieveFilteredAlpUserCount(alp);
    }

    public Optional<DevbookUser> retrieveUserDetailsId(String id) {
        return devbookRepo.retrieveUserDetailsId(id);
    }

    public Optional<DevbookUser> retrieveUserDetailsEmail(String email) {
        return devbookRepo.retrieveUserDetailsEmail(email);
    }

    public Integer retrieveNewNotificationsCount(String email) {
        return devbookRepo.retrieveNewNotificationsCount(email);
    }

    public Optional<List<UserNotification>> retrieveNotifications(String email) {
        return devbookRepo.retrieveNotifications(email);
    }

    public boolean updateNotificationStatus(String userEmail) {
        return devbookRepo.updateNotificationStatus(userEmail);
    }

}
