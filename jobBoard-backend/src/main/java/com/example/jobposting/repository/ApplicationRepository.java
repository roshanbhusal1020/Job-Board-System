package com.example.jobposting.repository;

import com.example.jobposting.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ApplicationRepository extends JpaRepository<Application, Long> {
}