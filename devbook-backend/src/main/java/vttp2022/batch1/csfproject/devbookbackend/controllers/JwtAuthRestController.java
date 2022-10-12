package vttp2022.batch1.csfproject.devbookbackend.controllers;

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

import vttp2022.batch1.csfproject.devbookbackend.models.JwtRequest;
import vttp2022.batch1.csfproject.devbookbackend.models.JwtResponse;
import vttp2022.batch1.csfproject.devbookbackend.services.JwtUserDetailsService;
import vttp2022.batch1.csfproject.devbookbackend.utils.JwtTokenUtils;

@RestController
@RequestMapping(path = "/authenticate", produces = MediaType.APPLICATION_JSON_VALUE)
public class JwtAuthRestController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtTokenUtils jwtTokenUtils;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postAuthenticate(@RequestBody JwtRequest authRequest) throws Exception
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

        return ResponseEntity.ok(new JwtResponse(token));
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
