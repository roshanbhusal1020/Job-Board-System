package com.example.jobposting.controller;


import com.example.jobposting.dto.ApplyRequest;
import com.example.jobposting.model.Job;
import com.example.jobposting.model.User;
import com.example.jobposting.model.enums.JobStatus;
import com.example.jobposting.service.JobService;
import com.example.jobposting.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

// Marks this class as a REST controller to handle HTTP requests/responses
@RestController
// All endpoints in this controller start with "/jobs"
@RequestMapping("/jobs")
// Allows cross-origin requests (e.g., from a frontend app)
@CrossOrigin(origins = "http://localhost:5500")  // or whatever your frontend address is

public class JobController {

    // Dependency: Controller needs a service to handle business logic
    private final JobService jobService;
    private final UserService userService;

    // Constructor: Spring injects the JobService automatically (dependency injection)
    public JobController(JobService jobService, UserService userService) {
        this.jobService = jobService;
        this.userService = userService;
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

    @GetMapping("/jobStatus")
    public JobStatus[] getJobStatus() {
        return JobStatus.values();
    }


    @PostMapping("/createJob")
    public Job createJob(@Valid @RequestParam String jobTitle, @Valid @RequestParam String jobDescription, @Valid @RequestParam JobStatus jobStatus, String jobLocation, String companyName,  HttpSession session) {
        // @RequestBody converts the incoming JSON to a Job object

        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You are not logged in");
        }

        User user = userService.getbyId(userId);



        Job job  = jobService.createJob(jobTitle, jobDescription, jobStatus, jobLocation, companyName, user );

        if (job != null) {
            session.setAttribute("jobId", job.getId());
            return job;
        }
        else  {
            return null;

        }
    }

    @GetMapping("/getEmployersJobs")
    public ResponseEntity<?> getEmployerJobs(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        List<Job> jobs = jobService.getJobByUserId(userId);
        return ResponseEntity.ok(jobs);
    }



    @PostMapping("/job/apply")
    public ResponseEntity<String> applyToJobs (@RequestBody ApplyRequest applyRequest, HttpSession session) {
        Long userid = (Long) session.getAttribute("userId");

        if (userid==null) {
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You must log in to apply ");
        }
        else {
            if (jobService.createApplication(userid, applyRequest)) {
                return ResponseEntity.ok("Application successful");
            }
            else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Application failed");
            }
        }


    }


}





