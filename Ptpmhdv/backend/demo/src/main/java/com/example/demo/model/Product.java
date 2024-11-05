package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {
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
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<ProductOrder> productOrders;




}
