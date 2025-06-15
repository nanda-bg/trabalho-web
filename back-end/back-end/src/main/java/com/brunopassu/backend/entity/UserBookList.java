package com.brunopassu.backend.entity;

import com.brunopassu.backend.entity.enums.UserListType;
import com.google.cloud.Timestamp;
import io.swagger.v3.oas.annotations.media.Schema;

import java.io.Serializable;

@Schema(description = "Lista de livros do usuário")
public class UserBookList implements Serializable {
    private static final long serialVersionUID = 1L;

    private String userBookListId;
    private String userId;
    private String bookId;
    private UserListType listType; // FAVORITES, FUTURE_READS
    private Timestamp addedAt;

    public UserBookList(){}

    public UserBookList(String userId, String bookId, UserListType listType) {
        this.userId = userId;
        this.bookId = bookId;
        this.listType = listType;
        this.addedAt = Timestamp.now();
    }

    public String getUserBookListId() {
        return userBookListId;
    }

    public void setUserBookListId(String userBookListid) {
        this.userBookListId = userBookListid;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public UserListType getListType() {
        return listType;
    }

    public void setListType(UserListType listType) {
        this.listType = listType;
    }

    public Timestamp getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(Timestamp addedAt) {
        this.addedAt = addedAt;
    }
}
