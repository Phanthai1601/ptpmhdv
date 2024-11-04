package com.example.demo.controller;

import com.example.demo.model.Laptop;
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
    public List<Laptop> getLaptops() {
        return laptopService.getLaptops();
    }

    @GetMapping("/bestSelling")
    public ResponseEntity<List<Laptop>> getBestSelling() {
        List<Laptop> best = laptopService.getBestSellings();
        return ResponseEntity.ok(best);
    }

    @Operation(summary = "Get laptop by ID", description = "Api get laptop by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Laptop> getLaptopById(@PathVariable String id) {
        Optional<Laptop> laptop = laptopService.getLaptop(id);
        return laptop.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Add new laptop", description = "Api to add new laptop")
    @PostMapping()
    public ResponseEntity<Laptop> addLaptop(@RequestBody Laptop laptop) {
        Laptop savedLaptop = laptopService.saveLaptop(laptop);
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
    public ResponseEntity<Laptop> updateLaptop(@PathVariable Long id, @RequestBody Laptop laptopDetails) {
        Laptop updatedLaptop = laptopService.updateLaptop(String.valueOf(id), laptopDetails);
        return ResponseEntity.ok(updatedLaptop);
    }

}
