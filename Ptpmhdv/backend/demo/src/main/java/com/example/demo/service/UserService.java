package com.example.demo.service;

import com.example.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(int id);
    User saveUser(User user);
    void deleteUser(int id);
    void updateUser(Integer userId, User user);
    Integer sumUsers();
    Integer getUserMale();
    Integer getUserFemale();
    User getUserByEmail(String email);
}
