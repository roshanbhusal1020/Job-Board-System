package com.example.jobposting.controller;


import com.example.jobposting.model.Job;
import com.example.jobposting.service.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.validation.BindingResult;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Marks this class as a REST controller to handle HTTP requests/responses
@RestController
// All endpoints in this controller start with "/jobs"
@RequestMapping("/jobs")
// Allows cross-origin requests (e.g., from a frontend app)
@CrossOrigin(origins = "http://127.0.0.1:5500")  // or whatever your frontend address is

public class JobController {

    // Dependency: Controller needs a service to handle business logic
    private final JobService jobService;

    // Constructor: Spring injects the JobService automatically (dependency injection)
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // GET /jobs → Returns all jobs
    @GetMapping
    public List<Job> getAllJobs() {
        // Delegate the work to the service layer
        return jobService.getAllJobs();
    }

    // POST /jobs → Creates a new job
    // Handles HTTP POST requests to "/jobs"
    // @Valid → Triggers validation on the 'job' object before this method runs
    // @RequestBody → Converts the incoming JSON into a 'Job' object

    @PostMapping
    public ResponseEntity<?> createJob(@Valid @RequestBody Job job, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));

            System.out.println("❌ Validation triggered manually: " + errors);
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        System.out.println("✅ Job passed validation: " + job.getTitle());
        return new ResponseEntity<>(jobService.createJob(job), HttpStatus.CREATED);
    }

}