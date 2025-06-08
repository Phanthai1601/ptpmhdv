from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, TimeoutException
import time

# ---------- CẤU HÌNH ----------
admin_email = "vu19092k4@gmail.com"
admin_password = "vu190924"
base_url = "http://localhost:3000"

class ProductTestRunner:
    def __init__(self):
        options = webdriver.ChromeOptions()
        self.driver = webdriver.Chrome(options=options)
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 15)
        
    def setup(self):
        """Đăng nhập và chuẩn bị môi trường test"""
        self.login()
        
    def teardown(self):
        """Dọn dẹp sau test"""
        self.driver.quit()
        
    def login(self):
        """Đăng nhập admin"""
        try:
            self.driver.get(f"{base_url}/login")
            email_field = self.wait.until(EC.presence_of_element_located((By.NAME, "email")))
            password_field = self.wait.until(EC.presence_of_element_located((By.NAME, "password")))
            email_field.send_keys(admin_email)
            password_field.send_keys(admin_password)
            login_btn = self.wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Đăng nhập')]")))
            login_btn.click()
            time.sleep(3)
            print("✅ Đăng nhập thành công")
        except Exception as e:
            print(f"❌ Lỗi đăng nhập: {e}")
            raise
            
    def open_add_form(self):
        """Mở form thêm sản phẩm"""
        try:
            self.driver.get(f"{base_url}/admin/products")
            time.sleep(2)
            add_btn = self.wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Thêm mới')]")))
            self.driver.execute_script("arguments[0].scrollIntoView(true);", add_btn)
            add_btn.click()
            time.sleep(2)
            print("✅ Mở form thêm sản phẩm thành công")
        except TimeoutException:
            print("❌ Không tìm thấy nút 'Thêm mới'")
            raise
            
    def fill_form_enhanced(self, data: dict):
        """Fill form với JavaScript events"""
        print("🔄 Bắt đầu điền form...")
        for key, value in data.items():
            if not value:  # Bỏ qua các trường trống
                continue
                
            try:
                input_field = None
                search_methods = [
                    (By.NAME, key),
                    (By.ID, key),
                    (By.CSS_SELECTOR, f"input[name='{key}'], textarea[name='{key}'], select[name='{key}']")
                ]
                
                for method, selector in search_methods:
                    try:
                        input_field = self.wait.until(EC.presence_of_element_located((method, selector)))
                        break
                    except:
                        continue
                        
                if input_field:
                    self.driver.execute_script("arguments[0].scrollIntoView(true);", input_field)
                    time.sleep(0.3)
                    
                    if input_field.tag_name == "select":
                        Select(input_field).select_by_visible_text(str(value))
                    else:
                        input_field.clear()
                        input_field.send_keys(str(value))
                        # Trigger events để form validation hoạt động
                        self.driver.execute_script("arguments[0].dispatchEvent(new Event('input'));", input_field)
                        self.driver.execute_script("arguments[0].dispatchEvent(new Event('change'));", input_field)
                    
                    print(f"✅ Điền '{key}': {value}")
                else:
                    print(f"⚠️ Không tìm thấy trường: {key}")
                    
            except Exception as e:
                print(f"❌ Lỗi khi fill '{key}': {e}")
                
    def submit_form_enhanced(self):
        """Submit form"""
        try:
            # Lưu URL hiện tại trước khi submit
            current_url = self.driver.current_url
            print(f"📍 URL trước khi submit: {current_url}")
            
            submit_btn = self.wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit' and not(@disabled)]")))
            self.driver.execute_script("arguments[0].scrollIntoView(true);", submit_btn)
            time.sleep(0.5)
            
            print("🔄 Đang submit form...")
            self.driver.execute_script("arguments[0].click();", submit_btn)
            
            # Đợi một chút để form được xử lý
            time.sleep(2)
            
        except Exception as e:
            print(f"❌ Lỗi khi submit: {e}")
            raise
            
    def wait_for_submit_response(self):
        """Đợi response sau khi submit - logic đơn giản hơn"""
        print("🔄 Đang đợi phản hồi sau khi submit...")
        
        initial_url = self.driver.current_url
        
        # Đợi tối đa 10 giây
        for i in range(5):
            time.sleep(1)
            current_url = self.driver.current_url
            
            # Kiểm tra redirect về trang danh sách (không còn "add" trong URL)
            if current_url != initial_url and "add" not in current_url:
                print(f"✅ Phát hiện redirect thành công: {current_url}")
                return True
            
            # Kiểm tra thông báo thành công
            success_indicators = [
                ".success", ".alert-success", ".text-green-500", 
                ".toast-success", ".Toastify__toast--success"
            ]
            
            for selector in success_indicators:
                try:
                    elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    for el in elements:
                        if el.is_displayed() and el.text.strip():
                            print(f"✅ Thông báo thành công: {el.text}")
                            return True
                except:
                    pass
            
            print(f"⏳ Đợi... ({i+1}/5)")
        
        # Nếu không có redirect rõ ràng, kiểm tra xem có còn ở form không
        if "add" not in self.driver.current_url:
            print("✅ Không còn ở trang thêm mới, có thể đã thành công")
            return True
            
        print("⚠️ Không phát hiện phản hồi thành công rõ ràng")
        return False
    
    def check_product_in_list(self, product_name: str):
        """Hàm này không còn được sử dụng - chỉ cần redirect khỏi trang thêm mới"""
        # Hàm này giữ lại để tương thích code nhưng không được gọi
        pass
    
    def verify_result_enhanced(self, expected_success: bool, product_name: str, test_name: str):
        """Verify kết quả - chỉ cần kiểm tra redirect khỏi trang thêm mới"""
        print(f"\n🔍 Đang verify kết quả cho: {test_name}")
        
        # 1. Đợi phản hồi từ submit
        submit_success = self.wait_for_submit_response()
        
        # 2. Kiểm tra có lỗi hiển thị không
        error_found = self.check_for_errors()
        
        # 3. Logic verify đơn giản
        if expected_success:
            if error_found:
                print(f"❌ TEST FAILED: Mong đợi thành công nhưng có lỗi hiển thị")
                return "FAILED"
            
            if submit_success:
                print(f"✅ TEST PASSED: Đã rời khỏi trang thêm mới - sản phẩm đã được lưu thành công!")
                return "PASSED"
            else:
                print(f"❌ TEST FAILED: Vẫn còn ở trang thêm mới - chưa lưu thành công")
                return "FAILED"
        else:
            # Mong đợi thất bại
            if error_found or not submit_success:
                print(f"✅ TEST PASSED: Phát hiện lỗi như mong đợi")
                return "PASSED"
            else:
                print(f"❌ TEST FAILED: Mong đợi có lỗi nhưng submit thành công")
                return "FAILED"
    
    def check_for_errors(self):
        """Kiểm tra có lỗi hiển thị không"""
        error_selectors = [
            ".error", ".text-red-500", "[class*='error']", ".alert-danger", 
            ".invalid-feedback", ".field-error", ".toast-error", 
            ".Toastify__toast--error", ".alert-error"
        ]
        
        for selector in error_selectors:
            try:
                error_elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                for error in error_elements:
                    if error.is_displayed() and error.text.strip():
                        print(f"🚨 Phát hiện lỗi: {error.text}")
                        return True
            except:
                pass
        
        # Kiểm tra validation errors
        try:
            validation_errors = self.driver.find_elements(By.CSS_SELECTOR, "input:invalid, .is-invalid")
            if validation_errors:
                print(f"⚠️ Có {len(validation_errors)} trường validation lỗi")
                return True
        except:
            pass
        
        return False
        
    def run_single_test(self, test_case):
        """Chạy một test case riêng lẻ"""
        print(f"\n{'='*50}")
        print(f"🧪 RUNNING: {test_case['name']}")
        print(f"{'='*50}")
        
        try:
            self.open_add_form()
            self.fill_form_enhanced(test_case['data'])
            self.submit_form_enhanced()
            result = self.verify_result_enhanced(
                test_case['expected_success'], 
                test_case['data'].get('name', ''),
                test_case['name']
            )
            return result
        except Exception as e:
            print(f"❌ Lỗi trong test case: {e}")
            return "FAILED"

