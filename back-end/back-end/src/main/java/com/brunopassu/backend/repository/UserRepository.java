package com.brunopassu.backend.repository;

import com.brunopassu.backend.entity.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
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

    public User getUserByUsername(String username) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        CollectionReference usersRef = firestore.collection(COLLECTION_NAME);
        Query query = usersRef.whereEqualTo("username", username);
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        if (!documents.isEmpty()) {
            return documents.get(0).toObject(User.class);
        } else {
            return null;
        }
    }


    public User getUserById(String userId) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(userId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            return document.toObject(User.class);
        } else {
            return null; // Ou lance uma exceção, dependendo do seu caso de uso
        }
    }

    public List<User> getAllUsers() throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> query = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = query.get().getDocuments();
        List<User> users = new ArrayList<>();

        for (QueryDocumentSnapshot document : documents) {
            User user = document.toObject(User.class);
            users.add(user);
        }

        return users;
    }

    public boolean updateUser(User user) throws ExecutionException, InterruptedException {
        if (user.getUid() == null || user.getUid().isEmpty()) {
            return false; // Não podemos atualizar sem um ID
        }

        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(user.getUid());

        // Verifica se o documento existe antes de atualizar
        DocumentSnapshot document = docRef.get().get();
        if (!document.exists()) {
            return false;
        }

        // Atualiza o documento
        ApiFuture<WriteResult> writeResult = docRef.set(user);
        writeResult.get(); // Aguarda a operação ser concluída

        return true;
    }

    public boolean deleteUser(String userId) throws ExecutionException, InterruptedException {
        if (userId == null || userId.isEmpty()) {
            return false;
        }

        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(userId);

        // Verifica se o documento existe antes de deletar
        DocumentSnapshot document = docRef.get().get();
        if (!document.exists()) {
            return false;
        }

        // Deleta o documento
        ApiFuture<WriteResult> writeResult = docRef.delete();
        writeResult.get(); // Aguarda a operação ser concluída

        return true;
    }
}
