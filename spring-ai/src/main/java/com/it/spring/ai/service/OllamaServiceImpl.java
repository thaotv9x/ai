package com.it.spring.ai.service;

import java.lang.System.Logger;
import java.util.List;

import org.springframework.ai.ollama.api.OllamaApi.ChatRequest;
import org.springframework.ai.ollama.api.OllamaApi.Message;
import org.springframework.ai.ollama.api.OllamaApi.Message.Role;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.it.spring.ai.OllamaApiException;
import com.it.spring.ai.OllamaChatResponse;
import com.it.spring.ai.OllamaException;
import com.it.spring.ai.OllamaParseException;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OllamaServiceImpl implements OllamaService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public OllamaServiceImpl(RestClient restClient, ObjectMapper objectMapper) {
        this.restClient = restClient;
        this.objectMapper = objectMapper;
    }

    @Override
    public OllamaChatResponse generateContent(String promptText) {
        ChatRequest request = ChatRequest.builder("gpt-oss:120b-cloud") // ✅ Cần thiết
                .stream(false).messages(List.of(Message.builder(Role.SYSTEM).content(promptText).build()))
                .options(OllamaOptions.builder().temperature(0.9).build()).build();

        String responseBody = restClient.post().uri("/api/chat").body(request)
                .header("Content-Type", "application/json").retrieve().body(String.class);

        try {
            return objectMapper.readValue(responseBody, OllamaChatResponse.class);
        } catch (Exception e) {
            Logger logger = System.getLogger(OllamaServiceImpl.class.getName());
            logger.log(System.Logger.Level.ERROR, "Error parsing Ollama response: " + e.getMessage(), e);
            throw new OllamaException("Unexpected error while generating content: " + e.getMessage(), e);
        }

    }

    @Override
    public String generateEntityCode(String promptText) {
        log.debug("🔧 Generating entity code with low temperature (0.3)");
        return generateAIContent(promptText, 0.3);
    }

    @Override
    public String generateTextContent(String promptText) {
        log.debug("📝 Generating text content with medium temperature (0.7)");
        return generateAIContent(promptText, 0.7);
    }

    @Override
    public String analyzeContent(String promptText) {
        log.debug("🔍 Analyzing content with balanced temperature (0.5)");
        return generateAIContent(promptText, 0.5);
    }

    private String generateAIContent(String promptText, double temperature) {
        validatePrompt(promptText);

        try {
            ChatRequest request = ChatRequest.builder("gpt-oss:120b-cloud").stream(false)
                    .messages(List.of(Message.builder(Role.SYSTEM)
                            .content(
                                    "You are an expert software engineer. Provide accurate and professional responses.")
                            .build(), Message.builder(Role.USER).content(promptText).build()))
                    .options(OllamaOptions.builder().temperature(temperature).topK(20).topP(0.9).build()).build();

            log.info("Sending request to AI with temperature: {}", temperature);
            long startTime = System.currentTimeMillis();
            String responseBody = restClient.post().uri("/api/chat").body(request)
                    .header("Content-Type", "application/json").retrieve().body(String.class);

            long responseTime = System.currentTimeMillis() - startTime;
            log.info("✅ AI Response received in {} ms", responseTime);

            log.debug("🔍 Parsing AI response...");
            OllamaChatResponse response = parseApiResponse(responseBody);
            String content = extractContentFromResponse(response);

            log.debug("🧹 Cleaning content...");
            String cleanedContent = cleanContent(content);

            log.info("✅ AI Operation: {} - Completed successfully");
            log.debug("📊 Final content length: {} chars", cleanedContent.length());

            return cleanedContent;

        } catch (OllamaApiException | OllamaParseException e) {
            log.error("AI service error", e);
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error in AI service", e);
            throw new OllamaException("AI service error: " + e.getMessage(), e);
        }
    }

    // Các helper methods
    private void validatePrompt(String promptText) {
        if (promptText == null || promptText.trim().isEmpty()) {
            throw new IllegalArgumentException("Prompt text cannot be null or empty");
        }
        if (promptText.length() > 10000) {
            throw new IllegalArgumentException("Prompt text too long");
        }
    }

    private OllamaChatResponse parseApiResponse(String responseBody) {
        try {
            return objectMapper.readValue(responseBody, OllamaChatResponse.class);
        } catch (Exception e) {
            log.error("Error parsing AI response: {}", e.getMessage());
            throw new OllamaParseException("Failed to parse AI response", e);
        }
    }

    private String extractContentFromResponse(OllamaChatResponse response) {
        if (response == null || response.getMessage() == null) {
            throw new OllamaParseException("Invalid AI response structure");
        }

        String content = response.getMessage().getContent();
        if (content == null || content.trim().isEmpty()) {
            throw new OllamaParseException("Empty content in AI response");
        }

        return content;
    }

    private String cleanContent(String content) {
        // Remove markdown code blocks và extra spaces
        return content.replaceAll("```(java)?", "").replaceAll("^\\s+", "").replaceAll("\\s+$", "").trim();
    }

}
