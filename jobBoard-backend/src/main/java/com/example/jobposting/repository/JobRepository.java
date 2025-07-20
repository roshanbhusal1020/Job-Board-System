package com.example.jobposting.repository;

import com.example.jobposting.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Interface for database operations on the Job entity
// Extends JpaRepository: Provides CRUD methods (save, findById, delete, etc.)
// No need to write implementation—Spring Data JPA does it automatically!
public interface JobRepository extends JpaRepository<Job, Long> {
    // Long is the type of the primary key (Job's ID)
    List<Job> findByUserId(Long userId);
}