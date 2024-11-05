package com.example.demo.service;

import com.example.demo.model.ProductOrder;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProductOrderService {
    List<ProductOrder> productOrders();
}
