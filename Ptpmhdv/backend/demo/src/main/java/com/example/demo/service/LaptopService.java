package com.example.demo.service;


import com.example.demo.model.Product;

import java.util.List;
import java.util.Optional;

public interface LaptopService {
    List<Product> getLaptops();
    List<Product> getBestSellings();
    Optional<Product> getLaptop(String id);
    Product saveLaptop(Product laptop);
    void deleteLaptop(String id);
    Product updateLaptop(String id, Product laptopDetails);
    List<Product> findLaptop(String keyword);
}
