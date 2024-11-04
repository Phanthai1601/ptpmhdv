package com.example.demo.service.impl;

import com.example.demo.model.Revenue;
import com.example.demo.repository.RevenueRepository;
import com.example.demo.service.RevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RevenueServiceImpl implements RevenueService {
    @Autowired
    private RevenueRepository revenueRepository;
    @Override
    public List<Revenue> getRevenue() {
        return revenueRepository.findAll();
    }
}
