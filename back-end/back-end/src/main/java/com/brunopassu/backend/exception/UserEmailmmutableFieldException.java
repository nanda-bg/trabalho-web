package com.brunopassu.backend.exception;

import org.apache.coyote.BadRequestException;

public class UserEmailmmutableFieldException extends BadRequestException {
    public UserEmailmmutableFieldException(String msg){
        super(msg);
    }
}
