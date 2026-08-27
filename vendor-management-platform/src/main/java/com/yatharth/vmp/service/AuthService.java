package com.yatharth.vmp.service;

import com.yatharth.vmp.dto.auth.AuthResponse;
import com.yatharth.vmp.dto.auth.LoginRequest;
import com.yatharth.vmp.dto.auth.RegisterRequest;
import com.yatharth.vmp.entity.User;
import com.yatharth.vmp.entity.Vendor;
import com.yatharth.vmp.entity.enums.VendorStatus;
import com.yatharth.vmp.exception.EmailAlreadyExistsException;
import com.yatharth.vmp.repos.UserRepo;
import com.yatharth.vmp.repos.VendorRepo;
import com.yatharth.vmp.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final VendorRepo vendorRepo;
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    public String register(RegisterRequest registerRequest){

        if(userRepo.findByEmail(registerRequest.getEmail()).isPresent()){
            throw new EmailAlreadyExistsException("Email already exists");
        }

        User user=new User();
        user.setEmail(registerRequest.getEmail());
        user.setName(registerRequest.getName());

        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        user.setRole("VENDOR");
        userRepo.save(user);

        Vendor vendor = new Vendor();
        vendor.setCompanyName(null);
        vendor.setGstNumber(null);
        vendor.setPanNumber(null);
        vendor.setStatus(VendorStatus.PENDING);
        vendor.setUser(user);

        vendorRepo.save(vendor);

        try {
            sendEmail(user);
        } catch (Exception e) {
            log.warn("Failed to send welcome email to {}: {}", user.getEmail(), e.getMessage());
        }

        return "User registered successfully";
    }

    public String registerAdmin(RegisterRequest registerRequest){

        if(userRepo.findByEmail(registerRequest.getEmail()).isPresent()){
            throw new EmailAlreadyExistsException("Email already exists");
        }

        User user=new User();
        user.setEmail(registerRequest.getEmail());
        user.setName(registerRequest.getName());

        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        user.setRole("ADMIN");
        userRepo.save(user);

        return "Admin registered successfully";
    }

    private void sendEmail(User user) {
        if (mailUsername == null || mailUsername.isEmpty()) {
            log.info("Mail not configured, skipping welcome email for {}", user.getEmail());
            return;
        }

        String body="Hello "+ user.getName() + ",\n\n" +
                "Your profile has been created successfully on Smart Vendor Management Platform.\n\n" +
                "Please complete your details and upload your documents to get started.\n\n" +
                "Best Regards,\nVMP Team";
        SimpleMailMessage message= new SimpleMailMessage();
        message.setSubject("Registration On Platform Successful");
        message.setFrom(mailUsername);
        message.setTo(user.getEmail());
        message.setText(body);

        javaMailSender.send(message);
    }

    public AuthResponse login(LoginRequest loginRequest){
        User user=userRepo.findByEmail(loginRequest.getEmail()).orElseThrow(()->
                new RuntimeException("Invalid credentials"));

        boolean matches=passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());

        if(!matches){
            throw new RuntimeException("Invalid credentials");
        }

        String token= jwtService.generateToken(user.getEmail(), user.getRole());

        return new AuthResponse(token, user.getRole(), user.getId());
    }

}
