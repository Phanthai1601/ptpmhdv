from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("http://localhost:3000")
time.sleep(2)

try:
    # Chọn sản phẩm đầu tiên và click
    products = driver.find_elements(By.CSS_SELECTOR, 'div.border.border-gray-200 a')
    products[2].click()
    time.sleep(2)

    # Kiểm tra URL
    current_url = driver.current_url
    if "/product/" in current_url:
        print("✅ PASS: Đã chuyển đến trang chi tiết sản phẩm:", current_url)
    else:
        print("❌ FAIL: Không điều hướng đúng")

finally:
    driver.quit()
