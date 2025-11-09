package com.it.spring.ai.service;

import com.it.spring.ai.OllamaChatResponse;

public interface OllamaService {
    OllamaChatResponse generateContent(String promptText);

    String generateEntityCode(String promptText);

    String generateTextContent(String promptText);

    String analyzeContent(String promptText);
}
