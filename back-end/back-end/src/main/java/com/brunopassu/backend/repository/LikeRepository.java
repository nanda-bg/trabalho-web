package com.brunopassu.backend.repository;

import com.brunopassu.backend.config.FirestoreConfig;
import com.brunopassu.backend.entity.Like;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Repository
public class LikeRepository {

    private final FirestoreConfig firestoreConfig;

    @Autowired
    public LikeRepository(FirestoreConfig firestoreConfig) {
        this.firestoreConfig = firestoreConfig;
    }

    public Optional<Like> findByUserUidAndReviewId(String userId, String reviewId) throws ExecutionException, InterruptedException, IOException {
        Firestore firestore = firestoreConfig.firestore();
        String likeId = userId + "_" + reviewId;

        DocumentReference docRef = firestore.collection(Like.PATH).document(likeId);
        DocumentSnapshot snapshot = docRef.get().get();

        if (snapshot.exists()) {
            Like like = snapshot.toObject(Like.class);
            return Optional.ofNullable(like);
        }

        return Optional.empty();
    }

    public boolean addLike(String userId, String reviewId) throws IOException {
        Firestore firestore = firestoreConfig.firestore();

        // Verifica se já existe like deste usuário
        Query query = firestore.collection(Like.PATH)
                .whereEqualTo("userUid", userId)
                .whereEqualTo("reviewId", reviewId)
                .limit(1);

        try {
            QuerySnapshot querySnapshot = query.get().get();
            if (!querySnapshot.isEmpty()) {
                return false; // Usuário já deu like
            }

            DocumentReference userRef = firestore.collection("users").document(userId);
            DocumentReference reviewRef = firestore.collection("reviews").document(reviewId);

            // Cria novo like
            Like like = new Like();
            like.setUserId(userId);
            like.setReviewId(reviewId);
            like.setCreatedAt(Timestamp.now());
            like.setUserRef(userRef);
            like.setReviewRef(reviewRef);

            // Gera ID ou usa combinação userId_reviewId
            String likeId = userId + "_" + reviewId;
            like.setLikeId(likeId);

            // Executa operações em batch
            WriteBatch batch = firestore.batch();

            // Adiciona documento de like
            DocumentReference likeRef = firestore.collection(Like.PATH).document(likeId);
            batch.set(likeRef, like);

            // Incrementa contador na review
            //DocumentReference reviewRef = firestore.collection("reviews").document(reviewId);
            batch.update(reviewRef, "likeCount", FieldValue.increment(1));

            // Commit da transação
            batch.commit().get();
            return true;
        } catch (Exception e) {
            System.err.println("Erro ao adicionar like: " + e.getMessage());
            return false;
        }
    }

    public boolean removeLike(String userId, String reviewId) throws IOException {
        Firestore firestore = firestoreConfig.firestore();
        String likeId = userId + "_" + reviewId;

        try {
            // Verifica se o like existe
            DocumentReference likeRef = firestore.collection(Like.PATH).document(likeId);
            DocumentSnapshot likeSnapshot = likeRef.get().get();

            if (!likeSnapshot.exists()) {
                return false; // Like não existe
            }

            // Executa operações em batch
            WriteBatch batch = firestore.batch();

            // Remove documento de like
            batch.delete(likeRef);

            // Decrementa contador na review
            DocumentReference reviewRef = firestore.collection("reviews").document(reviewId);
            batch.update(reviewRef, "likeCount", FieldValue.increment(-1));

            // Commit da transação
            batch.commit().get();
            return true;
        } catch (Exception e) {
            System.err.println("Erro ao remover like: " + e.getMessage());
            return false;
        }
    }



}
