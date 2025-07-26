package com.example.jobposting.controller;

import com.example.jobposting.dto.ApplyRequest;
import com.example.jobposting.service.ApplicationService;
import com.example.jobposting.service.JobService;
import com.example.jobposting.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "http://localhost:5500")

public class ApplicationController {
    private final ApplicationService applicationService;
    private final JobService jobService;
    private final UserService userService;

    public ApplicationController(ApplicationService applicationService, JobService jobService, UserService userService) {
        this.applicationService = applicationService;
        this.jobService = jobService;
        this.userService = userService;
    }


    @PostMapping("/apply")
    public ResponseEntity<String> applyToJobs (@RequestBody ApplyRequest applyRequest, HttpSession session) {
        Long userid = (Long) session.getAttribute("userId");

        if (userid==null) {
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You must log in to apply ");
        }

        boolean success = applicationService.createApplication(userid, applyRequest);
        if (success) {
            return ResponseEntity.ok("Application successful");
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Application failed");
        }


    }

    @GetMapping("/getApplications")
    public ResponseEntity<?> getApplications(HttpSession session) {
        Long userid = (Long) session.getAttribute("userId");
        if (userid == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }
        return ResponseEntity.ok(applicationService.getApplicationsForUser(userid));
    }

    @PutMapping("/withdraw/{id}")
    public ResponseEntity<?> withDrawApplication(@PathVariable("id") Long applicationId, HttpSession session) {
        Long userid = (Long) session.getAttribute("userId");

        if (userid == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }
       boolean success =  applicationService.withDrawApplication(applicationId, userid);

        if (success) {
            return ResponseEntity.ok("Withdrawal successful");
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Withdrawal failed");
        }
    }

}
