package com.example.demo.service.impl;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserSerivceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(int id) {
        return userRepository.findById(Long.valueOf(id));
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(int id) {
         userRepository.deleteById(Long.valueOf(id));

    }

    @Override
    public void updateUser(String fullname, String email, String phone, String password, String address, String gender, Integer userId) {
        userRepository.updateUser(fullname, email, phone, password, address, gender, userId);
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
