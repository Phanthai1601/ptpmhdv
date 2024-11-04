package com.example.demo.service.impl;

import com.example.demo.model.Laptop;
import com.example.demo.repository.LaptopRepository;
import com.example.demo.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LaptopServiceImpl implements LaptopService {
    @Autowired
    LaptopRepository laptopRepository;
    @Override
    public List<Laptop> getLaptops() {
        return laptopRepository.findAll();
    }

    @Override
    public List<Laptop> getBestSellings() {
        return laptopRepository.findTop10BestSellingProducts();
    }

    @Override
    public Optional<Laptop> getLaptop(String id) {
        return laptopRepository.findById(Long.valueOf(id));
    }

    @Override
    public Laptop saveLaptop(Laptop laptop) {
        return laptopRepository.save(laptop);
    }

    @Override
    public void deleteLaptop(String id) {
        laptopRepository.deleteById(Long.valueOf(id));
    }

    @Override
    public Laptop updateLaptop(String id, Laptop laptopDetails) {
        Laptop laptop = laptopRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new RuntimeException("Không tìm thấy laptop với ID: " + id));
        laptop.setName(laptopDetails.getName());
        laptop.setImage(laptopDetails.getImage());
        laptop.setRam(laptopDetails.getRam());
        laptop.setSsd(laptopDetails.getSsd());
        laptop.setSale_price(laptopDetails.getSale_price());
        laptop.setOld_price(laptopDetails.getOld_price());
        laptop.setDiscount_percentage(laptopDetails.getDiscount_percentage());
        laptop.setGift(laptopDetails.getGift());
        laptop.setScreen(laptopDetails.getScreen());
        laptop.setCpu(laptopDetails.getCpu());
        laptop.setGraphics_card(laptopDetails.getGraphics_card());
        laptop.setBattery(laptopDetails.getBattery());
        laptop.setWeight(laptopDetails.getWeight());
        laptop.setStock(laptopDetails.getStock());


        return laptopRepository.save(laptop);


    }
}
