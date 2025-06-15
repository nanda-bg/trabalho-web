package com.brunopassu.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentReference;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.io.Serializable;

public class Review implements Serializable {
    private static final long serialVersionUID = 1L;

    private String reviewId;

    private DocumentReference UserRef;
    private DocumentReference BookRef;

    @Max(value = 5, message = "A nota deve ser menor ou igual a 5!")
    @Min(value = 1, message = "A nota deve ser maior ou igual a 1!")
    private Integer rating;


    private String reviewText;

    //@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Timestamp date;

    private Integer likeCount;
    private boolean spoiler;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Timestamp dateLastUpdated;

    public Review (){
    }

    public Review(String reviewID, DocumentReference userRef, DocumentReference bookRef, Integer rating, String reviewText, Timestamp date, Integer likeCount, boolean spoiler, Timestamp dateLastUpdated) {
        this.reviewId = reviewID;
        this.UserRef = userRef;
        this.BookRef = bookRef;
        this.rating = rating;
        this.reviewText = reviewText;
        this.date = date;
        this.likeCount = likeCount;
        this.spoiler = spoiler;
        this.dateLastUpdated = dateLastUpdated;
    }

    public String getReviewId() {
        return reviewId;
    }

    public void setReviewId(String reviewID) {
        this.reviewId = reviewID;
    }

    public DocumentReference getUserRef() {
        return UserRef;
    }

    public void setUserRef(DocumentReference userUid) {
        UserRef = userUid;
    }

    public DocumentReference getBookRef() {
        return BookRef;
    }

    public void setBookRef(DocumentReference bookId) {
        BookRef = bookId;
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

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
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
}
