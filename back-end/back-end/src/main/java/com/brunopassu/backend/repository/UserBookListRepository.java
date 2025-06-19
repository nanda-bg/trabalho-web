package com.brunopassu.backend.repository;

import com.brunopassu.backend.dto.UserBookListDTO;
import com.brunopassu.backend.entity.Book;
import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.entity.UserBookList;
import com.brunopassu.backend.entity.enums.SortOrder;
import com.brunopassu.backend.entity.enums.UserListType;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Repository
public class UserBookListRepository {
    private static final String USERS_COLLECTION = "users";
    private static final String BOOK_LISTS_SUBCOLLECTION = "bookLists";

    public String addBookToUserList(String userId, String bookId, UserListType listType)
            throws ExecutionException, InterruptedException {
        long startTime = System.currentTimeMillis();
        int totalReads = 0;
        System.out.println("[FIRESTORE WRITE] Starting addBookToUserList");
        System.out.println("Parameters: userId=" + userId + ", bookId=" + bookId + ", listType=" + listType);

        Firestore firestore = FirestoreClient.getFirestore();

        // Verificar se o livro já existe na lista
        System.out.println("Checking if book already exists in list...");
        Query existingQuery = firestore
                .collection(USERS_COLLECTION).document(userId)
                .collection(BOOK_LISTS_SUBCOLLECTION)
                .whereEqualTo("bookId", bookId)
                .whereEqualTo("listType", listType.toString());

        List<QueryDocumentSnapshot> existingDocs = existingQuery.get().get().getDocuments();
        totalReads += existingDocs.size();

        if (!existingDocs.isEmpty()) {
            System.out.println("Book already exists in " + listType + " list");
            System.out.println("TOTAL FIRESTORE READS: " + totalReads);
            System.out.println("[FIRESTORE WRITE] Completed addBookToUserList with error\n");
            throw new IllegalArgumentException("Book already in " + listType + " list");
        }

        System.out.println("Book not in list, proceeding with addition");
        UserBookList listItem = new UserBookList(userId, bookId, listType);

        DocumentReference docRef = firestore
                .collection(USERS_COLLECTION).document(userId)
                .collection(BOOK_LISTS_SUBCOLLECTION)
                .document();

        listItem.setUserBookListId(docRef.getId());

        System.out.println("Writing document with ID: " + docRef.getId());
        docRef.set(listItem).get();

        long endTime = System.currentTimeMillis();
        System.out.println("TOTAL FIRESTORE READS: " + totalReads);
        System.out.println("TOTAL FIRESTORE WRITES: 1");
        System.out.println("Execution time: " + (endTime - startTime) + "ms");
        System.out.println("Returning document ID: " + docRef.getId());
        System.out.println("[FIRESTORE WRITE] Completed addBookToUserList\n");

        return docRef.getId();
    }

