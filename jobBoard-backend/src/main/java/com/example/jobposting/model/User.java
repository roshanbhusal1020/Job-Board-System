package com.example.jobposting.model;

import com.example.jobposting.model.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;


@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Email is required")
    private String email;



    @NotNull(message = "Pin is required")
    private int pin;



    private String resume;



    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    public String getName() {
        return name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
    public int getPin() {
        return pin;
    }

    public void setPin(int pin) {
        this.pin = pin;
    }
    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }
    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }
}
