package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.service.LaptopService;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@Tag(name = "User Controller")
public class UserController {
    @Autowired
    private UserService userService;

    @Operation(summary = "Get all user", description = "Api get all user")
    @GetMapping()
    public List<User> getAllUser() {
        return userService.getAllUsers();
    }
    @GetMapping("/statistics/total")
    public long getUserStatistics() {
        long totalUsers = userService.sumUsers();


        return totalUsers;
    }
    @GetMapping("/statistics/male")
    public long getUserMale() {
        long totalMale = userService.getUserMale();

        return totalMale;
    }
    @GetMapping("/statistics/female")
    public long getUserFemale() {
        long totalFemale = userService.getUserFemale();

        return totalFemale;
    }


}
