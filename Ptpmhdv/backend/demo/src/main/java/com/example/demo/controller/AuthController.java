package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.config.JwtUtil;
import com.example.demo.dto.AdminLoginResponse;
import com.example.demo.dto.MessageErrorLogin;
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

    @Operation(summary = "Login user and return JWT token and user details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Request processed successfully")
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        // Kiểm tra thông tin người dùng
        User existingUser = userService.getUserByEmail(user.getEmail());

        // Kiểm tra nếu người dùng không tồn tại
        if (existingUser == null) {
            return ResponseEntity.ok(new MessageErrorLogin("Email không tồn tại!"));
        }

        // Kiểm tra quyền (role) người dùng
        if (!"Admin".equalsIgnoreCase(existingUser.getRole())) {
            return ResponseEntity.ok(new MessageErrorLogin("Tài khoản này không có quyền quản trị!"));
        }
    
        // Kiểm tra mật khẩu không đúng
        if (!existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(new MessageErrorLogin("Mật khẩu không đúng!"));
        }

        // Tạo token và lấy các thông tin người dùng
        String token = jwtUtil.generateToken(existingUser.getEmail());

        // Trả về đối tượng AdminLoginResponse chứa thông tin người dùng và token
        AdminLoginResponse adminLoginResponse = new AdminLoginResponse(existingUser, token);
        return ResponseEntity.ok(adminLoginResponse);
    }
}
