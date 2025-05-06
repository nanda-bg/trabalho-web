package com.brunopassu.backend.repository;

import com.brunopassu.backend.entity.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.concurrent.ExecutionException;

@Repository
public class UserRepository {

    private static final String COLLECTION_NAME = "users";

    public String saveUser(User user) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();

        // Se o ID for nulo, deixe o Firestore gerar um ID

        if (user.getUid() == null || user.getUid().isEmpty()) {
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document();
            ApiFuture<WriteResult> result = docRef.set(user);
            result.get(); // Aguarda a conclusão da operação
        } else {
            //Caso contrário, use o ID fornecido
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(user.getUid());
            ApiFuture<WriteResult> result = docRef.set(user);
            result.get(); // Aguarda a conclusão da operação
        }

        return user.getUid();
    }
}
