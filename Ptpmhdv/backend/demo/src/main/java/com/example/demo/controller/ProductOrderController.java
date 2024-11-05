package com.example.demo.controller;

import com.example.demo.model.ProductOrder;
import com.example.demo.service.ProductOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product_order")
public class ProductOrderController {
    @Autowired
    private ProductOrderService productOrderService;
    @GetMapping
    public List<ProductOrder> getProductOrder() {
        return productOrderService.productOrders();
    }
}