    public List<UserBookListDTO> getUserBookListWithPagination(String userId, UserListType listType,
                                                               String lastItemId, int pageSize, SortOrder sortOrder)
            throws ExecutionException, InterruptedException {

        try {
            long startTime = System.currentTimeMillis();
            int totalReads = 0;
            System.out.println("[FIRESTORE READ] Starting getUserBookListWithPagination");
            System.out.println("Parameters: userId=" + userId + ", listType=" + listType +
                    ", lastItemId=" + lastItemId + ", pageSize=" + pageSize + ", sortOrder=" + sortOrder);

            Firestore firestore = FirestoreClient.getFirestore();

            Query.Direction direction = (sortOrder == SortOrder.NEWEST_FIRST)
                    ? Query.Direction.DESCENDING
                    : Query.Direction.ASCENDING;

            Query query = firestore
                    .collection(USERS_COLLECTION).document(userId)
                    .collection(BOOK_LISTS_SUBCOLLECTION)
                    .whereEqualTo("listType", listType.toString())
                    .orderBy("addedAt", direction)
                    .limit(pageSize);

            if (lastItemId != null && !lastItemId.isEmpty()) {
                System.out.println("Reading cursor document: " + lastItemId);
                DocumentSnapshot lastDoc = firestore
                        .collection(USERS_COLLECTION).document(userId)
                        .collection(BOOK_LISTS_SUBCOLLECTION)
                        .document(lastItemId)
                        .get().get();
                totalReads++;

                if (!lastDoc.exists()) {
                    System.out.println("CURSOR ERROR: Document " + lastItemId + " does not exist");
                    return getUserBookListWithPagination(userId, listType, null, pageSize, sortOrder);
                }

                query = query.startAfter(lastDoc);
            }

            List<QueryDocumentSnapshot> listDocs = query.get().get().getDocuments();
            totalReads += listDocs.size();
            System.out.println("Query results: " + listDocs.size() + " user book list documents");

            // Get user data once
            DocumentSnapshot userDoc = firestore.collection(USERS_COLLECTION).document(userId).get().get();
            totalReads++;
            User user = userDoc.toObject(User.class);

            // Extract UserBookList objects with their document IDs
            List<UserBookListDTO> userBookListDTOs = new ArrayList<>();
            List<String> bookIds = new ArrayList<>();

            for (QueryDocumentSnapshot doc : listDocs) {
                UserBookList listItem = doc.toObject(UserBookList.class);

                UserBookListDTO dto = new UserBookListDTO();
                dto.setUserBookListId(doc.getId()); // PRESERVE THE DOCUMENT ID
                dto.setUserId(userId);
                dto.setBookId(listItem.getBookId());
                dto.setListType(listItem.getListType());

                // Convert Timestamp to LocalDateTime
                if (listItem.getAddedAt() != null) {
                    Instant instant = Instant.ofEpochSecond(
                            listItem.getAddedAt().getSeconds(),
                            listItem.getAddedAt().getNanos()
                    );
                    dto.setAddedAt(LocalDateTime.ofInstant(instant, ZoneId.systemDefault()));
                }

                dto.setUser(user); // Set user data

                userBookListDTOs.add(dto);
                bookIds.add(listItem.getBookId());
            }

            // Fetch books and associate them with list items
            List<Book> books = getBooksById(bookIds);
            Map<String, Book> bookMap = books.stream()
                    .collect(Collectors.toMap(Book::getBookId, book -> book));

            // Associate books with DTOs
            for (UserBookListDTO dto : userBookListDTOs) {
                Book book = bookMap.get(dto.getBookId());
                dto.setBook(book);
            }

            long endTime = System.currentTimeMillis();
            System.out.println("TOTAL FIRESTORE READS: " + totalReads);
            System.out.println("Execution time: " + (endTime - startTime) + "ms");
            System.out.println("Returning " + userBookListDTOs.size() + " user book list DTOs");
            System.out.println("[FIRESTORE READ] Completed getUserBookListWithPagination\n");

            return userBookListDTOs;

        } catch (Exception e) {
            System.out.println("PAGINATION ERROR: " + e.getMessage());
            if (lastItemId != null) {
                System.out.println("CURSOR RECOVERY: Retrying without cursor");
                return getUserBookListWithPagination(userId, listType, null, pageSize, sortOrder);
            }
            throw e;
        }
    }


    private List<Book> getBooksById(List<String> bookIds) throws ExecutionException, InterruptedException {
        if (bookIds.isEmpty()) {
            System.out.println("No book IDs to fetch");
            return new ArrayList<>();
        }

        System.out.println("Fetching " + bookIds.size() + " books by ID - preserving order");
        Firestore firestore = FirestoreClient.getFirestore();

        // Map para armazenar livros por ID
        Map<String, Book> bookMap = new HashMap<>();

        int batchCount = 0;
        for (int i = 0; i < bookIds.size(); i += 10) {
            List<String> batch = bookIds.subList(i, Math.min(i + 10, bookIds.size()));
            batchCount++;
            System.out.println("Processing batch " + batchCount + " with " + batch.size() + " book IDs");

            Query batchQuery = firestore.collection("books")
                    .whereIn(FieldPath.documentId(), batch);
            List<QueryDocumentSnapshot> docs = batchQuery.get().get().getDocuments();
            System.out.println("Batch " + batchCount + " returned " + docs.size() + " books");

            // Armazenar no map por ID
            for (QueryDocumentSnapshot doc : docs) {
                try {
                    Book book = doc.toObject(Book.class);
                    if (book != null) {
                        bookMap.put(doc.getId(), book);
                        System.out.println("Successfully converted book: " + book.getBookId());
                    } else {
                        Book manualBook = convertDocumentToBook(doc);
                        if (manualBook != null) {
                            bookMap.put(doc.getId(), manualBook);
                            System.out.println("Manual conversion successful for: " + manualBook.getBookId());
                        }
                    }
                } catch (Exception e) {
                    System.out.println("Error converting document " + doc.getId() + ": " + e.getMessage());
                    try {
                        Book manualBook = convertDocumentToBook(doc);
                        if (manualBook != null) {
                            bookMap.put(doc.getId(), manualBook);
                            System.out.println("Manual conversion successful for: " + manualBook.getBookId());
                        }
                    } catch (Exception ex) {
                        System.out.println("Manual conversion also failed for " + doc.getId());
                        ex.printStackTrace();
                    }
                }
            }
        }

        //PRESERVA A ORDEM ORIGINAL DOS LIVROS
        List<Book> orderedBooks = new ArrayList<>();
        for (String bookId : bookIds) {
            Book book = bookMap.get(bookId);
            if (book != null) {
                orderedBooks.add(book);
                System.out.println("Added book in correct order: " + bookId);
            } else {
                System.out.println("Book not found for ID: " + bookId);
            }
        }

        System.out.println("Total books fetched in correct order: " + orderedBooks.size());
        return orderedBooks;
    }

