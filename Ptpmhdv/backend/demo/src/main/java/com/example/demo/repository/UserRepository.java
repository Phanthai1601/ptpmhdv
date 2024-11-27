package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT COUNT(u) FROM User u")
    long countTotalUsers();
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    User findByEmail(String email);

    @Query("SELECT COUNT(u) FROM User u WHERE u.gender = 'Male'")
    long countMaleUsers();

    @Query("SELECT COUNT(u) FROM User u WHERE u.gender = 'Female'")
    long countFemaleUsers();
    @Modifying
    @Query("update User u set u.fullName= ?1, u.email=?2, u.password=?3, u.address=?4, u.phone=?5, u.gender= ?6 where  u.id= ?7")
    void updateUser(String fullName, String email, String password, String address, String phone, String gender, Integer userId);
}
