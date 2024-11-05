package com.example.demo.controller;


import com.example.demo.model.Product;
import com.example.demo.model.ProductOrder;
import com.example.demo.service.LaptopService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/laptops")
@Tag(name = "Laptop Controller")
public class LaptopController {
    @Autowired
    private LaptopService laptopService;

    @Operation(summary = "Get all laptops", description = "Api get all laptop")
    @GetMapping()
    public List<Product> getLaptops() {
        return laptopService.getLaptops();
    }

    @GetMapping("/bestSelling")
    public ResponseEntity<List<Product>> getBestSelling() {
        List<Product> best = laptopService.getBestSellings();
        return ResponseEntity.ok(best);
    }

    @Operation(summary = "Get laptop by ID", description = "Api get laptop by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Product> getLaptopById(@PathVariable String id) {
        Optional<Product> laptop = laptopService.getLaptop(id);
        return laptop.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Add new laptop", description = "Api to add new laptop")
    @PostMapping()
    public ResponseEntity<Product> addLaptop(@RequestBody Product laptop) {
        Product savedLaptop = laptopService.saveLaptop(laptop);
        return ResponseEntity.ok(savedLaptop);
    }

    @Operation(summary = "Delete laptop by ID", description = "Api to delete laptop by ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLaptop(@PathVariable String id) {
        laptopService.deleteLaptop(id);
        return ResponseEntity.noContent().build();
    }
    @Operation(summary = "Update Laptop by Id", description ="Api to update laptop by Id")
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateLaptop(@PathVariable Long id, @RequestBody Product laptopDetails) {
        Product updatedLaptop = laptopService.updateLaptop(String.valueOf(id), laptopDetails);
        return ResponseEntity.ok(updatedLaptop);
    }

}
