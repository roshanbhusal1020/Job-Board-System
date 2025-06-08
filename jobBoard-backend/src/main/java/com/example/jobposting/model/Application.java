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

}
