package com.it.spring.ai;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.it.spring.ai.service.OllamaServiceImpl;

@Configuration
public class WebConfig {
    @Bean
    public RestClient ollamaRestClient() {
        return RestClient.builder().baseUrl("http://localhost:11434").defaultHeader("Content-Type", "application/json")
                .build();
    }

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return new ObjectMapper();
    }

    @Bean
    public OllamaServiceImpl ollamaService(RestClient ollamaRestClient, ObjectMapper objectMapper) {
        return new OllamaServiceImpl(ollamaRestClient, objectMapper);
    }
}
