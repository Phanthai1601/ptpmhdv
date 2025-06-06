package com.example.demo;

import com.example.demo.controller.LaptopComparisonController;
import com.example.demo.enums.ComparisonResult;
import com.example.demo.model.LaptopComparisonResult;
import com.example.demo.model.Product;
import com.example.demo.service.LaptopService;
import jakarta.inject.Inject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class LaptopComparisonControllerTest {
    @InjectMocks
    private LaptopComparisonController laptopComparisonController;
    @Mock
    private LaptopService laptopService;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    private Product createProduct(Long id, String name, String screen, String weight, String ram,
                                  String ssd, String battery, String gift, String gpu, String cpu,
                                  String discount, String sale, String image) {
        Product p = new Product();
        p.setId(id);
        p.setName(name);
        p.setScreen(screen);
        p.setWeight(weight);
        p.setRam(ram);
        p.setSsd(ssd);
        p.setBattery(battery);
        p.setGift(gift);
        p.setGraphics_card(gpu);
        p.setCpu(cpu);
        p.setDiscount_percentage(discount);
        p.setSale_price(sale);
        p.setImage(image);
        return p;
    }
    @Test
    void compareLaptops_whenBothProductsExist_shouldReturnComparisonResultList() {
        // Arrange
        Product laptop1 = createProduct(8L, "HP 15 fd0015TU i7 1355U (A19C5PA)", "15.6, Full HD (1920 x 1080)", "1.59 kg", "16 GB",
                "512 GB", "3-cell, 41Wh", "Quà 1.190.000₫", "Intel Iris Xe", "i7, 1355U, 1.7GHz",
                "-14%", "18.890.000₫", "imageA.jpg");

        Product laptop2 = createProduct(9L, "HP 240 G9 i3 1215U (AG2J5AT)", "14, Full HD (1920 x 1080)", "1.42 kg", "8 GB",
                "512 GB", "3-cell, 41Wh", "Quà 1.190.000₫", "Intel UHD", "i3, 1215U, 1.2GHz",
                "-21%", "10.790.000₫", "imageB.jpg");

        when(laptopService.getProductById(8L)).thenReturn(laptop1);
        when(laptopService.getProductById(9L)).thenReturn(laptop2);

        // Act
        ResponseEntity<List<LaptopComparisonResult>> response = laptopComparisonController.compareLaptops(8L, 9L);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        List<LaptopComparisonResult> results = response.getBody();
        assertNotNull(results);
        assertEquals(2, results.size());

        // Laptop 1 (id = 8)
        assertEquals(8L, results.get(0).getId());
        assertEquals(ComparisonResult.TRUE, results.get(0).getCpu());
        assertEquals(ComparisonResult.TRUE, results.get(0).getRam());
        assertEquals(ComparisonResult.EQUAL, results.get(0).getSsd());
        assertEquals(ComparisonResult.TRUE, results.get(0).getGraphics_card());
        assertEquals(ComparisonResult.EQUAL, results.get(0).getBattery());
        assertEquals(ComparisonResult.TRUE, results.get(0).getScreen());
        assertEquals(ComparisonResult.FALSE, results.get(0).getWeight());
        assertEquals(ComparisonResult.FALSE, results.get(0).getSale_price());
        assertEquals(ComparisonResult.FALSE, results.get(0).getDiscount_percentage());
        assertEquals(ComparisonResult.EQUAL, results.get(0).getGift());

        // Laptop 2 (id = 9)
        assertEquals(9L, results.get(1).getId());
        assertEquals(ComparisonResult.FALSE, results.get(1).getCpu());
        assertEquals(ComparisonResult.FALSE, results.get(1).getRam());
        assertEquals(ComparisonResult.EQUAL, results.get(1).getSsd());
        assertEquals(ComparisonResult.FALSE, results.get(1).getGraphics_card());
        assertEquals(ComparisonResult.EQUAL, results.get(1).getBattery());
        assertEquals(ComparisonResult.FALSE, results.get(1).getScreen());
        assertEquals(ComparisonResult.TRUE, results.get(1).getWeight());
        assertEquals(ComparisonResult.TRUE, results.get(1).getSale_price());
        assertEquals(ComparisonResult.TRUE, results.get(1).getDiscount_percentage());
        assertEquals(ComparisonResult.EQUAL, results.get(1).getGift());
    }

    @Test
    void compareLaptops_whenOneProductIsNull_shouldReturnBadRequest() {
        // Arrange
        when(laptopService.getProductById(1L)).thenReturn(null);
        when(laptopService.getProductById(2L)).thenReturn(new Product());

        // Act
        ResponseEntity<List<LaptopComparisonResult>> response = laptopComparisonController.compareLaptops(1L, 2L);

        // Assert
        assertEquals(400, response.getStatusCodeValue());
        assertNull(response.getBody());
    }
}
