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
        long startTime = System.currentTimeMillis();
        System.out.println("[FIRESTORE READ] Starting getUserByUsername");
        System.out.println("Parameters: username=" + username);

        Firestore firestore = FirestoreClient.getFirestore();
        CollectionReference usersRef = firestore.collection(COLLECTION_NAME);
        Query query = usersRef.whereEqualTo("username", username);
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        int totalReads = 1;

        User user = null;
        if (!documents.isEmpty()) {
            user = documents.get(0).toObject(User.class);
            System.out.println("Document found");
        } else {
            System.out.println("Document not found");
        }

        long endTime = System.currentTimeMillis();
        System.out.println("TOTAL FIRESTORE READS: " + totalReads);
        System.out.println("Execution time: " + (endTime - startTime) + "ms");
        System.out.println("[FIRESTORE READ] Completed getUserById\n");

        return user;
    }


    public User getUserById(String userId) throws ExecutionException, InterruptedException {
        long startTime = System.currentTimeMillis();
        System.out.println("[FIRESTORE READ] Starting getUserById");
        System.out.println("Parameters: userId=" + userId);

        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(userId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        int totalReads = 1; // Sempre 1 read para buscar por ID

        User user = null;
        if (document.exists()) {
            user = document.toObject(User.class);
            System.out.println("Document found");
        } else {
            System.out.println("Document not found");
        }

        long endTime = System.currentTimeMillis();
        System.out.println("TOTAL FIRESTORE READS: " + totalReads);
        System.out.println("Execution time: " + (endTime - startTime) + "ms");
        System.out.println("[FIRESTORE READ] Completed getUserById\n");

        return user;
    }

    public List<User> getAllUsers() throws ExecutionException, InterruptedException {
        long startTime = System.currentTimeMillis();
        System.out.println("[FIRESTORE READ] Starting getAllUsers");
        System.out.println("WARNING: This method reads ALL documents in collection!");

        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> query = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = query.get().getDocuments();
        int totalReads = documents.size();

        List<User> users = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            User user = document.toObject(User.class);
            users.add(user);
        }

        long endTime = System.currentTimeMillis();
        System.out.println("TOTAL FIRESTORE READS: " + totalReads);
        System.out.println("Execution time: " + (endTime - startTime) + "ms");
        System.out.println("Returning " + users.size() + " users");
        System.out.println("[FIRESTORE READ] Completed getAllUsers\n");

        return users;
    }

    public List<User> getUsersWithPagination(String lastUserId, int pageSize)
            throws ExecutionException, InterruptedException {
        long startTime = System.currentTimeMillis();
        int totalReads = 0;
        System.out.println("[FIRESTORE READ] Starting getUsersWithPagination");
        System.out.println("Parameters: lastUserId=" + lastUserId + ", pageSize=" + pageSize);

        Firestore firestore = FirestoreClient.getFirestore();
        Query query = firestore.collection(COLLECTION_NAME)
                .orderBy("username", Query.Direction.ASCENDING)
                .limit(pageSize);

        // Se não é a primeira página, use cursor
        if (lastUserId != null && !lastUserId.isEmpty()) {
            System.out.println("Reading cursor document: " + lastUserId);
            DocumentSnapshot lastDoc = firestore.collection(COLLECTION_NAME)
                    .document(lastUserId)
                    .get()
                    .get();
            totalReads++; // Contabilizar leitura do cursor
            query = query.startAfter(lastDoc);
            System.out.println("Cursor document read successfully");
        }

        System.out.println("Executing pagination query...");
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        totalReads += documents.size(); // Contabilizar documentos da paginação
        System.out.println("Query results: " + documents.size() + " documents");

        List<User> users = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            users.add(document.toObject(User.class));
        }

        long endTime = System.currentTimeMillis();
        System.out.println("TOTAL FIRESTORE READS: " + totalReads);
        System.out.println("Execution time: " + (endTime - startTime) + "ms");
        System.out.println("Returning " + users.size() + " users");
        System.out.println("[FIRESTORE READ] Completed getUsersWithPagination\n");

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
