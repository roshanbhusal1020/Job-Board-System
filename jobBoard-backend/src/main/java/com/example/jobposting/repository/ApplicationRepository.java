package com.example.jobposting.repository;

import com.example.jobposting.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByApplicationUserId(Long userId);

}