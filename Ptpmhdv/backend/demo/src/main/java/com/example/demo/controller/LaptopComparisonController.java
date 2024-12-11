package com.example.demo.controller;

import com.example.demo.enums.ComparisonResult;
import com.example.demo.model.LaptopComparisonResult;
import com.example.demo.model.Product;
import com.example.demo.service.LaptopService;
import com.example.demo.utils.LaptopComparisonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
public class LaptopComparisonController {
    @Autowired
    LaptopService laptopService;
    @PostMapping("/compare")
    public ResponseEntity<List<LaptopComparisonResult>> compareLaptops(
            @RequestParam Long id1,
            @RequestParam Long id2) {

        Product laptop1 = laptopService.getProductById(id1);
        Product laptop2 = laptopService.getProductById(id2);

        if (laptop1 == null || laptop2 == null) {
            return ResponseEntity.badRequest().body(null);
        }
        ComparisonResult screen;
        ComparisonResult screenLaptop2;

        if (laptop1.getScreen().equals(laptop2.getScreen())) {
            screen = ComparisonResult.EQUAL;
            screenLaptop2 = ComparisonResult.EQUAL;
        } else {
            screen = LaptopComparisonUtils.compare(LaptopComparisonUtils.extractScreen(laptop1.getScreen()), LaptopComparisonUtils.extractScreen(laptop2.getScreen()));
            screenLaptop2 = (screen == ComparisonResult.TRUE) ? ComparisonResult.TRUE : ComparisonResult.FALSE;
        }


        ComparisonResult weight = LaptopComparisonUtils.compareWeightOrSale(LaptopComparisonUtils.extractWeight(laptop1.getWeight()), LaptopComparisonUtils.extractWeight(laptop2.getWeight()));
        ComparisonResult ramCompare = LaptopComparisonUtils.compare(LaptopComparisonUtils.extractRam(laptop1.getRam()), LaptopComparisonUtils.extractRam(laptop2.getRam()));
        ComparisonResult ramCompareLaptop2 = ramCompare == ComparisonResult.TRUE ? ComparisonResult.FALSE
                : (ramCompare == ComparisonResult.FALSE ? ComparisonResult.TRUE : ComparisonResult.EQUAL);

        ComparisonResult ssdCompare = LaptopComparisonUtils.compare(LaptopComparisonUtils.extractSsd(laptop1.getSsd()), LaptopComparisonUtils.extractSsd(laptop2.getSsd()));
        ComparisonResult ssdCompareLaptop2 = ssdCompare == ComparisonResult.TRUE ? ComparisonResult.FALSE
                : (ssdCompare == ComparisonResult.FALSE ? ComparisonResult.TRUE : ComparisonResult.EQUAL);

        ComparisonResult battery = LaptopComparisonUtils.compare(LaptopComparisonUtils.extractBattery(laptop1.getBattery()), LaptopComparisonUtils.extractBattery(laptop2.getBattery()));
        ComparisonResult batteryLaptop2 = battery == ComparisonResult.TRUE ? ComparisonResult.FALSE
                : (battery == ComparisonResult.FALSE ? ComparisonResult.TRUE : ComparisonResult.EQUAL);

        ComparisonResult gift = LaptopComparisonUtils.compare(LaptopComparisonUtils.extractGiftValue(laptop1.getGift()), LaptopComparisonUtils.extractGiftValue(laptop2.getGift()));
        ComparisonResult giftLaptop2 = gift == ComparisonResult.TRUE ? ComparisonResult.FALSE
                : (gift == ComparisonResult.FALSE ? ComparisonResult.TRUE : ComparisonResult.EQUAL);

        ComparisonResult weightLaptop2 = weight == ComparisonResult.TRUE ? ComparisonResult.FALSE
                : (weight == ComparisonResult.FALSE ? ComparisonResult.TRUE : ComparisonResult.EQUAL);

        ComparisonResult gpu = LaptopComparisonUtils.compareGpu(LaptopComparisonUtils.extractGpu(laptop1.getGraphics_card()), LaptopComparisonUtils.extractGpu(laptop2.getGraphics_card()));
        ComparisonResult gpuLaptop2 = gpu == ComparisonResult.TRUE ? ComparisonResult.FALSE
                : (gpu == ComparisonResult.FALSE ? ComparisonResult.TRUE : ComparisonResult.EQUAL);

        ComparisonResult discountPercent = LaptopComparisonUtils.compare(LaptopComparisonUtils.extractDiscountPercentage(laptop1.getDiscount_percentage()),
                LaptopComparisonUtils.extractDiscountPercentage(laptop2.getDiscount_percentage()));
        ComparisonResult discountLaptop2 = discountPercent == ComparisonResult.TRUE ? ComparisonResult.FALSE
                : (discountPercent == ComparisonResult.FALSE ? ComparisonResult.TRUE : ComparisonResult.EQUAL);

        ComparisonResult sale = LaptopComparisonUtils.compareWeightOrSale(LaptopComparisonUtils.extractSalePrice(laptop1.getSale_price()),LaptopComparisonUtils. extractSalePrice(laptop2.getSale_price()));
        ComparisonResult saleLaptop2 = sale == ComparisonResult.TRUE ? ComparisonResult.FALSE
                : (sale == ComparisonResult.FALSE ? ComparisonResult.TRUE : ComparisonResult.EQUAL);


        LaptopComparisonResult result1 = new LaptopComparisonResult(
                laptop1.getId(), laptop1.getName(), laptop1.getImage(),
                ramCompare, ssdCompare, sale,discountPercent, gift,screen,gpu,  battery, weight);

        LaptopComparisonResult result2 = new LaptopComparisonResult(
                laptop2.getId(), laptop2.getName(), laptop2.getImage(),
                ramCompareLaptop2, ssdCompareLaptop2, saleLaptop2,  discountLaptop2, giftLaptop2,screenLaptop2,gpuLaptop2, batteryLaptop2, weightLaptop2);

        return ResponseEntity.ok(List.of(result1, result2));
    }
}
