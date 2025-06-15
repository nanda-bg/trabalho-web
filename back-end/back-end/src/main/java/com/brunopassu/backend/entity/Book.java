package com.brunopassu.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.cloud.firestore.annotation.Exclude;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Schema(description = "Entidade de livro do sistema")
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "ID único do livro", example = "book123def456")
    private String bookId;

    @Schema(description = "Título do livro", example = "Dom Casmurro", required = true)
    @NotBlank(message = "Titulo é obrigatório!")
    private String title;

    @Schema(description = "Descrição/sinopse do livro", maxLength = 1000, example = "Romance clássico da literatura brasileira")
    @Size(max = 1000)
    private String description;

    @Schema(description = "Lista de autores do livro", example = "[\"Machado de Assis\"]", required = true)
    @NotEmpty(message = "Pelo menos um autor deve ser informado")
    private List<String> authors = new ArrayList<>();

    @Schema(description = "URL da capa do livro", example = "https://example.com/capa.jpg")
    private String coverUrl;

    @Schema(description = "Ano de publicação", minimum = "0", maximum = "2100", example = "1899")
    @Min(value = 0, message = "Ano de publicação inválido")
    @Max(value = 2100, message = "Ano de publicação inválido")
    private Integer publicationYear;

    @Schema(description = "Gênero principal do livro", example = "Romance", required = true)
    @NotBlank(message = "Gênero é obrigatório")
    private String genre;

    @Schema(description = "Média das avaliações do livro", example = "4.5")
    private Double averageRating;

    @Schema(description = "Quantidade total de avaliações", example = "150")
    private Integer ratingsCount;

    @Schema(description = "Cálculo com base na Fórmula de Bayes para 'filtrar' as maiores notas")
    private Double relevanceScore;

    @Schema(description = "Número de páginas do livro", minimum = "1", example = "256")
    @Min(value = 1, message = "Número de páginas deve ser maior que zero")
    private Integer pagesCount;

    @Exclude
    @JsonIgnore
    private String uniqueKey;

    public Book() {
        this.authors = new ArrayList<>();
        this.averageRating = 0.0;
        this.ratingsCount = 0;
        this.relevanceScore = 0.0;
    }

    public Book(String bookId, String title, String description, List<String> authors,
                String coverUrl, Integer publicationYear, String genre,
                Double averageRating, Integer ratingsCount, Integer pagesCount) {
        this.bookId = bookId;
        this.title = title;
        this.description = description;
        this.authors = authors != null ? authors : new ArrayList<>();
        this.coverUrl = coverUrl;
        this.publicationYear = publicationYear;
        this.genre = genre;
        this.averageRating = averageRating != null ? averageRating : 0.0;
        this.ratingsCount = ratingsCount != null ? ratingsCount : 0;
        this.relevanceScore = 0.0;
        this.pagesCount = pagesCount;
    }

    public Double getRelevanceScore() {
        return relevanceScore;
    }

    public void setRelevanceScore(Double relevanceScore) {
        this.relevanceScore = relevanceScore;
    }

    public String getUniqueKey() {
        return uniqueKey;
    }

    public void setUniqueKey(String uniqueKey) {
        this.uniqueKey = uniqueKey;
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

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
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