    private int calculateBookReads(int bookCount) {
        return (int) Math.ceil((double) bookCount / 10);
    }

    public boolean removeBookFromUserList(String userId, String bookId, UserListType listType)
            throws ExecutionException, InterruptedException {
        long startTime = System.currentTimeMillis();
        int totalReads = 0;
        System.out.println("[FIRESTORE DELETE] Starting removeBookFromUserList");
        System.out.println("Parameters: userId=" + userId + ", bookId=" + bookId + ", listType=" + listType);

        Firestore firestore = FirestoreClient.getFirestore();

        System.out.println("Searching for book in user list...");
        Query query = firestore
                .collection(USERS_COLLECTION).document(userId)
                .collection(BOOK_LISTS_SUBCOLLECTION)
                .whereEqualTo("bookId", bookId)
                .whereEqualTo("listType", listType.toString());

        List<QueryDocumentSnapshot> docs = query.get().get().getDocuments();
        totalReads += docs.size();
        System.out.println("Query results: " + docs.size() + " documents found");

        if (docs.isEmpty()) {
            System.out.println("Book not found in " + listType + " list");
            long endTime = System.currentTimeMillis();
            System.out.println("TOTAL FIRESTORE READS: " + totalReads);
            System.out.println("Execution time: " + (endTime - startTime) + "ms");
            System.out.println("[FIRESTORE DELETE] Completed removeBookFromUserList - not found\n");
            return false;
        }

        System.out.println("Deleting document: " + docs.get(0).getId());
        docs.get(0).getReference().delete().get();

        long endTime = System.currentTimeMillis();
        System.out.println("TOTAL FIRESTORE READS: " + totalReads);
        System.out.println("TOTAL FIRESTORE DELETES: 1");
        System.out.println("Execution time: " + (endTime - startTime) + "ms");
        System.out.println("Book successfully removed from " + listType + " list");
        System.out.println("[FIRESTORE DELETE] Completed removeBookFromUserList\n");

        return true;
    }

    public boolean isBookInUserList(String userId, String bookId, UserListType listType)
            throws ExecutionException, InterruptedException {
        long startTime = System.currentTimeMillis();
        System.out.println("[FIRESTORE READ] Starting isBookInUserList");
        System.out.println("Parameters: userId=" + userId + ", bookId=" + bookId + ", listType=" + listType);

        Firestore firestore = FirestoreClient.getFirestore();

        Query query = firestore
                .collection(USERS_COLLECTION).document(userId)
                .collection(BOOK_LISTS_SUBCOLLECTION)
                .whereEqualTo("bookId", bookId)
                .whereEqualTo("listType", listType.toString())
                .limit(1);

        System.out.println("Executing existence check query...");
        List<QueryDocumentSnapshot> docs = query.get().get().getDocuments();
        int totalReads = docs.size();

        boolean exists = !docs.isEmpty();

        long endTime = System.currentTimeMillis();
        System.out.println("Query results: " + (exists ? "Book found in list" : "Book not in list"));
        System.out.println("TOTAL FIRESTORE READS: " + totalReads);
        System.out.println("Execution time: " + (endTime - startTime) + "ms");
        System.out.println("[FIRESTORE READ] Completed isBookInUserList\n");

        return exists;
    }

