package com.example.demo.service.impl;

import com.example.demo.model.ProductOrder;
import com.example.demo.repository.ProductOrderRepository;
import com.example.demo.service.ProductOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductOrderServiceImpl implements ProductOrderService {
    @Autowired
    private ProductOrderRepository productOrderRepository;

    @Override
    public List<ProductOrder> productOrders() {
        return productOrderRepository.findAll();
    }
}
