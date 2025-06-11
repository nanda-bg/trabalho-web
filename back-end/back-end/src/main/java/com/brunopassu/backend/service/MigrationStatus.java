package com.brunopassu.backend.service;

public class MigrationStatus {
    private long totalBooks;
    private long booksWithOldGenres;
    private long booksWithoutRelevanceScore;
    private boolean migrationComplete;

    public MigrationStatus(long totalBooks, long booksWithOldGenres,
                           long booksWithoutRelevanceScore, boolean migrationComplete) {
        this.totalBooks = totalBooks;
        this.booksWithOldGenres = booksWithOldGenres;
        this.booksWithoutRelevanceScore = booksWithoutRelevanceScore;
        this.migrationComplete = migrationComplete;
    }

    // Getters
    public long getTotalBooks() { return totalBooks; }
    public long getBooksWithOldGenres() { return booksWithOldGenres; }
    public long getBooksWithoutRelevanceScore() { return booksWithoutRelevanceScore; }
    public boolean isMigrationComplete() { return migrationComplete; }

    @Override
    public String toString() {
        return String.format(
                "Total: %d | Gêneros antigos: %d | Sem relevanceScore: %d | Completa: %s",
                totalBooks, booksWithOldGenres, booksWithoutRelevanceScore, migrationComplete
        );
    }
}

