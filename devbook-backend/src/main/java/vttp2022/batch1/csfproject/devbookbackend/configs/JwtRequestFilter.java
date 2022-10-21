package vttp2022.batch1.csfproject.devbookbackend.configs;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import vttp2022.batch1.csfproject.devbookbackend.services.JwtUserDetailsService;
import vttp2022.batch1.csfproject.devbookbackend.utils.JwtTokenUtils;

// any incoming request this class gets executed
// it checks for a valid token, if there is one
// it sets the Authentication header, to specify user is authenticated
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtTokenUtils jwtTokenUtils;

    @Override
    protected void doFilterInternal(
        HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException
    {
		// for jwt in cookies
		Cookie[] cookieArr = request.getCookies();
		String jwtCookieString = null;
		if (cookieArr != null) {
			for (Cookie cookie : cookieArr ) {
				if (cookie.getName().equals("token")) {
					jwtCookieString = cookie.getValue();
				}
			}
		} else {
			System.out.println("No Cookies found in request");
		}
		
		// final String requestTokenHeader = request.getHeader("Authorization"); // for jwt in header

        String username = null;
        // String token = null; // for jwt in header

        // JWT is in the form of "Bearer token", remove Bearer and space to extract token
        // if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) { // for jwt in header
		if (jwtCookieString != null && cookieArr != null) { // for jwt in cookies
			// token = requestTokenHeader.substring(7); // for jwt in header
			try {
				// username = jwtTokenUtils.getUsernameFromToken(token); // for jwt in header
				username = jwtTokenUtils.getUsernameFromToken(jwtCookieString); // for jwt in cookies
			} catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token");
			} catch (ExpiredJwtException e) {
				System.out.println("JWT Token has expired");
			}
		} else {
			// logger.warn("JWT Token does not begin with Bearer String"); // for jwt in header
			logger.warn("JWT token not found in Cookies.");
		}

        // once we get token, we validate it
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);

			// if token is valid configure Spring Security to manually set authentication
			// if (jwtTokenUtils.validateToken(token, userDetails)) { // for jwt in header
			if (jwtTokenUtils.validateToken(jwtCookieString, userDetails)) {
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				// After setting the Authentication in the context, we specify
				// that the current user is authenticated. So it passes the
				// Spring Security Configurations successfully.
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		}

		chain.doFilter(request, response);
    }

}