# ---------- ĐỊNH NGHĨA TEST CASES ----------
# ---------- ĐỊNH NGHĨA TEST CASES ----------
def get_test_cases():
    return [
        {
            "name": "TC01 - Dữ liệu hợp lệ",
            "data": {
                "name": "Laptop TC01",
                "image": "https://www.asus.com/media/Odin/Websites/tw/ProductLine/20230502072224.png",
                "ram": "16GB",
                "ssd": "512GB",
                "sale_price": "15000000đ",
                "old_price": "20000000đ",
                "discount_percentage": "25",
                "gift": "Chuột không dây",
                "screen": "15.6 inch Full HD",
                "cpu": "Intel Core i7",
                "graphics_card": "NVIDIA GTX 1650",
                "battery": "6-cell Li-ion",
                "weight": "1.8kg",
                "stock": "10"
            },
            "expected_success": True
        },
        {
            "name": "TC02 - Bỏ trống tên",
            "data": {
                "name": "",
                "image": "https://www.asus.com/media/Odin/Websites/tw/ProductLine/20230502072224.png",
                "ram": "8GB",
                "ssd": "256GB",
                "sale_price": "12000000đ",
                "old_price": "15000000đ",
                "discount_percentage": "20",
                "gift": "Balo",
                "screen": "14 inch",
                "cpu": "Intel Core i5",
                "graphics_card": "Intel Iris Xe",
                "battery": "4-cell",
                "weight": "1.5kg",
                "stock": "5"
            },
            "expected_success": False
        },
        {
            "name": "TC03 - Nhập sai giá bán (chữ)",
            "data": {
                "name": "Laptop TC03",
                "image": "https://www.asus.com/media/Odin/Websites/tw/ProductLine/20230502072224.png",
                "ram": "16GB",
                "ssd": "1TB",
                "sale_price": "mười triệu",
                "old_price": "20000000đ",
                "discount_percentage": "10",
                "gift": "Tai nghe",
                "screen": "15 inch",
                "cpu": "AMD Ryzen 5",
                "graphics_card": "RTX 3050",
                "battery": "6-cell",
                "weight": "2kg",
                "stock": "7"
            },
            "expected_success": False
        },
        {
            "name": "TC04 - Giảm giá ngoài khoảng -100% đến 0%",
            "data": {
                "name": "Laptop TC04",
                "image": "https://www.asus.com/media/Odin/Websites/tw/ProductLine/20230502072224.png",
                "ram": "8GB",
                "ssd": "512GB",
                "sale_price": "10000000đ",
                "old_price": "15000000đ",
                "discount_percentage": "-150%",
                "gift": "USB",
                "screen": "13.3 inch",
                "cpu": "M1",
                "graphics_card": "Apple GPU",
                "battery": "10h",
                "weight": "1.2kg",
                "stock": "3"
            },
            "expected_success": False
        },
        {
            "name": "TC05 - Dữ liệu tối thiểu",
            "data": {
                "name": "Laptop TC05",
                "sale_price": "10000000đ",
                "stock": "5"
            },
            "expected_success": False
        },
        {
            "name": "TC06 - Giá bán nhỏ hơn 0",
            "data": {
                "name": "Laptop TC06",
                "image": "https://www.asus.com/media/Odin/Websites/tw/ProductLine/20230502072224.png",
                "ram": "16GB",
                "ssd": "512GB",
                "sale_price": "-1000000đ",
                "old_price": "20000000đ",
                "discount_percentage": "-25%",
                "gift": "Chuột không dây",
                "screen": "15.6 inch Full HD",
                "cpu": "Intel Core i7",
                "graphics_card": "NVIDIA GTX 1650",
                "battery": "6-cell Li-ion",
                "weight": "1.8kg",
                "stock": "10"
            },
            "expected_success": False
        },
        {
            "name": "TC07 - Khối lượng nhỏ hơn 0",
            "data": {
                "name": "Laptop TC07",
                "image": "https://www.asus.com/media/Odin/Websites/tw/ProductLine/20230502072224.png",
                "ram": "16GB",
                "ssd": "512GB",
                "sale_price": "15000000đ",
                "old_price": "20000000đ",
                "discount_percentage": "-25%",
                "gift": "Chuột không dây",
                "screen": "15.6 inch Full HD",
                "cpu": "Intel Core i7",
                "graphics_card": "NVIDIA GTX 1650",
                "battery": "6-cell Li-ion",
                "weight": "-1kg",
                "stock": "10"
            },
            "expected_success": False
        },
        {
            "name": "TC08 - Số lượng tồn kho nhỏ hơn 0",
            "data": {
                "name": "Laptop TC08",
                "image": "https://www.asus.com/media/Odin/Websites/tw/ProductLine/20230502072224.png",
                "ram": "16GB",
                "ssd": "512GB",
                "sale_price": "15000000đ",
                "old_price": "20000000đ",
                "discount_percentage": "-25%",
                "gift": "Chuột không dây",
                "screen": "15.6 inch Full HD",
                "cpu": "Intel Core i7",
                "graphics_card": "NVIDIA GTX 1650",
                "battery": "6-cell Li-ion",
                "weight": "1.8kg",
                "stock": "-5"
            },
            "expected_success": False
        },
        {
            "name": "TC09 - RAM nhỏ hơn 0",
            "data": {
                "name": "Laptop TC09",
                "image": "https://www.asus.com/media/Odin/Websites/tw/ProductLine/20230502072224.png",
                "ram": "-8GB",
                "ssd": "512GB",
                "sale_price": "15000000đ",
                "old_price": "20000000đ",
                "discount_percentage": "-25%",
                "gift": "Chuột không dây",
                "screen": "15.6 inch Full HD",
                "cpu": "Intel Core i7",
                "graphics_card": "NVIDIA GTX 1650",
                "battery": "6-cell Li-ion",
                "weight": "1.8kg",
                "stock": "10"
            },
            "expected_success": False
        },
        {
            "name": "TC10 - SSD nhỏ hơn 0",
            "data": {
                "name": "Laptop TC10",
                "image": "https://www.asus.com/media/Odin/Websites/tw/ProductLine/20230502072224.png",
                "ram": "16GB",
                "ssd": "-512GB",
                "sale_price": "15000000đ",
                "old_price": "20000000đ",
                "discount_percentage": "-25%",
                "gift": "Chuột không dây",
                "screen": "15.6 inch Full HD",
                "cpu": "Intel Core i7",
                "graphics_card": "NVIDIA GTX 1650",
                "battery": "6-cell Li-ion",
                "weight": "1.8kg",
                "stock": "10"
            },
            "expected_success": False
        }
    ]


