package com.example.jobposting.dto;

public class ApplyRequest {

    private Long jobId;
    private String resume;



    public Long getJobId() {
        return jobId;
    }

    public String getResume() {
        return resume;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }


}
