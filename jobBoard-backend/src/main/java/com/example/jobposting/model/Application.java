package com.example.jobposting.model;

import com.example.jobposting.model.enums.ApplicationStatus;
import jakarta.persistence.*;

@Entity
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="job_id")
    private Job job;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User applicationUser;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus applicationStatus;

//    private String resume;

    public Long getId() {
        return id;
    }

    public Job getJob() {
        return job;
    }

    public User getApplicationUser() {
        return applicationUser;
    }

    public ApplicationStatus getApplicationStatus() {
        return applicationStatus;
    }

    // === Setters ===
    public void setId(Long id) {
        this.id = id;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public void setApplicationUser(User applicationUser) {
        this.applicationUser = applicationUser;
    }

    public void setApplicationStatus(ApplicationStatus applicationStatus) {
        this.applicationStatus = applicationStatus;
    }

}
