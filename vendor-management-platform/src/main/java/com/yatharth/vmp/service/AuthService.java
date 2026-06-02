package com.yatharth.vmp.service;

import com.yatharth.vmp.dto.auth.RegisterRequest;
import com.yatharth.vmp.entity.User;
import com.yatharth.vmp.repos.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

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
}
