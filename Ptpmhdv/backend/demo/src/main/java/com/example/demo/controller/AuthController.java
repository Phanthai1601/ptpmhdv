package com.example.demo.controller;

import com.example.demo.model.User; // Sử dụng lớp User
import com.example.demo.service.UserService;
import com.example.demo.config.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@Tag(name = "Authentication controller")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Operation(summary = "Login user and return JWT token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully logged in and token returned"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid credentials")
    })
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        // Kiểm tra thông tin người dùng
        User existingUser   = userService.getUserByEmail(user.getEmail());

        // Kiểm tra role và mật khẩu
        if (existingUser   != null && existingUser .getPassword().equals(user.getPassword())
                && "Admin".equalsIgnoreCase(existingUser .getRole())) {
            String token = jwtUtil.generateToken(existingUser .getEmail());
            return ResponseEntity.ok(token);
        }

        // Trả về lỗi Unauthorized nếu thông tin không hợp lệ
        return ResponseEntity.status(401).body("Unauthorized");
    }
}