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
    private static final int DEFAULT_PAGE_SIZE = 20;

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

    public List<Book> getBooksWithPagination(String lastBookId, int pageSize)
            throws ExecutionException, InterruptedException {

        long startTime = System.currentTimeMillis();
        int totalReads = 0;

        System.out.println("🔍 [FIRESTORE READ] Starting getBooksWithPagination");
        System.out.println("   Parameters: lastBookId=" + lastBookId + ", pageSize=" + pageSize);

        Firestore firestore = FirestoreClient.getFirestore();

        Query query = firestore.collection(COLLECTION_NAME)
                .orderBy("relevanceScore", Query.Direction.DESCENDING)
                .limit(pageSize);

        // Se não é a primeira página, use cursor
        if (lastBookId != null && !lastBookId.isEmpty()) {
            System.out.println("   📖 Reading cursor document: " + lastBookId);
            DocumentSnapshot lastDoc = firestore.collection(COLLECTION_NAME)
                    .document(lastBookId)
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

        List<Book> books = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            books.add(document.toObject(Book.class));
        }

        long endTime = System.currentTimeMillis();
        System.out.println("   🎯 TOTAL FIRESTORE READS: " + totalReads);
        System.out.println("   ⏱️  Execution time: " + (endTime - startTime) + "ms");
        System.out.println("   📤 Returning " + books.size() + " books");
        System.out.println("🔚 [FIRESTORE READ] Completed getBooksWithPagination\n");

        return books;
    }

    public List<Book> getAllBooks() throws ExecutionException, InterruptedException {
        long startTime = System.currentTimeMillis();

        System.out.println("🔍 [FIRESTORE READ] Starting getAllBooks");
        System.out.println("   ⚠️  WARNING: This method reads ALL documents in collection!");

        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        int totalReads = documents.size();

        List<Book> books = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            books.add(document.toObject(Book.class));
        }

        long endTime = System.currentTimeMillis();
        System.out.println("   🎯 TOTAL FIRESTORE READS: " + totalReads);
        System.out.println("   ⏱️  Execution time: " + (endTime - startTime) + "ms");
        System.out.println("   📤 Returning " + books.size() + " books");
        System.out.println("🔚 [FIRESTORE READ] Completed getAllBooks\n");

        return books;
    }

    public Book getBookById(String bookId) throws ExecutionException, InterruptedException {
        long startTime = System.currentTimeMillis();

        System.out.println("🔍 [FIRESTORE READ] Starting getBookById");
        System.out.println("   Parameters: bookId=" + bookId);

        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(bookId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        int totalReads = 1; // Sempre 1 read para buscar por ID
        Book book = null;

        if (document.exists()) {
            book = document.toObject(Book.class);
            System.out.println("   ✅ Document found");
        } else {
            System.out.println("   ❌ Document not found");
        }

        long endTime = System.currentTimeMillis();
        System.out.println("   🎯 TOTAL FIRESTORE READS: " + totalReads);
        System.out.println("   ⏱️  Execution time: " + (endTime - startTime) + "ms");
        System.out.println("🔚 [FIRESTORE READ] Completed getBookById\n");

        return book;
    }

    public List<Book> getBooksByGenre(String genre) throws ExecutionException, InterruptedException {
        long startTime = System.currentTimeMillis();

        System.out.println("🔍 [FIRESTORE READ] Starting getBooksByGenre");
        System.out.println("   Parameters: genre=" + genre);

        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("genre", genre)
                .get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        int totalReads = documents.size();

        System.out.println("   📊 Query results: " + documents.size() + " documents");

        List<Book> books = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            books.add(document.toObject(Book.class));
        }

        long endTime = System.currentTimeMillis();
        System.out.println("   🎯 TOTAL FIRESTORE READS: " + totalReads);
        System.out.println("   ⏱️  Execution time: " + (endTime - startTime) + "ms");
        System.out.println("   📤 Returning " + books.size() + " books");
        System.out.println("🔚 [FIRESTORE READ] Completed getBooksByGenre\n");

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
