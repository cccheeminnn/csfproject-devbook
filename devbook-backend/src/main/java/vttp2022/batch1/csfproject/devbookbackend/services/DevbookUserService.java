package vttp2022.batch1.csfproject.devbookbackend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vttp2022.batch1.csfproject.devbookbackend.models.UserComment;
import vttp2022.batch1.csfproject.devbookbackend.models.UserRatings;
import vttp2022.batch1.csfproject.devbookbackend.models.DevbookUser;
import vttp2022.batch1.csfproject.devbookbackend.models.Register;
import vttp2022.batch1.csfproject.devbookbackend.repositories.DevbookRepository;

@Service
public class DevbookUserService {

    @Autowired
    private DevbookRepository devbookRepo;

    @Transactional
    public boolean insertNewUser(Register newUserReg)
    {
        return devbookRepo.insertNewUser(newUserReg);
    }

    public boolean insertComment(UserComment comment) {
        return devbookRepo.insertComment(comment);
    }

    @Transactional
    public boolean insertNewLikes(
        String emailOfUserGivenALiked, Integer userUpdatedLikes,
        String emailOfUserGivingALike)
    {
        return devbookRepo.updateUserLikes(emailOfUserGivenALiked, userUpdatedLikes, emailOfUserGivingALike);
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
        return devbookRepo.updateUserRatings(emailOfUserGivenARating, emailOfUserGivingARating, ratingsGiven);
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

    public Integer retrieveFilteredUserCount(String filter) {
        return devbookRepo.retrieveFilteredUserCount(filter);
    }

    public Optional<DevbookUser> retrieveUserDetailsId(String id) {
        return devbookRepo.retrieveUserDetailsId(id);
    }

    public Optional<DevbookUser> retrieveUserDetailsEmail(String email) {
        return devbookRepo.retrieveUserDetailsEmail(email);
    }
}
