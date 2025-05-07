package com.brunopassu.backend.exception;

import org.apache.coyote.BadRequestException;

public class UserAlreadyExistsException extends BadRequestException {
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
