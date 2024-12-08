package com.example.demo.dto;

import com.example.demo.model.User;

public class AdminLoginResponse {

    private String email;
    private String fullName;
    private String role;
    private String token;

    public AdminLoginResponse(User user, String token) {
        this.email = user.getEmail();
        this.fullName = user.getFullName();  // Đảm bảo có trường fullName trong User
        this.role = user.getRole();
        this.token = token;
    }

    // Getter và Setter
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
