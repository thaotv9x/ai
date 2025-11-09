package com.it.spring.ai;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class OllamaChatResponse {

    private String model;
    private Message message;
    private boolean done;

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Message {
        private String role;
        private String content;
        private String thinking;
    }
}
