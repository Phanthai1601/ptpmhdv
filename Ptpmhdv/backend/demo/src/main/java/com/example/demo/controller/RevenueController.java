package com.example.demo.controller;

import com.example.demo.model.Revenue;
import com.example.demo.service.RevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/revenue")
public class RevenueController {
    @Autowired
    private RevenueService revenueService;
    @GetMapping
    public ResponseEntity<List<Revenue>> getAllRevenue() {
        List<Revenue> revenues = revenueService.getRevenue();
        return ResponseEntity.ok(revenues);
    }
}
