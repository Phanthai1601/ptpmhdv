from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, TimeoutException
import time
import uuid

# ---------- CẤU HÌNH ----------
admin_email = "vu19092k4@gmail.com"
admin_password = "vu190924"
base_url = "http://localhost:3000"

class CustomerTestRunner:
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
        """Mở form thêm khách hàng"""
        try:
            self.driver.get(f"{base_url}/admin/customers")
            time.sleep(2)
            add_btn = self.wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Thêm mới')]")))
            self.driver.execute_script("arguments[0].scrollIntoView(true);", add_btn)
            add_btn.click()
            time.sleep(2)
            print("✅ Mở form thêm khách hàng thành công")
        except TimeoutException:
            print("❌ Không tìm thấy nút 'Thêm mới'")
            raise
            
    def fill_form_enhanced(self, data: dict):
        """Điền form với JavaScript events"""
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
                        Select(input_field).select_by_value(str(value))
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
                print(f"❌ Lỗi khi điền '{key}': {e}")
                
    def submit_form_enhanced(self):
        """Submit form"""
        try:
            current_url = self.driver.current_url
            print(f"📍 URL trước khi submit: {current_url}")
            
            submit_btn = self.wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit' and not(@disabled)]")))
            self.driver.execute_script("arguments[0].scrollIntoView(true);", submit_btn)
            time.sleep(0.5)
            
            print("🔄 Đang submit form...")
            self.driver.execute_script("arguments[0].click();", submit_btn)
            
            time.sleep(2)
            
        except Exception as e:
            print(f"❌ Lỗi khi submit: {e}")
            raise
            
    def wait_for_submit_response(self):
        """Đợi response sau khi submit"""
        print("🔄 Đang đợi phản hồi sau khi submit...")
        
        initial_url = self.driver.current_url
        
        for i in range(4):
            time.sleep(1)
            current_url = self.driver.current_url
            
            if current_url != initial_url and "add" not in current_url:
                print(f"✅ Phát hiện redirect thành công: {current_url}")
                return True
            
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
            
            print(f"⏳ Đợi... ({i+1}/4)")
        
        if "add" not in self.driver.current_url:
            print("✅ Không còn ở trang thêm mới, có thể đã thành công")
            return True
            
        print("⚠️ Không phát hiện phản hồi thành công rõ ràng")
        return False
    
    def verify_result_enhanced(self, expected_success: bool, customer_name: str, test_name: str):
        """Verify kết quả"""
        print(f"\n🔍 Đang verify kết quả cho: {test_name}")
        
        submit_success = self.wait_for_submit_response()
        error_found = self.check_for_errors()
        
        if expected_success:
            if error_found:
                print(f"❌ TEST FAILED: Mong đợi thành công nhưng có lỗi hiển thị")
                return "FAILED"
            
            if submit_success:
                print(f"✅ TEST PASSED: Đã rời khỏi trang thêm mới - khách hàng đã được lưu thành công!")
                return "PASSED"
            else:
                print(f"❌ TEST FAILED: Vẫn còn ở trang thêm mới - chưa lưu thành công")
                return "FAILED"
        else:
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
                test_case['data'].get('fullName', ''),
                test_case['name']
            )
            return result
        except Exception as e:
            print(f"❌ Lỗi trong test case: {e}")
            return "FAILED"

# ---------- ĐỊNH NGHĨA TEST CASES ----------
def get_test_cases():
    return [
        {
            "name": "TC01 - Dữ liệu hợp lệ",
            "data": {
                "fullName": "Nguyễn Thêm TC01",
                "email": f"test{str(uuid.uuid4())[:8]}@gmail.com",
                "password": "Password123",
                "address": "123 Đường Láng, Hà Nội",
                "phone": "0123456789",
                "gender": "Male"
            },
            "expected_success": True
        },
        {
            "name": "TC02 - Bỏ trống tên",
            "data": {
                "fullName": "",
                "email": f"test{str(uuid.uuid4())[:8]}@gmail.com",
                "password": "Password123",
                "address": "123 Đường Láng, Hà Nội",
                "phone": "0123456789",
                "gender": "Male"
            },
            "expected_success": False
        },
        {
            "name": "TC03 - Email không hợp lệ",
            "data": {
                "fullName": "Nguyễn Thêm TC03",
                "email": "invalid-email",
                "password": "Password123",
                "address": "456 Nguyễn Trãi, Hà Nội",
                "phone": "0987654321",
                "gender": "Female"
            },
            "expected_success": False
        },
        {
            "name": "TC04 - Số điện thoại không hợp lệ",
            "data": {
                "fullName": "Nguyễn Thêm TC04",
                "email": f"test{str(uuid.uuid4())[:8]}@gmail.com",
                "password": "Password123",
                "address": "789 Lê Lợi, TP.HCM",
                "phone": "-123456789",
                "gender": "Male"
            },
            "expected_success": False
        },
        {
            "name": "TC05 - Dữ liệu tối thiểu",
            "data": {
                "fullName": "Nguyễn Thêm TC05",
                "email": f"test{str(uuid.uuid4())[:8]}@gmail.com",
                "password": "Password123"
            },
            "expected_success": False
        }
    ]

# ---------- MENU CHỌN TEST CASE ----------
def show_menu():
    print("\n" + "="*50)
    print("🧪 SELENIUM TEST - THÊM KHÁCH HÀNG")
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
                runner = CustomerTestRunner()
                runner.setup()
                result = runner.run_single_test(selected_case)
                results_summary.append((selected_case['name'], result))
                input("\n⏸️ Nhấn Enter để tiếp tục...")
                runner.teardown()
            elif choice == len(test_cases) + 1:
                runner = CustomerTestRunner()
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