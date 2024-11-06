package com.example.demo.service;

import com.example.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(int id);
    User saveUser(User user);
    void deleteUser(int id);
    void updateUser(String fullname, String email, String phone, String password, String address, String gender,Integer userId);
    Integer sumUsers();
    Integer getUserMale();
    Integer getUserFemale();
}
