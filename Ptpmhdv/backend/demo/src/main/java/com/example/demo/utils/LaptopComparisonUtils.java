package com.example.demo.utils;

import com.example.demo.enums.ComparisonResult;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
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
    public static ComparisonResult compareGpu(int gpuIndex1, int gpuIndex2) {
        if (gpuIndex1 == gpuIndex2) return ComparisonResult.EQUAL;
        if (gpuIndex1 < gpuIndex2) return ComparisonResult.FALSE;
        return ComparisonResult.TRUE;
    }
}

