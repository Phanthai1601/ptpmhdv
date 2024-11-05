package com.example.demo.service.impl;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserSerivceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Integer sumUsers() {
        return Math.toIntExact(userRepository.countTotalUsers());
    }

    @Override
    public Integer getUserMale() {
        return Math.toIntExact(userRepository.countMaleUsers());
    }

    @Override
    public Integer getUserFemale() {
        return Math.toIntExact(userRepository.countFemaleUsers());
    }
}
