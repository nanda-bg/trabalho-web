package com.brunopassu.backend.repository;

import com.brunopassu.backend.entity.Book;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Repository
public class BookRepository {

    private static final String COLLECTION_NAME = "books";

    public String saveBook(Book book) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();

        // Se o ID for nulo, deixe o Firestore gerar um ID
        if (book.getBookId() == null || book.getBookId().isEmpty()) {
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document();
            // Atribui o ID gerado ao objeto book
            book.setBookId(docRef.getId());
            ApiFuture<WriteResult> result = docRef.set(book);
            result.get(); // Aguarda a conclusão da operação
        } else {
            // Caso contrário, use o ID fornecido
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(book.getBookId());
            ApiFuture<WriteResult> result = docRef.set(book);
            result.get(); // Aguarda a conclusão da operação
        }

        return book.getBookId();
    }

    public List<Book> getAllBooks() throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Book> books = new ArrayList<>();

        for (QueryDocumentSnapshot document : documents) {
            books.add(document.toObject(Book.class));
        }
        return books;
    }

    public Book getBookById(String bookId) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(bookId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            return document.toObject(Book.class);
        } else {
            return null;
        }
    }

    public List<Book> getBooksByGenre(String genre) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();

        // Query para buscar onde o campo 'genre' é igual ao gênero
        ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("genre", genre)
                .get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Book> books = new ArrayList<>();

        for (QueryDocumentSnapshot document : documents) {
            books.add(document.toObject(Book.class));
        }
        return books;
    }

    public boolean updateBook(Book book) throws ExecutionException, InterruptedException {
        if (book.getBookId() == null || book.getBookId().isEmpty()) {
            return false; // Não podemos atualizar sem um ID
        }

        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(book.getBookId());

        // Verifica se o documento existe antes de atualizar
        DocumentSnapshot document = docRef.get().get();
        if (!document.exists()) {
            return false;
        }

        // Atualiza o documento
        ApiFuture<WriteResult> writeResult = docRef.set(book);
        writeResult.get(); // Aguarda a operação ser concluída

        return true;
    }

    public boolean updateBookFields(String bookId, Map<String, Object> fields) throws ExecutionException, InterruptedException {
        if (bookId == null || bookId.isEmpty() || fields == null || fields.isEmpty()) {
            return false;
        }

        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(bookId);

        // Verifica se o documento existe
        DocumentSnapshot document = docRef.get().get();
        if (!document.exists()) {
            return false;
        }

        // Atualiza apenas os campos fornecidos
        ApiFuture<WriteResult> writeResult = docRef.update(fields);
        writeResult.get(); // Aguarda a operação ser concluída

        return true;
    }

    public boolean deleteBook(String bookId) throws ExecutionException, InterruptedException {
        if (bookId == null || bookId.isEmpty()) {
            return false;
        }

        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(bookId);

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
