package com.brunopassu.backend.repository;

import com.brunopassu.backend.config.FirestoreConfig;
import com.brunopassu.backend.entity.Review;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Repository
public class ReviewRepository {

    private static final String COLLECTION_NAME = "reviews";
    private final FirestoreConfig firestoreConfig;

    public ReviewRepository(FirestoreConfig firestoreConfig) {
        this.firestoreConfig = firestoreConfig;
    }

    public String saveReview(Review review) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();

        // Se o ID for nulo, deixe o Firestore gerar um ID
        if (review.getReviewId() == null || review.getReviewId().isEmpty()) {
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document();
            // Atribui o ID gerado ao objeto book
            review.setReviewId(docRef.getId());
            ApiFuture<WriteResult> result = docRef.set(review);
            result.get(); // Aguarda a conclusão da operação
        } else {
            // Caso contrário, use o ID fornecido
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(review.getReviewId());
            ApiFuture<WriteResult> result = docRef.set(review);
            result.get(); // Aguarda a conclusão da operação
        }

        return review.getReviewId();
    }

    public Review getReviewById(String reviewId) throws ExecutionException, InterruptedException, IOException {
        Firestore firestore = firestoreConfig.firestore();
        DocumentReference docRef = firestore.collection("reviews").document(reviewId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            return document.toObject(Review.class);
        } else {
            return null;
        }
    }

    public List<Review> getAllReviews() throws ExecutionException, InterruptedException, IOException {
        Firestore firestore = firestoreConfig.firestore();
        ApiFuture<QuerySnapshot> future = firestore.collection("reviews").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        List<Review> reviews = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            reviews.add(document.toObject(Review.class));
        }

        return reviews;
    }

    public List<Review> getReviewsByBookId(String bookId) throws ExecutionException, InterruptedException, IOException {
        Firestore firestore = firestoreConfig.firestore();
        DocumentReference bookRef = firestore.collection("books").document(bookId);

        ApiFuture<QuerySnapshot> future = firestore.collection("reviews")
                .whereEqualTo("bookRef", bookRef)
                .get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Review> reviews = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            reviews.add(document.toObject(Review.class));
        }

        return reviews;
    }

    public List<Review> getReviewsByUserId(String userId) throws ExecutionException, InterruptedException, IOException {
        Firestore firestore = firestoreConfig.firestore();
        DocumentReference userRef = firestore.collection("users").document(userId);

        ApiFuture<QuerySnapshot> future = firestore.collection("reviews")
                .whereEqualTo("userRef", userRef)
                .get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Review> reviews = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            reviews.add(document.toObject(Review.class));
        }

        return reviews;
    }

    public boolean updateReview(Review review) throws ExecutionException, InterruptedException, IOException {
        Firestore firestore = firestoreConfig.firestore();
        DocumentReference docRef = firestore.collection("reviews").document(review.getReviewId());

        ApiFuture<WriteResult> writeResult = docRef.set(review);
        writeResult.get();

        return true;
    }

    public boolean incrementLikeCount(String reviewId) throws ExecutionException, InterruptedException, IOException {
        Firestore firestore = firestoreConfig.firestore();
        DocumentReference docRef = firestore.collection("reviews").document(reviewId);

        // Transação para incrementar o contador de forma segura
        ApiFuture<Transaction> transaction = firestore.runTransaction(transaction1 -> {
            DocumentSnapshot snapshot = transaction1.get(docRef).get();
            if (snapshot.exists()) {
                // Obter o valor atual do contador
                Integer currentCount = snapshot.getLong("likeCount") != null
                        ? snapshot.getLong("likeCount").intValue()
                        : 0;

                // Incrementar o contador
                Map<String, Object> updates = new HashMap<>();
                updates.put("likeCount", currentCount + 1);

                // Atualizar o documento
                transaction1.update(docRef, updates);
            }
            return null;
        });

        // Aguardar conclusão da transação
        transaction.get();
        return true;
    }

    public boolean deleteReview(String reviewId) throws ExecutionException, InterruptedException, IOException {
        Firestore firestore = firestoreConfig.firestore();
        ApiFuture<WriteResult> writeResult = firestore.collection("reviews").document(reviewId).delete();
        writeResult.get();

        return true;
    }
}
