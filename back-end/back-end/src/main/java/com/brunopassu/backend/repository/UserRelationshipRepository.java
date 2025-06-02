package com.brunopassu.backend.repository;

import com.brunopassu.backend.config.FirestoreConfig;
import com.brunopassu.backend.entity.UserRelationship;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class UserRelationshipRepository {
    private static final String COLLECTION_NAME = "user_relationships";

    private final FirestoreConfig firestoreConfig;

    @Autowired
    public UserRelationshipRepository(FirestoreConfig firestoreConfig) {
        this.firestoreConfig = firestoreConfig;
    }

    public boolean toggleFollow(String followerId, String followingId) throws IOException, ExecutionException, InterruptedException {
        Firestore firestore = firestoreConfig.firestore();
        String relationshipId = followerId + "_" + followingId;

        // Verificar se o relacionamento já existe
        DocumentReference relationshipRef = firestore.collection(COLLECTION_NAME).document(relationshipId);
        DocumentSnapshot snapshot = relationshipRef.get().get();

        WriteBatch batch = firestore.batch();

        if (snapshot.exists()) {
            // Relacionamento existe - remover (unfollow)
            batch.delete(relationshipRef);

            // Decrementar contadores
            DocumentReference followerRef = firestore.collection("users").document(followerId);
            DocumentReference followingRef = firestore.collection("users").document(followingId);

            batch.update(followerRef, "following", FieldValue.increment(-1));
            batch.update(followingRef, "followers", FieldValue.increment(-1));

            batch.commit().get();
            return false; // Indica que o usuário deixou de seguir
        } else {
            // Relacionamento não existe - criar (follow)
            UserRelationship relationship = new UserRelationship();
            relationship.setUserRelationshipId(relationshipId);
            relationship.setFollowerId(followerId);
            relationship.setFollowingId(followingId);
            relationship.setCreatedAt(Timestamp.now());

            DocumentReference followerRef = firestore.collection("users").document(followerId);
            DocumentReference followingRef = firestore.collection("users").document(followingId);

            relationship.setFollowerRef(followerRef);
            relationship.setFollowingRef(followingRef);

            batch.set(relationshipRef, relationship);

            // Incrementar contadores
            batch.update(followerRef, "following", FieldValue.increment(1));
            batch.update(followingRef, "followers", FieldValue.increment(1));

            batch.commit().get();
            return true; // Indica que o usuário começou a seguir
        }
    }

    public List<UserRelationship> getFollowers(String userId) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();

        Query query = firestore.collection(COLLECTION_NAME).whereEqualTo("followingId", userId);
        ApiFuture<QuerySnapshot> future = query.get();

        List<UserRelationship> relationships = new ArrayList<>();
        for (DocumentSnapshot document : future.get().getDocuments()) {
            relationships.add(document.toObject(UserRelationship.class));
        }

        return relationships;
    }

    public List<UserRelationship> getFollowing(String userId) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();

        Query query = firestore.collection(COLLECTION_NAME).whereEqualTo("followerId", userId);
        ApiFuture<QuerySnapshot> future = query.get();

        List<UserRelationship> relationships = new ArrayList<>();
        for (DocumentSnapshot document : future.get().getDocuments()) {
            relationships.add(document.toObject(UserRelationship.class));
        }

        return relationships;
    }
}
