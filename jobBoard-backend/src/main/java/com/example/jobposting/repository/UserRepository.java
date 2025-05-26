package com.example.jobposting.repository;

import com.example.jobposting.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

// Interface for database operations on the User entity
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data JPA auto-generates CRUD methods here too!
}