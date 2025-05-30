package com.example.jobposting.service;


import com.example.jobposting.model.User;
import com.example.jobposting.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User register (String name, String email, int pin){
     User user = new User();
     user.setName(name);
     user.setEmail(email);
     user.setPin(pin);
     return userRepository.save(user);

    }

    public User login (String email, int pin) {
//        return userRepository.findByEmail(email).orElse(null);
        return userRepository.findByEmail(email)
                .filter(user -> user.getPin() == pin)
                .orElse(null);

    }

    public User getbyId (Long id) {
        return userRepository.findById(id).orElse(null);
    }


}
