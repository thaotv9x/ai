package com.it.spring.ai;

public class OllamaParseException extends OllamaException {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    public OllamaParseException(String message) {
        super(message);
    }

    public OllamaParseException(String message, Throwable cause) {
        super(message, cause);
    }
}
