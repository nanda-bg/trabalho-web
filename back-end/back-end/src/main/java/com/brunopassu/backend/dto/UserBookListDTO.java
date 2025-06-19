package com.brunopassu.backend.dto;

import com.brunopassu.backend.entity.Book;
import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.entity.enums.UserListType;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(description = "DTO para listas de livros do usuário")
public class UserBookListDTO {

    @Schema(description = "ID único do item da lista", example = "qIYHqtp7FG7UDejLb4KJ")
    private String userBookListId;

    @Schema(description = "ID do usuário", example = "2jbzAtVP3eQJsEIYVICa9jb79sq1")
    private String userId;

    @Schema(description = "ID do livro", example = "3LrcuZa9kG4GmPm56Oql")
    private String bookId;

    @Schema(description = "Tipo da lista", example = "FAVORITES")
    private UserListType listType;

    @Schema(description = "Data de adição à lista")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime addedAt;

    @Schema(description = "Dados completos do usuário")
    private User user;

    @Schema(description = "Dados completos do livro")
    private Book book;

    // Constructors
    public UserBookListDTO() {}

    public UserBookListDTO(String userBookListId, String userId, String bookId,
                           UserListType listType, LocalDateTime addedAt, User user, Book book) {
        this.userBookListId = userBookListId;
        this.userId = userId;
        this.bookId = bookId;
        this.listType = listType;
        this.addedAt = addedAt;
        this.user = user;
        this.book = book;
    }

    // Getters and setters
    public String getUserBookListId() { return userBookListId; }
    public void setUserBookListId(String userBookListId) { this.userBookListId = userBookListId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getBookId() { return bookId; }
    public void setBookId(String bookId) { this.bookId = bookId; }

    public UserListType getListType() { return listType; }
    public void setListType(UserListType listType) { this.listType = listType; }

    public LocalDateTime getAddedAt() { return addedAt; }
    public void setAddedAt(LocalDateTime addedAt) { this.addedAt = addedAt; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Book getBook() { return book; }
    public void setBook(Book book) { this.book = book; }
}