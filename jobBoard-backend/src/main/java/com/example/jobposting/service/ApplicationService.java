package com.example.jobposting.service;

import com.example.jobposting.dto.ApplicationResponse;
import com.example.jobposting.dto.ApplyRequest;
import com.example.jobposting.model.Application;
import com.example.jobposting.model.Job;
import com.example.jobposting.model.User;
import com.example.jobposting.model.enums.ApplicationStatus;
import com.example.jobposting.repository.ApplicationRepository;
import com.example.jobposting.repository.JobRepository;
import com.example.jobposting.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;


    public ApplicationService(ApplicationRepository applicationRepository, JobRepository jobRepository, UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }



    public boolean createApplication(Long userid, ApplyRequest applyRequest) {

        Optional <Job> jobOpt = jobRepository.findById(applyRequest.getJobId()); // Optional is a box that can either contain a value or be empty
        Optional <User> userOpt = userRepository.findById(userid);

        if(jobOpt.isEmpty() || userOpt.isEmpty()) return false;

        Application application = new Application();

        application.setJob(jobOpt.get()); // this jobOpt is like a box that contains the job, we need get() to get the actual job
        application.setApplicationUser(userOpt.get()); // didnt need to add "userId", Spring Data JPA figures out the ID behind the scenes.
        application.setApplicationStatus(ApplicationStatus.APPLIED);

        applicationRepository.save(application);
        return true;
    }

    public List<ApplicationResponse> getApplicationsForUser(Long userid) {

//        return applicationRepository.findByUserId(userid);
        List<Application> applications = applicationRepository.findByApplicationUserId(userid);
        List<ApplicationResponse> result = new ArrayList<>();

        for (Application app : applications) {
            result.add(new ApplicationResponse(app));
        }
        return result;
    }
}
