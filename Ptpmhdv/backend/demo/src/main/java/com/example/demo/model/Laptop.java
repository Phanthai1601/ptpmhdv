package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Laptop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String image;
    private String ram;
    private String ssd;
    private String sale_price;
    private String old_price;
    private String discount_percentage;
    private String gift;
    private String  screen;
    private String cpu;
    private String graphics_card;
    private String battery;
    private String weight;
    private Integer stock;




}
