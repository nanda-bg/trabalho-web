package com.brunopassu.backend.entity;

import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;


public class Book {

    private String bookId;

    @NotBlank(message = "Titulo é obrigatório!")
    private String title;

    @Size(max = 1000)
    private String description;

    @NotEmpty(message = "Pelo menos um autor deve ser informado")
    private List<String> authors = new ArrayList<>();

    private String coverUrl;

    @Min(value = 0, message = "Ano de publicação inválido")
    @Max(value = 2100, message = "Ano de publicação inválido")
    private Integer publicationYear;

    @NotEmpty(message = "Pelo menos um gênero deve ser informado")
    private List<String> genres = new ArrayList<>();

    private Double averageRating; //MEDIA DAS NOTAS!
    private Integer ratingsCount; //QUANTIDADE DE NOTAS

    @Min(value = 1, message = "Número de páginas deve ser maior que zero")
    private Integer pagesCount;

    public Book() {
    }

    public Book(String book_id, String title, String description, List<String> authors, String coverUrl, Integer publicationYear, List<String> genres, Double averageRating, Integer ratingsCount, Integer pagesCount) {
        this.bookId = book_id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.coverUrl = coverUrl;
        this.publicationYear = publicationYear;
        this.genres = genres;
        this.averageRating = 0.0; //MEDIA DAS NOTAS!
        this.ratingsCount = 0; //QUANTIDADE DE NOTAS
        this.pagesCount = pagesCount;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String book_id) {
        this.bookId = book_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getAuthors() {
        return authors;
    }

    public void setAuthors(List<String> authors) {
        this.authors = authors;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public Integer getPublicationYear() {
        return publicationYear;
    }

    public void setPublicationYear(Integer publicationYear) {
        this.publicationYear = publicationYear;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getRatingsCount() {
        return ratingsCount;
    }

    public void setRatingsCount(Integer ratingsCount) {
        this.ratingsCount = ratingsCount;
    }

    public Integer getPagesCount() {
        return pagesCount;
    }

    public void setPagesCount(Integer pagesCount) {
        this.pagesCount = pagesCount;
    }
}
