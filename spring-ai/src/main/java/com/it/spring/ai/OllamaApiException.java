package com.it.spring.ai;

import lombok.Getter;

@Getter
public class OllamaApiException extends OllamaException {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    private final int statusCode;

    public OllamaApiException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public OllamaApiException(String message, int statusCode, Throwable cause) {
        super(message, cause);
        this.statusCode = statusCode;
    }

}
