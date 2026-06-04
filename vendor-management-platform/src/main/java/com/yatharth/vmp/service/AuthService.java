package com.yatharth.vmp.service;

import com.yatharth.vmp.dto.auth.AuthResponse;
import com.yatharth.vmp.dto.auth.LoginRequest;
import com.yatharth.vmp.dto.auth.RegisterRequest;
import com.yatharth.vmp.entity.User;
import com.yatharth.vmp.repos.UserRepo;
import com.yatharth.vmp.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String register(RegisterRequest registerRequest){

        if(userRepo.findByEmail(registerRequest.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists");
        }

        User user=new User();
        user.setEmail(registerRequest.getEmail());
        user.setName(registerRequest.getName());

        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        user.setRole("VENDOR");
        userRepo.save(user);

        return "User registered successfully";
    }

    public AuthResponse login(LoginRequest loginRequest){
        User user=userRepo.findByEmail(loginRequest.getEmail()).orElseThrow(()->
                new RuntimeException("Invalid credentials"));

        boolean matches=passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());

        if(!matches){
            throw new RuntimeException("Invalid credentials");
        }

        String token= jwtService.generateToken(user.getEmail(), user.getRole());

        return new AuthResponse(token);
    }

}
