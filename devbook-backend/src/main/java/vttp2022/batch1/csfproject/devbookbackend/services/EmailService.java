package vttp2022.batch1.csfproject.devbookbackend.services;

import java.net.MalformedURLException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;
    
    @Async("threadPoolTaskExecutor")
    public void sendVerificationEmail(String toEmail, String link) throws MessagingException, MalformedURLException{
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
        
        messageHelper.setSubject("Devbook Password Verification");
        messageHelper.setTo(toEmail);
        messageHelper.setText(
            """
                Thank you for signing up! <br/><br/>
            
            
                Please verify your email by clicking the link below! <br/><br/>
            """+"<a href='"+link+"'>"+link+"</a>", true);
        messageHelper.setFrom(from);

        mailSender.send(mimeMessage);
    }}
