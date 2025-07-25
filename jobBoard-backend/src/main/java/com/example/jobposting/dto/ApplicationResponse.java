package com.example.jobposting.dto;

import com.example.jobposting.model.Application;

public class ApplicationResponse {
    private Long applicationId;
    private String applicationStatus;
    private String jobTitle;
    private String companyName;
    private String description;
    private String location;
    private String status;

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public void setApplicationStatus(String applicationStatus) {
        this.applicationStatus = applicationStatus;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public Long getApplicationId() {
        return applicationId;
    }

    public String getApplicationStatus() {
        return applicationStatus;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public String getCompanyName() {
        return companyName;
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
    public ApplicationResponse(Application application) {
        this.applicationId = application.getId();
        this.applicationStatus = application.getApplicationStatus().toString();

        if (application.getJob() != null) {
            this.jobTitle = application.getJob().getTitle();
            this.companyName = application.getJob().getCompany();
            this.description = application.getJob().getDescription();
            this.location = application.getJob().getLocation();
            this.status = application.getJob().getStatus().toString();
        }
    }

}
