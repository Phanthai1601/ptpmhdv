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
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

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
    public void updateUser(Integer userId, User user) {
        User userUpdate = userRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với ID: " + userId));
        userUpdate.setEmail(user.getEmail());
        userUpdate.setAddress(user.getAddress());
        userUpdate.setPhone(user.getPhone());
        userUpdate.setPassword(user.getPassword());
        userUpdate.setGender(user.getGender());
        userUpdate.setFullName(user.getFullName());
        userUpdate.setRole(user.getRole());
        userRepository.save(userUpdate);

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
