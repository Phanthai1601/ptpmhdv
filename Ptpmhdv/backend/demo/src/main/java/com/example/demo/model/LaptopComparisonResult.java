package com.example.demo.model;

import com.example.demo.enums.ComparisonResult;

public class LaptopComparisonResult {
    private Long id;
    private String name;
    private String image;
    private ComparisonResult ram;
    private ComparisonResult ssd;
    private ComparisonResult salePrice;
    private ComparisonResult discountPercentage;
    private ComparisonResult gift;
    private ComparisonResult screen;
    private ComparisonResult cpu;
    private ComparisonResult gpu;
    private ComparisonResult battery;
    private ComparisonResult weight;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public ComparisonResult getRam() {
        return ram;
    }

    public void setRam(ComparisonResult ram) {
        this.ram = ram;
    }

    public ComparisonResult getSsd() {
        return ssd;
    }

    public void setSsd(ComparisonResult ssd) {
        this.ssd = ssd;
    }


    public LaptopComparisonResult(Long id, String name, String image, ComparisonResult ram, ComparisonResult ssd, ComparisonResult salePrice, ComparisonResult gpu, ComparisonResult discountPercentage, ComparisonResult gift,ComparisonResult screen, ComparisonResult battery, ComparisonResult weight) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.ram = ram;
        this.ssd = ssd;
        this.battery = battery;
        this.gift = gift;
        this.screen = screen;
        this.weight = weight;
        this.gpu = gpu;
        this.discountPercentage = discountPercentage;
        this.salePrice = salePrice;
    }



    public ComparisonResult getDiscountPercentage() {
        return discountPercentage;
    }

    public ComparisonResult getScreen() {
        return screen;
    }

    public void setScreen(ComparisonResult screen) {
        this.screen = screen;
    }

    public void setDiscountPercentage(ComparisonResult discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public ComparisonResult getGift() {
        return gift;
    }

    public void setGift(ComparisonResult gift) {
        this.gift = gift;
    }

    public ComparisonResult getBattery() {
        return battery;
    }

    public void setBattery(ComparisonResult battery) {
        this.battery = battery;
    }

    public ComparisonResult getWeight() {
        return weight;
    }

    public void setWeight(ComparisonResult weight) {
        this.weight = weight;
    }

    public ComparisonResult getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(ComparisonResult salePrice) {
        this.salePrice = salePrice;
    }

    public ComparisonResult getGpu() {
        return gpu;
    }

    public void setGpu(ComparisonResult gpu) {
        this.gpu = gpu;
    }
}
