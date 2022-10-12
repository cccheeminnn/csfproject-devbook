package vttp2022.batch1.csfproject.devbookbackend.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import vttp2022.batch1.csfproject.devbookbackend.models.DevbookUser;
import vttp2022.batch1.csfproject.devbookbackend.repositories.DevbookRepository;

// implement Spring Security UserDetailsService
@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private DevbookRepository devbookRepo;

    // overrides loadUserByUsername method for retrieving user details from repo using username
    // Spring Security Auth Manager calls this method for getting the user details from the database
    // when authenticating the user details provided by the user
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException
    {
        Optional<DevbookUser> userOpt = devbookRepo.checkUserExist(email);
        if (!userOpt.isEmpty()) {
            DevbookUser user = userOpt.get();
            // whatever user input, checks against this from db
            return new User(user.getEmail(), user.getPassword(), new ArrayList<>());
            // no need encode password cause alrd encoded form
        } else {
            throw new UsernameNotFoundException("User not found with username: " + email);
        }
    }

}