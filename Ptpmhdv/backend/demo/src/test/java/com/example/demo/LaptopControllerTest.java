package com.example.demo;

import com.example.demo.controller.LaptopController;
import com.example.demo.dto.ProductDTO;
import com.example.demo.model.Product;
import com.example.demo.service.LaptopService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class LaptopControllerTest {

    @InjectMocks
    private LaptopController laptopController;

    @Mock
    private LaptopService laptopService;

    private Product fullProduct;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);

        fullProduct = new Product();
        fullProduct.setId(1L);
        fullProduct.setName("Laptop Full");
        fullProduct.setImage("image.jpg");
        fullProduct.setRam("16GB");
        fullProduct.setSsd("1TB");
        fullProduct.setSale_price("20000000");
        fullProduct.setOld_price("22000000");
        fullProduct.setDiscount_percentage("10%");
        fullProduct.setGift("Chuột + Balo");
        fullProduct.setScreen("15.6 inch FHD");
        fullProduct.setCpu("Intel Core i7-12700H");
        fullProduct.setGraphics_card("NVIDIA RTX 3050");
        fullProduct.setBattery("6-cell 90Wh");
        fullProduct.setWeight("2.1kg");
        fullProduct.setStock(10);
        fullProduct.setProductOrders(Collections.emptySet());
    }

    @Test
    public void testGetLaptops() {
        when(laptopService.getLaptops()).thenReturn(List.of(fullProduct));
        List<Product> result = laptopController.getLaptops();
        assertEquals(1, result.size());
        assertEquals("Laptop Full", result.get(0).getName());
    }

    @Test
    public void testGetLaptopById_Found() {
        when(laptopService.getLaptop("1")).thenReturn(Optional.of(fullProduct));
        ResponseEntity<Product> response = laptopController.getLaptopById("1");
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Intel Core i7-12700H", response.getBody().getCpu());
    }

    @Test
    public void testGetLaptopById_NotFound() {
        when(laptopService.getLaptop("99")).thenReturn(Optional.empty());
        ResponseEntity<Product> response = laptopController.getLaptopById("99");
        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    public void testAddLaptop() {
        when(laptopService.saveLaptop(any(Product.class))).thenReturn(fullProduct);
        ResponseEntity<Product> response = laptopController.addLaptop(fullProduct);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Laptop Full", response.getBody().getName());
    }

    @Test
    public void testDeleteLaptop() {
        doNothing().when(laptopService).deleteLaptop("1");
        ResponseEntity<Void> response = laptopController.deleteLaptop("1");
        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    public void testUpdateLaptop() {
        when(laptopService.updateLaptop(eq("1"), any(Product.class))).thenReturn(fullProduct);
        ResponseEntity<Product> response = laptopController.updateLaptop(1L, fullProduct);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("6-cell 90Wh", response.getBody().getBattery());
    }

    @Test
    public void testSearchProducts() {
        when(laptopService.findLaptop("Full")).thenReturn(List.of(fullProduct));
        ResponseEntity<List<Product>> response = laptopController.searchProducts("Full");
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        assertEquals("Laptop Full", response.getBody().get(0).getName());
    }

    @Test
    public void testGetBestSelling() {
        when(laptopService.getBestSellings()).thenReturn(List.of(fullProduct));
        ResponseEntity<List<Product>> response = laptopController.getBestSelling();
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Laptop Full", response.getBody().get(0).getName());
    }

    @Test
    public void testGetProductsWithPagination() {
        ProductDTO dto = new ProductDTO(
                1L,
                "Laptop DTO",
                "image.jpg",
                "16GB",
                "1TB",
                "20000000",
                "22000000",
                "10%",
                "Chuột + Balo",
                "15.6 inch FHD",
                "Intel Core i7-12700H",
                "NVIDIA RTX 3050",
                "6-cell 90Wh",
                "2.1kg"
        );

        Page<ProductDTO> page = new PageImpl<>(List.of(dto));
        when(laptopService.getProductsWithPagination(0, 30)).thenReturn(page);

        ResponseEntity<Page<ProductDTO>> response = laptopController.getProductsWithPagination(0, 30);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().getContent().size());
        assertEquals("Laptop DTO", response.getBody().getContent().get(0).getName());
        assertEquals("Intel Core i7-12700H", response.getBody().getContent().get(0).getCpu());
    }
}

