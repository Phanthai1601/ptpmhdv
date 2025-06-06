package com.example.demo.controller;


import com.example.demo.dto.ProductDTO;
import com.example.demo.model.Product;
import com.example.demo.model.ProductOrder;
import com.example.demo.service.LaptopService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Tag(name = "Laptop Controller")
public class LaptopController {
    @Autowired
    private LaptopService laptopService;

    @Operation(summary = "Get all laptops", description = "Api get all laptop")
    @GetMapping("/api/laptops")
    public List<Product> getLaptops() {
        return laptopService.getLaptops();
    }

    @GetMapping("/api/laptops/bestSelling")
    public ResponseEntity<List<Product>> getBestSelling() {
        List<Product> best = laptopService.getBestSellings();
        return ResponseEntity.ok(best);
    }

    @Operation(summary = "Get laptop by ID", description = "Api get laptop by ID")
    @GetMapping("/api/laptops/{id}")
    public ResponseEntity<Product> getLaptopById(@PathVariable String id) {
        Optional<Product> laptop = laptopService.getLaptop(id);
        return laptop.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Add new laptop", description = "Api to add new laptop")
    @PostMapping("/api/laptops")
    public ResponseEntity<Product> addLaptop(@RequestBody Product laptop) {
        Product savedLaptop = laptopService.saveLaptop(laptop);
        return ResponseEntity.ok(savedLaptop);
    }

    @Operation(summary = "Delete laptop by ID", description = "Api to delete laptop by ID")
    @DeleteMapping("/api/laptops/{id}")
    public ResponseEntity<Void> deleteLaptop(@PathVariable String id) {
        laptopService.deleteLaptop(id);
        return ResponseEntity.noContent().build();
    }
    @Operation(summary = "Update Laptop by Id", description ="Api to update laptop by Id")
    @PutMapping("/api/laptops/{id}")
    public ResponseEntity<Product> updateLaptop(@PathVariable Long id, @RequestBody Product laptopDetails) {
        Product updatedLaptop = laptopService.updateLaptop(String.valueOf(id), laptopDetails);
        return ResponseEntity.ok(updatedLaptop);
    }
    @Operation(summary = "Search Laptop by Name", description = "API find laptop")
    @GetMapping("/api/laptops/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        List<Product> arr = laptopService.findLaptop(keyword);
        return ResponseEntity.ok(arr);
    }

    @Operation(summary = "Laptop for user", description = "Display laptop for user")
    @GetMapping("/api/users/laptops")
    public ResponseEntity<Page<ProductDTO>> getProductsWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size) {
        Page<ProductDTO> products = laptopService.getProductsWithPagination(page, size);
        return ResponseEntity.ok(products);
    }


}