    public boolean isBookInFavorites(String userId, String bookId)
            throws ExecutionException, InterruptedException {
        return isBookInUserList(userId, bookId, UserListType.FAVORITES);
    }

    public boolean isBookInFutureReads(String userId, String bookId)
            throws ExecutionException, InterruptedException {
        return isBookInUserList(userId, bookId, UserListType.FUTURE_READS);
    }

    // GAMBIARRA PRA ARRUMAR ERRO DE CONVERSÃO DE DOCUMENTOS
    private Book convertDocumentToBook(QueryDocumentSnapshot doc) {
        try {
            Map<String, Object> data = doc.getData();
            if (data == null) {
                return null;
            }

            Book book = new Book();

            // Definir o bookId do documento
            book.setBookId(doc.getId());

            // Converter campos básicos com verificação de null
            if (data.get("title") != null) {
                book.setTitle(data.get("title").toString());
            }

            if (data.get("description") != null) {
                book.setDescription(data.get("description").toString());
            }

            if (data.get("coverUrl") != null) {
                book.setCoverUrl(data.get("coverUrl").toString());
            }

            if (data.get("genre") != null) {
                book.setGenre(data.get("genre").toString());
            }

            // Converter campos numéricos com tratamento de tipo
            if (data.get("publicationYear") != null) {
                Object yearObj = data.get("publicationYear");
                if (yearObj instanceof Number) {
                    book.setPublicationYear(((Number) yearObj).intValue());
                } else if (yearObj instanceof String) {
                    try {
                        book.setPublicationYear(Integer.parseInt(yearObj.toString()));
                    } catch (NumberFormatException e) {
                        System.out.println("Could not parse publication year: " + yearObj);
                    }
                }
            }

            if (data.get("pagesCount") != null) {
                Object pagesObj = data.get("pagesCount");
                if (pagesObj instanceof Number) {
                    book.setPagesCount(((Number) pagesObj).intValue());
                } else if (pagesObj instanceof String) {
                    try {
                        book.setPagesCount(Integer.parseInt(pagesObj.toString()));
                    } catch (NumberFormatException e) {
                        System.out.println("Could not parse pages count: " + pagesObj);
                    }
                }
            }

            if (data.get("ratingsCount") != null) {
                Object ratingsObj = data.get("ratingsCount");
                if (ratingsObj instanceof Number) {
                    book.setRatingsCount(((Number) ratingsObj).intValue());
                } else if (ratingsObj instanceof String) {
                    try {
                        book.setRatingsCount(Integer.parseInt(ratingsObj.toString()));
                    } catch (NumberFormatException e) {
                        System.out.println("Could not parse ratings count: " + ratingsObj);
                    }
                }
            }

            if (data.get("averageRating") != null) {
                Object avgRatingObj = data.get("averageRating");
                if (avgRatingObj instanceof Number) {
                    book.setAverageRating(((Number) avgRatingObj).doubleValue());
                } else if (avgRatingObj instanceof String) {
                    try {
                        book.setAverageRating(Double.parseDouble(avgRatingObj.toString()));
                    } catch (NumberFormatException e) {
                        System.out.println("Could not parse average rating: " + avgRatingObj);
                    }
                }
            }

            if (data.get("relevanceScore") != null) {
                Object relevanceObj = data.get("relevanceScore");
                if (relevanceObj instanceof Number) {
                    book.setRelevanceScore(((Number) relevanceObj).doubleValue());
                } else if (relevanceObj instanceof String) {
                    try {
                        book.setRelevanceScore(Double.parseDouble(relevanceObj.toString()));
                    } catch (NumberFormatException e) {
                        System.out.println("Could not parse relevance score: " + relevanceObj);
                    }
                }
            }

            // Converter lista de autores
            if (data.get("authors") != null && data.get("authors") instanceof List) {
                @SuppressWarnings("unchecked")
                List<Object> authorsObj = (List<Object>) data.get("authors");
                List<String> authors = new ArrayList<>();
                for (Object author : authorsObj) {
                    if (author != null) {
                        authors.add(author.toString());
                    }
                }
                book.setAuthors(authors);
            }

            return book;

        } catch (Exception e) {
            System.out.println("Error in manual document conversion: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
