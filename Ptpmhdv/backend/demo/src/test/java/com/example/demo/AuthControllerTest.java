package com.example.demo;


import com.example.demo.config.JwtUtil;
import com.example.demo.controller.AuthController;
import com.example.demo.dto.AdminLoginResponse;
import com.example.demo.dto.MessageErrorLogin;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private UserService userService;

    @Mock
    private JwtUtil jwtUtil;

    private User adminUser;
    private User loginRequest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        adminUser = new User();
        adminUser.setEmail("admin@gmail.com");
        adminUser.setPassword("admin123");
        adminUser.setRole("Admin");

        loginRequest = new User();
        loginRequest.setEmail("admin@gmail.com");
        loginRequest.setPassword("admin123");
    }

    @Test
    void testLogin_UserNotFound() {
        when(userService.getUserByEmail("admin@gmail.com")).thenReturn(null);

        ResponseEntity<?> response = authController.login(loginRequest);

        assertTrue(response.getBody() instanceof MessageErrorLogin);
        assertEquals("Email không tồn tại!", ((MessageErrorLogin) response.getBody()).getMessage());
    }

    @Test
    void testLogin_NotAdmin() {
        adminUser.setRole("User");
        when(userService.getUserByEmail("admin@gmail.com")).thenReturn(adminUser);

        ResponseEntity<?> response = authController.login(loginRequest);

        assertTrue(response.getBody() instanceof MessageErrorLogin);
        assertEquals("Tài khoản này không có quyền quản trị!", ((MessageErrorLogin) response.getBody()).getMessage());
    }

    @Test
    void testLogin_WrongPassword() {
        adminUser.setPassword("wrong");
        when(userService.getUserByEmail("admin@gmail.com")).thenReturn(adminUser);

        ResponseEntity<?> response = authController.login(loginRequest);

        assertTrue(response.getBody() instanceof MessageErrorLogin);
        assertEquals("Mật khẩu không đúng!", ((MessageErrorLogin) response.getBody()).getMessage());
    }

    @Test
    void testLogin_Success() {
        when(userService.getUserByEmail("admin@gmail.com")).thenReturn(adminUser);
        when(jwtUtil.generateToken("admin@gmail.com")).thenReturn("fake-jwt-token");

        ResponseEntity<?> response = authController.login(loginRequest);

        assertTrue(response.getBody() instanceof AdminLoginResponse);
        AdminLoginResponse loginResponse = (AdminLoginResponse) response.getBody();

        assertEquals("fake-jwt-token", loginResponse.getToken());
    }
}

