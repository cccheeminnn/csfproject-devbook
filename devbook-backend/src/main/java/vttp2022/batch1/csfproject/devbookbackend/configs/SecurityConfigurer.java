package vttp2022.batch1.csfproject.devbookbackend.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import vttp2022.batch1.csfproject.devbookbackend.services.JwtUserDetailsService;

@EnableWebSecurity
@EnableGlobalMethodSecurity(
    prePostEnabled = true, // enables Spring Security pre/post annotations
    securedEnabled = true, // determines of @Secured should be enabled
    jsr250Enabled = true) // allow use of @RoleAllowed annotation
public class SecurityConfigurer {

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtAuthEntryPoint jwtAuthEntryPoint;

    @Autowired
    private JwtRequestFilter jwtReqFilter;

    @Value("${spring.security.debug:false}")
    private boolean securityDebug;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception
    {
        // disable csrf
        http.csrf()
            .disable()
            .exceptionHandling().authenticationEntryPoint(jwtAuthEntryPoint).and()
            // dont authenticate this particular request
            .authorizeRequests().antMatchers("/authenticate", "/api/register").permitAll()
            // all other requests requires authentication
            .anyRequest().authenticated()
            // make sure we use stateless session
            // session won't be used/created to store user's state.
            .and().sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Add a filter to validate the tokens with every request
		http.addFilterBefore(jwtReqFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer()
    {
        return (web) -> web.debug(securityDebug)
            .ignoring()
            .antMatchers("/css/**", "/js/**", "/img/**", "/lib/**", "/favicon.ico");
    }

    @Bean
    public AuthenticationManager authenticationManagerBean(
        HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder)
            throws Exception
    {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
            // call loadUserByUsername method, which fetch credentials from database to check against user input id and pw
            .userDetailsService(jwtUserDetailsService)
            .passwordEncoder(bCryptPasswordEncoder)
            .and()
            .build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

}
