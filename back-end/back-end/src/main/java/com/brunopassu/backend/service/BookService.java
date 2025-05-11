package com.brunopassu.backend.service;

import com.brunopassu.backend.config.FirestoreConfig;
import com.brunopassu.backend.entity.Book;
import com.brunopassu.backend.exception.BookTitleImmutableFieldException;
import com.brunopassu.backend.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class BookService {

    private BookRepository bookRepository;
    private final FirestoreConfig firestore;

    public BookService(BookRepository bookRepository, FirestoreConfig firestore) {
        this.bookRepository = bookRepository;
        this.firestore = firestore;
    }

    public String addBook(Book book) throws ExecutionException, InterruptedException, IOException, BookTitleImmutableFieldException {
        boolean check = checkTitleExists(book.getTitle());
        try {
            if (check) {
                throw new BookTitleImmutableFieldException(book.getTitle());
            }
        } catch (BookTitleImmutableFieldException e) {
            throw new BookTitleImmutableFieldException(e.getMessage());
        }
        book.setAverageRating(0.0);
        book.setRatingsCount(0);
        return bookRepository.saveBook(book);
    }

    public List<Book> getAllBooks() throws ExecutionException, InterruptedException {
        return bookRepository.getAllBooks();
    }

    public Book getBookById(String bookId) throws ExecutionException, InterruptedException {
        return bookRepository.getBookById(bookId);
    }


    public boolean updateBook(Book book) throws ExecutionException, InterruptedException {
        return bookRepository.updateBook(book);
    }

    public boolean updateBookFields(String bookId, Map<String, Object> fields) throws ExecutionException, InterruptedException {
        return bookRepository.updateBookFields(bookId, fields);
    }

    public boolean deleteBook(String bookId) throws ExecutionException, InterruptedException {
        return bookRepository.deleteBook(bookId);
    }

    public boolean checkTitleExists(String title) throws ExecutionException, InterruptedException, IOException {
        return firestore.firestore().
                collection("books")
                .whereEqualTo("title", title)
                .get()
                .get() // Segundo get() para obter o resultado do Future
                .getDocuments()
                .size() > 0;
    }

}
