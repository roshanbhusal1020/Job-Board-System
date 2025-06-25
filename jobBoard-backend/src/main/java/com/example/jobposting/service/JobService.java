package com.example.jobposting.service;

import com.example.jobposting.model.Job;
import com.example.jobposting.model.User;

import com.example.jobposting.model.enums.JobStatus;
import com.example.jobposting.repository.JobRepository;
import org.springframework.stereotype.Service;
import java.util.List;

// Marks this class as a service (business logic layer)
@Service
public class JobService {

    // Dependency: Service needs a repository to interact with the database
    private final JobRepository jobRepository;

    // Constructor: Spring injects the JobRepository automatically
    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // Fetches all jobs from the database
    public List<Job> getAllJobs() {
        // Uses the repository's built-in findAll() method (provided by JpaRepository)
        return jobRepository.findAll();
    }

    // Saves a new job to the database
    public Job createJob(String jobTitle, String jobDescription, JobStatus jobStatus,  String jobLocation, String companyName, User user ) {
        // Uses the repository's built-in save() method
        Job job = new Job();

        job.setTitle(jobTitle);
        job.setDescription(jobDescription);
        job.setStatus(jobStatus);
        job.setLocation(jobLocation);
        job.setCompany(companyName);
        job.setUser(user);
        return jobRepository.save(job);
    }
}