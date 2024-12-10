package com.example.demo.service.impl;


import com.example.demo.dto.ProductDTO;
import com.example.demo.model.Product;
import com.example.demo.repository.LaptopRepository;
import com.example.demo.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LaptopServiceImpl implements LaptopService {
    @Autowired
    LaptopRepository laptopRepository;
    @Override
    public List<Product> getLaptops() {
        return laptopRepository.findAll();
    }

    @Override
    public List<Product> getBestSellings() {
        return laptopRepository.findTop10BestSellingProducts();
    }

    @Override
    public Optional<Product> getLaptop(String id) {
        return laptopRepository.findById(Long.valueOf(id));
    }

    @Override
    public Product saveLaptop(Product laptop) {
        return laptopRepository.save(laptop);
    }

    @Override
    public void deleteLaptop(String id) {
        laptopRepository.deleteById(Long.valueOf(id));
    }

    @Override
    public Product updateLaptop(String id, Product laptopDetails) {
        Product laptop = laptopRepository.findById(Long.valueOf(id))
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

    @Override
    public List<Product> findLaptop(String keyword) {
        return laptopRepository.findByNameContainingIgnoreCase(keyword);
    }

    @Override
    public Page<ProductDTO> getProductsWithPagination(int page, int size) {
        Page<Product> products = laptopRepository.findAll(PageRequest.of(page, size));
        return products.map(this::convertToDTO);
    }

    @Override
    public Product getProductById(Long id) {
        return laptopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }


    private  ProductDTO convertToDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getImage(),
                product.getRam(),
                product.getSsd(),
                product.getSale_price(),
                product.getOld_price(),
                product.getDiscount_percentage(),
                product.getGift(),
                product.getScreen(),
                product.getCpu(),
                product.getGraphics_card(),
                product.getBattery(),
                product.getWeight()
        );
    }


}
