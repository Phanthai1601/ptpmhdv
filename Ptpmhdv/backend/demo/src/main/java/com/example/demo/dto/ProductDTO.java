package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String image;
    private String ram;
    private String ssd;
    private String salePrice;
    private String oldPrice;
    private String discountPercentage;
    private String gift;
    private String screen;
    private String cpu;
    private String graphicsCard;
    private String battery;
    private String weight;
}
