package com.brunopassu.backend.service;

import com.brunopassu.backend.repository.BookRepository;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class UnifiedMigrationService {

    @Autowired
    private BookRepository bookRepository;

    public void migrateAllBooksData() throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();

        String lastBookId = null;
        boolean hasMore = true;
        int processedCount = 0;

        System.out.println("Iniciando migração unificada de dados...");

        while (hasMore) {
            Query query = firestore.collection("books")
                    .orderBy("__name__")
                    .limit(50);

            if (lastBookId != null) {
                DocumentSnapshot lastDoc = firestore.collection("books")
                        .document(lastBookId).get().get();
                query = query.startAfter(lastDoc);
            }

            List<QueryDocumentSnapshot> documents = query.get().get().getDocuments();

            if (documents.isEmpty()) {
                hasMore = false;
                continue;
            }

            // Criar novo batch para cada lote
            WriteBatch batch = firestore.batch();
            boolean hasUpdates = false; // CONTROLE MANUAL

            for (QueryDocumentSnapshot doc : documents) {
                Map<String, Object> updates = new HashMap<>();

                // 1. MIGRAR GENRES -> GENRE
                List<String> genresList = (List<String>) doc.get("genres");
                String currentGenre = doc.getString("genre");

                if (genresList != null && !genresList.isEmpty() && currentGenre == null) {
                    updates.put("genre", genresList.get(0));
                    updates.put("genres", FieldValue.delete());
                }

                // 2. CALCULAR RELEVANCE SCORE
                Double currentRelevanceScore = doc.getDouble("relevanceScore");

                if (currentRelevanceScore == null) {
                    Double avgRating = doc.getDouble("averageRating");
                    Long ratingsCount = doc.getLong("ratingsCount");

                    double relevanceScore = calculateRelevanceScore(
                            avgRating != null ? avgRating : 0.0,
                            ratingsCount != null ? ratingsCount.intValue() : 0
                    );

                    updates.put("relevanceScore", relevanceScore);
                }

                // Adicionar ao batch se há atualizações
                if (!updates.isEmpty()) {
                    batch.update(doc.getReference(), updates);
                    hasUpdates = true; // MARCAR QUE TEM UPDATES
                    System.out.println("Processando livro: " + doc.getId());
                }
            }

            // Executar batch APENAS se há updates
            if (hasUpdates) {
                batch.commit().get();
                System.out.println("Batch executado com sucesso");
            } else {
                System.out.println("Nenhuma atualização necessária neste lote");
            }

            processedCount += documents.size();
            lastBookId = documents.get(documents.size() - 1).getId();
            hasMore = documents.size() == 50;

            System.out.println("Processados: " + processedCount + " livros");
            Thread.sleep(100);
        }

        System.out.println("Migração concluída! Total processado: " + processedCount + " livros");
    }

    private double calculateRelevanceScore(Double averageRating, Integer ratingsCount) {
        double R = 3.0; // Rating médio assumido (escala 1-5)
        double W = 10.0; // Peso do prior (equivale a 10 ratings)

        // Fórmula Bayesiana
        return (W * R + ratingsCount * averageRating) / (W + ratingsCount);
    }

    // Métod para verificar status da migração
    public MigrationStatus checkMigrationStatus() throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();

        // Contar livros que ainda têm o campo 'genres'
        ApiFuture<AggregateQuerySnapshot> genresCount = firestore.collection("books")
                .whereNotEqualTo("genres", null)
                .count()
                .get();

        // Contar livros sem relevanceScore
        ApiFuture<AggregateQuerySnapshot> noScoreCount = firestore.collection("books")
                .whereEqualTo("relevanceScore", null)
                .count()
                .get();

        // Contar total de livros
        ApiFuture<AggregateQuerySnapshot> totalCount = firestore.collection("books")
                .count()
                .get();

        long booksWithOldGenres = genresCount.get().getCount();
        long booksWithoutScore = noScoreCount.get().getCount();
        long totalBooks = totalCount.get().getCount();

        return new MigrationStatus(
                totalBooks,
                booksWithOldGenres,
                booksWithoutScore,
                booksWithOldGenres == 0 && booksWithoutScore == 0
        );
    }
}
