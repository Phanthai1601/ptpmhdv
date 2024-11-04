package com.example.demo.repository;

import com.example.demo.model.Laptop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LaptopRepository extends JpaRepository<Laptop, Long> {
    @Query(value = "SELECT * FROM products ORDER BY stock DESC LIMIT 10", nativeQuery = true)
    List<Laptop> findTop10BestSellingProducts();
}
