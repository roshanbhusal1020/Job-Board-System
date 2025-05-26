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


    public User register (String name, String email){
     User user = new User();
     user.setName(name);
     user.setEmail(email);
     return userRepository.save(user);

    }

    public User login (String email) {
        return userRepository.findByEmail(email).orElse(null);

    }

    public User getbyId (Long id) {
        return userRepository.findById(id).orElse(null);
    }


}
