package com.example.demo.service;

import com.example.demo.model.Laptop;

import java.util.List;
import java.util.Optional;

public interface LaptopService {
    List<Laptop> getLaptops();
    List<Laptop> getBestSellings();
    Optional<Laptop> getLaptop(String id);
    Laptop saveLaptop(Laptop laptop);
    void deleteLaptop(String id);
    Laptop updateLaptop(String id, Laptop laptopDetails);
}
