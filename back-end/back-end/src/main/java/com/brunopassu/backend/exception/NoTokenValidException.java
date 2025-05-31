package com.brunopassu.backend.exception;

public class NoTokenValidException extends RuntimeException {
    public NoTokenValidException(String message) {
        super(message);
    }
}
