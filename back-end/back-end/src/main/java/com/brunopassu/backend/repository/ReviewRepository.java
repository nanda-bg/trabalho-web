package com.brunopassu.backend.repository;

import com.brunopassu.backend.config.FirestoreConfig;
import com.brunopassu.backend.entity.Review;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
        long startTime = System.currentTimeMillis();
        System.out.println("🔍 [FIRESTORE READ] Starting getReviewById");
        System.out.println("   Parameters: reviewId=" + reviewId);

        Firestore firestore = firestoreConfig.firestore();
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(reviewId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        int totalReads = 1; // Sempre 1 read para buscar por ID

        Review review = null;
        if (document.exists()) {
            review = document.toObject(Review.class);
            System.out.println("   ✅ Document found");
        } else {
            System.out.println("   ❌ Document not found");
        }

        long endTime = System.currentTimeMillis();
        System.out.println("   🎯 TOTAL FIRESTORE READS: " + totalReads);
        System.out.println("   ⏱️ Execution time: " + (endTime - startTime) + "ms");
        System.out.println("🔚 [FIRESTORE READ] Completed getReviewById\n");

        return review;
    }

    public List<Review> getAllReviews() throws ExecutionException, InterruptedException, IOException {
        long startTime = System.currentTimeMillis();
        System.out.println("🔍 [FIRESTORE READ] Starting getAllReviews");
        System.out.println("   ⚠️ WARNING: This method reads ALL documents in collection!");

        Firestore firestore = firestoreConfig.firestore();
        ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        int totalReads = documents.size();

        List<Review> reviews = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            reviews.add(document.toObject(Review.class));
        }

        long endTime = System.currentTimeMillis();
        System.out.println("   🎯 TOTAL FIRESTORE READS: " + totalReads);
        System.out.println("   ⏱️ Execution time: " + (endTime - startTime) + "ms");
        System.out.println("   📤 Returning " + reviews.size() + " reviews");
        System.out.println("🔚 [FIRESTORE READ] Completed getAllReviews\n");

        return reviews;
    }

    public List<Review> getReviewsWithPagination(String lastReviewId, int pageSize)
            throws ExecutionException, InterruptedException, IOException {
        long startTime = System.currentTimeMillis();
        int totalReads = 0;
        System.out.println("🔍 [FIRESTORE READ] Starting getReviewsWithPagination");
        System.out.println("   Parameters: lastReviewId=" + lastReviewId + ", pageSize=" + pageSize);

        Firestore firestore = firestoreConfig.firestore();
        Query query = firestore.collection(COLLECTION_NAME)
                .orderBy("date", Query.Direction.DESCENDING)
                .limit(pageSize);

        // Se não é a primeira página, use cursor
        if (lastReviewId != null && !lastReviewId.isEmpty()) {
            System.out.println("   📖 Reading cursor document: " + lastReviewId);
            DocumentSnapshot lastDoc = firestore.collection(COLLECTION_NAME)
                    .document(lastReviewId)
                    .get()
                    .get();
            totalReads++; // Contabilizar leitura do cursor
            query = query.startAfter(lastDoc);
            System.out.println("   ✅ Cursor document read successfully");
        }

        System.out.println("   📚 Executing pagination query...");
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        totalReads += documents.size(); // Contabilizar documentos da paginação
        System.out.println("   📊 Query results: " + documents.size() + " documents");

        List<Review> reviews = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            reviews.add(document.toObject(Review.class));
        }

        long endTime = System.currentTimeMillis();
        System.out.println("   🎯 TOTAL FIRESTORE READS: " + totalReads);
        System.out.println("   ⏱️ Execution time: " + (endTime - startTime) + "ms");
        System.out.println("   📤 Returning " + reviews.size() + " reviews");
        System.out.println("🔚 [FIRESTORE READ] Completed getReviewsWithPagination\n");

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

        // Primeiro, verifique se o documento existe
        DocumentSnapshot snapshot = docRef.get().get();
        if (!snapshot.exists()) {
            return false;
        }

        // Use FieldValue.increment para atualização atômica
        ApiFuture<WriteResult> writeResult = docRef.update("likeCount", FieldValue.increment(1));
        writeResult.get();

        return true;
    }

    public boolean deleteReview(String reviewId) throws ExecutionException, InterruptedException, IOException {
        Firestore firestore = firestoreConfig.firestore();
        ApiFuture<WriteResult> writeResult = firestore.collection("reviews").document(reviewId).delete();
        writeResult.get();

        return true;
    }
}
