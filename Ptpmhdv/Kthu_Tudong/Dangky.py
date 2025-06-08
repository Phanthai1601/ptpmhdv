from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Khởi tạo trình duyệt
driver = webdriver.Chrome()
driver.get("http://localhost:3000/register")  # Đổi URL nếu khác
time.sleep(2)

# Danh sách test case
test_cases = [
    # 1. Thiếu email
    {"email": "", "phone": "0912345678", "pass": "abc123", "cpass": "abc123", "expect": "email"},
    # 2. Email sai định dạng
    {"email": "user@", "phone": "0912345678", "pass": "abc123", "cpass": "abc123", "expect": "email"},
    # 3. Thiếu số điện thoại
    {"email": "user@example.com", "phone": "", "pass": "abc123", "cpass": "abc123", "expect": "điện thoại"},
    # 4. Thiếu mật khẩu
    {"email": "user@example.com", "phone": "0912345678", "pass": "", "cpass": "", "expect": "mật khẩu"},
    # 5. Mật khẩu không khớp
    {"email": "user@example.com", "phone": "0912345678", "pass": "abc123", "cpass": "abc321", "expect": "mật khẩu nhập lại không khớp"},
    # 6. Đăng ký thành công
    {"email": "TC06@example.com", "phone": "0987654321", "pass": "Abc12345", "cpass": "Abc12345", "expect": "đăng ký thành công"},
    #  7. Email đã tồn tại
    {"email": "TC06@example.com", "phone": "0999999999", "pass": "Abc12345", "cpass": "Abc12345", "expect": "email đã tồn tại"},
]

# ...
for idx, case in enumerate(test_cases, 1):
    driver.get("http://localhost:3000/register")
    time.sleep(1)

    # Xóa các trường
    driver.find_element(By.NAME, "email").clear()
    driver.find_element(By.NAME, "phoneNumber").clear()
    driver.find_element(By.NAME, "password").clear()
    driver.find_element(By.NAME, "cpassword").clear()

    # Nhập dữ liệu test
    driver.find_element(By.NAME, "email").send_keys(case["email"])
    driver.find_element(By.NAME, "phoneNumber").send_keys(case["phone"])
    driver.find_element(By.NAME, "password").send_keys(case["pass"])
    driver.find_element(By.NAME, "cpassword").send_keys(case["cpass"])
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    time.sleep(2)

    # Trường hợp đăng ký thành công → chuyển hướng sang /login
    if case["expect"] == "đăng ký thành công":
        current_url = driver.current_url
        if "login" in current_url.lower():
            print(f"✅ Test case {idx}: PASS (Chuyển đến trang đăng nhập sau khi đăng ký thành công)")
        else:
            print(f"❌ Test case {idx}: FAIL (Không chuyển đến trang đăng nhập sau đăng ký)")
    else:
        # Kiểm tra kết quả bằng page source
        page_source = driver.page_source.lower()
        if case["expect"] in page_source:
            print(f"✅ Test case {idx}: PASS (Đúng lỗi/thông báo: '{case['expect']}')")
        else:
            print(f"❌ Test case {idx}: FAIL (Không thấy '{case['expect']}' trong phản hồi)")

    time.sleep(2)

driver.quit()


driver.quit()