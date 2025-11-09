package com.it.spring.ai;

import org.springframework.ai.ollama.api.OllamaApi.Message.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.it.spring.ai.OllamaChatResponse.Message;
import com.it.spring.ai.service.OllamaService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/ai")
@AllArgsConstructor
public class AIController {

    private final OllamaService ollamaService;

    @GetMapping("/generate")
    public ResponseEntity<OllamaChatResponse> generatePirates(@RequestParam(name = "promptText") String promptText) {
        try {
            return new ResponseEntity<>(ollamaService.generateContent(promptText), HttpStatus.OK);
        } catch (Exception e) {
            OllamaChatResponse errorResponse = new OllamaChatResponse();
            errorResponse.setMessage(new Message(Role.ASSISTANT.toString(), "Error: " + e.getMessage(), null));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
//        try {
//            System.out.println("Sending request to Ollama...");
//
//            ChatRequest request = ChatRequest.builder("gpt-oss:120b-cloud").stream(false)
//                    .messages(List.of(Message.builder(Role.SYSTEM).content(promptText).build()))
//                    .options(OllamaOptions.builder().temperature(0.9).build()).build();
//
//            System.out.println("Request: " + request);
//
//            // Sử dụng RestClient trực tiếp thay vì ollamaApi.chat()
//            RestClient restClient = RestClient.create("http://localhost:11434");
//
//            String responseBody = restClient.post().uri("/api/chat").body(request)
//                    .header("Content-Type", "application/json").retrieve().body(String.class); // Nhận response dưới
//                                                                                               // dạng String
//
//            System.out.println("Raw response: " + responseBody);
//
//            // Parse JSON thủ công
//            // Parse thành DTO của Ollama
//            OllamaChatResponse ollamaResponse = objectMapper.readValue(responseBody, OllamaChatResponse.class);
//            System.out.println("Response content: " + ollamaResponse.getMessage().getContent());
//
//            return ResponseEntity.ok(Map.of("content", ollamaResponse.getMessage().getContent(), "thinking",
//                    ollamaResponse.getMessage().getThinking()));
//
//        } catch (Exception e) {
//            System.err.println("ERROR: " + e.getClass().getSimpleName() + ": " + e.getMessage());
//            e.printStackTrace();
//            return ResponseEntity.status(500).body(Map.of("error", "Failed to generate response", "type",
//                    e.getClass().getSimpleName(), "message", e.getMessage()));
//        }
    }

}
