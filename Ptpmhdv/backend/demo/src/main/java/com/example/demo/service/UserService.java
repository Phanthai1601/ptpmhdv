package com.example.demo.service;

import com.example.demo.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    Integer sumUsers();
    Integer getUserMale();
    Integer getUserFemale();
}
