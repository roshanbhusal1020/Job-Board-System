package com.example.jobposting.controller;


import com.example.jobposting.model.User;
import com.example.jobposting.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")

@CrossOrigin(origins = "http://127.0.0.1:5500")


public class UserController {

    private final UserService userservice;

    public UserController(UserService userservice) {
        this.userservice = userservice;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userservice.getAllUsers();
    }


//    @RequestParam = tiny value in URL. kind like $request->input('email') in laravel.
//    @RequestBody = big JSON in body. like json_decode($request->getContent()) in laravel

    @PostMapping("/signup")
    public User signUp(@Valid @RequestParam String name, @Valid @RequestParam String email, HttpSession session) {
        User user = userservice.register(name, email);
//        So what happens is with userservice.register it creates the user but we need the inforamtion about that user
//                so we store in User user so that we can get id or anydetails about that user
//same as laravel, dont complicate it:
//        $user = User::create(['name' => $name, 'email' => $email]);
//        session(['userId' => $user->id]);
        session.setAttribute("userId", user.getId());
        return user;

    }

    @PostMapping("/login")
    public User login(@Valid @RequestParam String name, @Valid @RequestParam String email, HttpSession session) {

        User user = userservice.login(email);

        if (user != null) {
            session.setAttribute("userId", user.getId());
        }
        return user;
    }

    PostMapping("/me")
public User currentUser(HttpSession session) {
        Long userid = (Long) session.getAttribute("userId");
        if (userid != null) {
            return userservice.getbyId(userid); //This fetches the full user from the database using that ID.
        }
}
}
