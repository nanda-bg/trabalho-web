package com.brunopassu.backend.exception;

import org.apache.coyote.BadRequestException;

public class UserUsernameImmutableFieldException extends BadRequestException {
    public UserUsernameImmutableFieldException(String msg){
        super(msg);
    }
}
