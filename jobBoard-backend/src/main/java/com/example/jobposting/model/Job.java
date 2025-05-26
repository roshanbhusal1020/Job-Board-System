package com.example.jobposting.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.*;

@Entity
public class Job {
    @Id //this means its  a primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // this means id will auto increment
    private Long id;

    // Validates that 'title' is not null, empty, or whitespace
    // If invalid, returns the message: "Title is required"
    @NotBlank(message = "Title is required")
    private String title;

    private String company;
    private String location;

    // Validates that 'description' is not null, empty, or whitespace
    // If invalid, returns the message: "Description is required"
    @NotBlank(message="Description is required")
    private String description;

    private String status;
    private Long userId;


    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCompany() {
        return company;
    }

    public String getLocation() {
        return location;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
