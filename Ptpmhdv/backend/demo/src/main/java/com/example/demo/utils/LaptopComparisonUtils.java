package com.example.demo.utils;

import com.example.demo.enums.ComparisonResult;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static javax.swing.text.html.HTML.Attribute.N;

public class LaptopComparisonUtils {

    public static ComparisonResult compare(double value1, double value2) {
        if (value1 > value2) return ComparisonResult.TRUE;
        if (value1 < value2) return ComparisonResult.FALSE;
        return ComparisonResult.EQUAL;
    }

    public static ComparisonResult compareWeightOrSale(double value1, double value2) {
        if (value1 > value2) return ComparisonResult.FALSE;
        if (value1 < value2) return ComparisonResult.TRUE;
        return ComparisonResult.EQUAL;
    }

    public static int extractRam(String ramString) {
        return Integer.parseInt(ramString.replaceAll("[^0-9]", ""));
    }

    public static int extractSsd(String ssdString) {
        int ssdValue = Integer.parseInt(ssdString.replaceAll("[^0-9]", ""));
        return ssdValue <= 5 ? ssdValue * 1024 : ssdValue;
    }

    public static int extractSalePrice(String priceString) {
        return Integer.parseInt(priceString.replaceAll("[^0-9]", ""));
    }

    public static int extractDiscountPercentage(String discountString) {
        String numberString = discountString.replaceAll("[^0-9]", "");
        return numberString.isEmpty() ? 0 : Integer.parseInt(numberString);
    }

    public static int extractGiftValue(String giftString) {
        Matcher matcher = Pattern.compile("\\d+(?:[.,]\\d+)*").matcher(giftString);
        if (matcher.find()) {
            return Integer.parseInt(matcher.group().replaceAll("[.,]", ""));
        }
        return 0;
    }

    public static double extractWeight(String weightString) {
        return Double.parseDouble(weightString.replaceAll("[^0-9.]", ""));
    }

    public static double extractBattery(String batteryString) {
        Matcher matcher = Pattern.compile("(\\d+(\\.\\d+)?)\\s*Wh").matcher(batteryString);
        if (matcher.find()) {
            return Double.parseDouble(matcher.group(1));
        }
        return 0.0;
    }
    public static double extractScreen(String screenString) {
        Matcher matcher = Pattern.compile("\\b\\d+(\\.\\d+)?\\b").matcher(screenString);
        if (matcher.find()) {
            return Double.parseDouble(matcher.group());
        }
        return 0.0;
    }
    public static int extractCpu(String cpuString) {
        String[] cpuArray = {

                "i3, 1115G4, 3GHz",
                "i3, 1215U, 1.2GHz",
                "i3, 1315U, 1.2GHz",
                "i3, 1315U",
                "i3, chuỗi N, N305",
                "Core 5, 120U, 1.4GHz",
                "i5, 1135G7, 2.4GHz",
                "i5, 1155G7, 2.5GHz",
                "i5, 1240P, 1.7GHz",
                "i5, 12450HX",
                "i5, 12450H, 2GHz",
                "i5, 12500H, 2.5GHz",
                "i5, 12500H, 2.5GHz",
                "i5, 1335U, 1.3GHz",
                "i5, 1334U, 1.3GHz",
                "i5, 13420H, 2.1GHz",
                "i5, 13500HX, 2.5GHz",
                "i5, 13500H, 2.6GHz",
                "Ryzen 7, 5700U, 1.8GHz",
                "Ryzen 5, 7430U, 2.30 GHz",
                "Ryzen 5, 7520U, 2.8GHz",
                "Ryzen 5, 7530U, 2GHz",
                "Ryzen 7, 7435HS, 3.1GHz",
                "Ryzen 7, 7535HS, 3.3GHz",
                "i7, 1255U, 1.7GHz",
                "i7, 12700H, 2.30 GHz",
                "i7, 1355U, 1.7GHz",
                "i7, 13620H, 2.4GHz",
                "i7, 13650HX, 2.6GHz",
                "i7, 14650HX, 2.2GHz",
                "i7, 1355U",
                "i7, 13620H, 2.4GHz",
                "Ultra 5, 125U, 1.3GHz",
                "Ultra 5, 125H, 1.2GHz",
                "Ultra 7, 155U, 1.7GHz",
                "Ultra 7, 155H, 3.8GHz"
        };


        for (int i = 0; i < cpuArray.length; i++) {
            if (cpuString != null && cpuString.contains(cpuArray[i])) {
                return i;
            }
        }
        return cpuArray.length;
    }

    public static int extractGpu(String gpuString) {
        String[] gpuArray = {
                "Intel Graphics",
                "Intel UHD",
                "Intel Iris Xe",
                "Intel Arc Graphics",
                "AMD Radeon 610M",
                "Radeon",
                "RTX 2050 4GB",
                "RTX 3050 4GB",
                "RTX 3050Ti 4GB",
                "RTX 3050 6GB",
                "RTX 4050 6GB",
                "RTX 4060 8GB"
        };

        for (int i = 0; i < gpuArray.length; i++) {
            if (gpuString != null && gpuString.contains(gpuArray[i])) {
                return i;
            }
        }
        return gpuArray.length;
    }
    public static ComparisonResult compareGpuOrCpu(int gpuIndex1, int gpuIndex2) {
        if (gpuIndex1 == gpuIndex2) return ComparisonResult.EQUAL;
        if (gpuIndex1 < gpuIndex2) return ComparisonResult.FALSE;
        return ComparisonResult.TRUE;
    }
}

