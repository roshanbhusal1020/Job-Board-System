package com.example.jobposting.repository;

import com.example.jobposting.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Interface for database operations on the User entity
public interface UserRepository extends JpaRepository<User, Long> {
//    User findUserByEmail(String email);

    Optional<User> findByEmail(String email); // Optional<User> means: maybe we find the user, maybe we don't

    // Spring Data JPA auto-generates CRUD methods here too!
}