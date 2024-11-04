# Sử dụng image base từ OpenJDK
FROM openjdk:21-jdk-slim

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép file JAR vào container
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Mở cổng ứng dụng
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]
