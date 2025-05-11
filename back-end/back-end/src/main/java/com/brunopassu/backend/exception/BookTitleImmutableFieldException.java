package com.brunopassu.backend.exception;

import org.apache.coyote.BadRequestException;

public class BookTitleImmutableFieldException extends BadRequestException {
    public BookTitleImmutableFieldException(String msg){
        super(msg);
    }
}
