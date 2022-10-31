package vttp2022.batch1.csfproject.devbookbackend.controllers;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vttp2022.batch1.csfproject.devbookbackend.models.DevbookUser;
import vttp2022.batch1.csfproject.devbookbackend.models.jwt.JwtRequest;
import vttp2022.batch1.csfproject.devbookbackend.services.DevbookUserService;
import vttp2022.batch1.csfproject.devbookbackend.services.JwtUserDetailsService;
import vttp2022.batch1.csfproject.devbookbackend.utils.JwtTokenUtils;

@RestController
@RequestMapping(path = "/authenticate", produces = MediaType.APPLICATION_JSON_VALUE)
public class JwtAuthRestController {

    @Autowired
    private DevbookUserService userSvc;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtTokenUtils jwtTokenUtils;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postAuthenticate(@RequestBody JwtRequest authRequest, HttpServletResponse response) throws Exception
    {
        try {
            authenticate(authRequest.getUsername(), authRequest.getPassword());
        } catch (BadCredentialsException bce) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST.value())
                .body(bce.getMessage());
        }

        final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(authRequest.getUsername());

        final String token = jwtTokenUtils.generateToken(userDetails);

        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(60*60*5); // 60*60*5 = 5 hours, same expiry as jwt

        DevbookUser user = userSvc.retrieveUserDetailsEmail(authRequest.getUsername()).get();

        response.addCookie(cookie); // add cookie to response
        return ResponseEntity.ok(user);
    }

    private void authenticate(String username, String password) throws Exception
    {
        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (BadCredentialsException badCredentialsException) {
            throw new BadCredentialsException("INVALID_CREDENTIALS", badCredentialsException);
        }
    }

}
