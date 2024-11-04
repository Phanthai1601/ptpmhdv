package com.example.demo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI().info(new Info().title("Api Service Documentation").version("v1.0.0").description("Description")
                .license(new License().name("Api License").url(""))).servers(List.of( new Server().url("http://localhost:8080/")));
    }
    @Bean
    public GroupedOpenApi groupedOpenApi(){
        return  GroupedOpenApi.builder()
                .group("api-service")
                .packagesToScan("com.example.demo.controller")
                .build();

    }
}
