package com.brunopassu.backend.dto;

import com.brunopassu.backend.entity.Book;
import com.brunopassu.backend.entity.User;
import com.google.cloud.Timestamp;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO para reviews de livros")
public class ReviewDTO {

    @Schema(description = "ID único da review", example = "abc123def456")
    private String reviewId;

    @Schema(description = "UID do usuário que fez a review", example = "user123", required = true)
    private String userUid;

    @Schema(description = "ID do livro avaliado", example = "book456", required = true)
    private String bookId;

    @Schema(description = "Avaliação do livro (0-5 estrelas)", minimum = "0", maximum = "5", example = "4", required = true)
    @Min(0)
    @Max(5)
    private Integer rating;

    @Schema(description = "Texto da review/comentário", example = "Livro excelente! Recomendo muito.")
    private String reviewText;

    @Schema(description = "Data de criação da review", example = "2025-06-01T18:41:00Z")
    private Timestamp date;

    @Schema(description = "Número de likes na review", example = "15")
    private Integer likeCount;

    @Schema(description = "Indica se a review contém spoilers", example = "false")
    private boolean spoiler;

    @Schema(description = "Data da última atualização", example = "2025-06-01T20:30:00Z")
    private Timestamp dateLastUpdated;

    private User user;
    private Book book;

    public ReviewDTO(String bookId, String reviewId, String userUid, Integer rating, String reviewText, Timestamp date, Integer likeCount, boolean spoiler, Timestamp dateLastUpdated, User user, Book book) {
        this.bookId = bookId;
        this.reviewId = reviewId;
        this.userUid = userUid;
        this.rating = rating;
        this.reviewText = reviewText;
        this.date = date;
        this.likeCount = likeCount;
        this.spoiler = spoiler;
        this.dateLastUpdated = dateLastUpdated;
        this.user = user;
        this.book = book;
    }

    public ReviewDTO(){}

    public String getReviewId() {
        return reviewId;
    }

    public void setReviewId(String reviewId) {
        this.reviewId = reviewId;
    }

    public String getUserUid() {
        return userUid;
    }

    public void setUserUid(String userUid) {
        this.userUid = userUid;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public boolean isSpoiler() {
        return spoiler;
    }

    public void setSpoiler(boolean spoiler) {
        this.spoiler = spoiler;
    }

    public Timestamp getDateLastUpdated() {
        return dateLastUpdated;
    }

    public void setDateLastUpdated(Timestamp dateLastUpdated) {
        this.dateLastUpdated = dateLastUpdated;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }
}