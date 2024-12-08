package com.example.demo.dto;  // Chú ý import đúng package

public class MessageErrorLogin {
    private String message;  // Thuộc tính message chứa thông điệp lỗi

    // Constructor để khởi tạo thông điệp lỗi
    public MessageErrorLogin(String message) {
        this.message = message;
    }

    // Getter và Setter
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