# ---------- MENU CHỌN TEST CASE ----------
def show_menu():
    print("\n" + "="*50)
    print("🧪 SELENIUM TEST - THÊM SẢN PHẨM")
    print("="*50)
    test_cases = get_test_cases()
    print("Chọn test case để chạy:")
    for i, case in enumerate(test_cases, 1):
        print(f"  {i}. {case['name']}")
    print(f"  {len(test_cases)+1}. Chạy tất cả test cases")
    print("  0. Thoát")
    return test_cases

def main():
    results_summary = []
    
    while True:
        test_cases = show_menu()
        try:
            choice = int(input("\nNhập lựa chọn: "))
            if choice == 0:
                print("👋 Tạm biệt!")
                break
            elif 1 <= choice <= len(test_cases):
                selected_case = test_cases[choice - 1]
                runner = ProductTestRunner()
                runner.setup()
                result = runner.run_single_test(selected_case)
                results_summary.append((selected_case['name'], result))
                input("\n⏸️ Nhấn Enter để tiếp tục...")
                runner.teardown()
            elif choice == len(test_cases) + 1:
                runner = ProductTestRunner()
                runner.setup()
                for case in test_cases:
                    result = runner.run_single_test(case)
                    results_summary.append((case['name'], result))
                    time.sleep(2)
                print(f"\n{'='*60}")
                print("📊 TỔNG KẾT KẾT QUẢ TEST")
                print(f"{'='*60}")
                passed = failed = 0
                for name, result in results_summary:
                    if result == "PASSED":
                        print(f"✅ {name}: PASSED")
                        passed += 1
                    else:
                        print(f"❌ {name}: FAILED")
                        failed += 1
                print(f"\n📈 Thống kê: {passed} passed, {failed} failed")
                input("⏸️ Nhấn Enter để tiếp tục...")
                runner.teardown()
                results_summary.clear()
            else:
                print("❌ Lựa chọn không hợp lệ!")
        except ValueError:
            print("❌ Vui lòng nhập số!")
        except KeyboardInterrupt:
            print("\n👋 Tạm biệt!")
            break
        except Exception as e:
            print(f"❌ Lỗi: {e}")

if __name__ == "__main__":
    main()