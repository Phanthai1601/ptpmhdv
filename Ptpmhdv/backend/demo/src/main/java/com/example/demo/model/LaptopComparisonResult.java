package com.example.demo.model;

import com.example.demo.enums.ComparisonResult;

public class LaptopComparisonResult {
    private Long id;
    private String name;
    private String image;
    private ComparisonResult ram;
    private ComparisonResult ssd;
    private ComparisonResult sale_price;
    private ComparisonResult discount_percentage;
    private ComparisonResult gift;
    private ComparisonResult screen;
    private ComparisonResult cpu;
    private ComparisonResult graphics_card;
    private ComparisonResult battery;
    private ComparisonResult weight;

    public LaptopComparisonResult(Long id, String name, String image, ComparisonResult ram, ComparisonResult ssd, ComparisonResult sale_price, ComparisonResult discount_percentage, ComparisonResult gift, ComparisonResult screen, ComparisonResult graphics_card, ComparisonResult battery, ComparisonResult weight) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.ram = ram;
        this.ssd = ssd;
        this.sale_price = sale_price;
        this.discount_percentage = discount_percentage;
        this.gift = gift;
        this.screen = screen;
        this.graphics_card = graphics_card;
        this.battery = battery;
        this.weight = weight;
    }

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

    public ComparisonResult getSale_price() {
        return sale_price;
    }

    public void setSale_price(ComparisonResult sale_price) {
        this.sale_price = sale_price;
    }

    public ComparisonResult getDiscount_percentage() {
        return discount_percentage;
    }

    public void setDiscount_percentage(ComparisonResult discount_percentage) {
        this.discount_percentage = discount_percentage;
    }

    public ComparisonResult getGift() {
        return gift;
    }

    public void setGift(ComparisonResult gift) {
        this.gift = gift;
    }

    public ComparisonResult getScreen() {
        return screen;
    }

    public void setScreen(ComparisonResult screen) {
        this.screen = screen;
    }



    public ComparisonResult getGraphics_card() {
        return graphics_card;
    }

    public void setGraphics_card(ComparisonResult graphics_card) {
        this.graphics_card = graphics_card;
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
}