package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
@Tag(name = "User Controller")
public class UserController {

    @Autowired
    private UserService userService;
    @Operation(summary = "Get all user", description = "Get list User")
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


    @GetMapping("/{id}")
    @Operation(summary = "Get user by id")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping
    @Operation(summary = "create user")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.saveUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    @Operation(summary = "Delete user by id")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Update use by id")
    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Integer userId,
                                           @RequestBody User user) {
        userService.updateUser(userId, user);
        return ResponseEntity.ok().build();
    }
    @Operation(summary = "get total user")
    @GetMapping("/count")
    public ResponseEntity<Integer> countUsers() {
        return ResponseEntity.ok(userService.sumUsers());
    }
    @Operation(summary = "get total male")
    @GetMapping("/count/male")
    public ResponseEntity<Integer> countMaleUsers() {
        return ResponseEntity.ok(userService.getUserMale());
    }
    @Operation(summary = "get total female")
    @GetMapping("/count/female")
    public ResponseEntity<Integer> countFemaleUsers() {
        return ResponseEntity.ok(userService.getUserFemale());
    }
}
