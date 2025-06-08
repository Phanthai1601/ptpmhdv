package com.example.demo;

import com.example.demo.controller.UserController;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        sampleUser = new User();
        sampleUser.setId(1L);
        sampleUser.setFullName("Nguyễn Văn A");
        sampleUser.setEmail("a@gmail.com");
        sampleUser.setPassword("123456");
        sampleUser.setAddress("Hà Nội");
        sampleUser.setPhone("0123456789");
        sampleUser.setGender("Male");
        sampleUser.setRole("USER");
        sampleUser.setOrders(new ArrayList<>());
        sampleUser.setProducts(new ArrayList<>());
    }

    @Test
    void testGetAllUsers() {
        when(userService.getAllUsers()).thenReturn(List.of(sampleUser));

        List<User> result = userController.getAllUsers();

        assertEquals(1, result.size());
        assertEquals("Nguyễn Văn A", result.get(0).getFullName());
    }

    @Test
    void testGetUserById_Found() {
        when(userService.getUserById(1)).thenReturn(Optional.of(sampleUser));

        ResponseEntity<User> response = userController.getUserById(1);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("a@gmail.com", response.getBody().getEmail());
    }

    @Test
    void testGetUserById_NotFound() {
        when(userService.getUserById(99)).thenReturn(Optional.empty());

        ResponseEntity<User> response = userController.getUserById(99);

        assertEquals(404, response.getStatusCodeValue());
        assertNull(response.getBody());
    }

    @Test
    void testCreateUser() {
        when(userService.saveUser(any(User.class))).thenReturn(sampleUser);

        ResponseEntity<User> response = userController.createUser(sampleUser);

        assertEquals(201, response.getStatusCodeValue());
        assertEquals("Nguyễn Văn A", response.getBody().getFullName());
    }

    @Test
    void testDeleteUser() {
        doNothing().when(userService).deleteUser(1);

        ResponseEntity<Void> response = userController.deleteUser(1);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    void testUpdateUser() {
        doNothing().when(userService).updateUser(eq(1), any(User.class));

        ResponseEntity<User> response = userController.updateUser(1, sampleUser);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testCountUsers() {
        when(userService.sumUsers()).thenReturn(10);

        ResponseEntity<Integer> response = userController.countUsers();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(10, response.getBody());
    }

    @Test
    void testCountMaleUsers() {
        when(userService.getUserMale()).thenReturn(6);

        ResponseEntity<Integer> response = userController.countMaleUsers();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(6, response.getBody());
    }

    @Test
    void testCountFemaleUsers() {
        when(userService.getUserFemale()).thenReturn(4);

        ResponseEntity<Integer> response = userController.countFemaleUsers();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(4, response.getBody());
    }
}
