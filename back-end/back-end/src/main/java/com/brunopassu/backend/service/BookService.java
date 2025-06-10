package com.brunopassu.backend.service;

import com.brunopassu.backend.config.FirestoreConfig;
import com.brunopassu.backend.entity.Book;
import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.entity.enums.UserType;
import com.brunopassu.backend.exception.BookTitleImmutableFieldException;
import com.brunopassu.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class BookService {

    private BookRepository bookRepository;
    private final FirestoreConfig firestore;
    private UserService userService;

    @Autowired
    public BookService(BookRepository bookRepository, FirestoreConfig firestore, UserService userService) {
        this.bookRepository = bookRepository;
        this.firestore = firestore;
        this.userService = userService;
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

    public boolean checkUserType(@RequestHeader HttpHeaders request) throws ExecutionException, InterruptedException {
        //PEGA O TOKEN DO HEADER
        List<String> list = request.get("authorization");
        String token = list.get(0);
        String userId = userService.getUserIdFromToken(token);
        //VERIFICA SE O USUÁRIO N É NULO
        if (userId == null || userId.isEmpty()) {
            return false; // Usuário não autenticado
        }

        User user = userService.getUserById(userId);

        if (user.getUserType() == UserType.CONTRIBUIDOR) {
            return true; // USUARIO CONTRIBUIDOR PODE ADICIONAR LIVROS
        }
        else {
            return false;
        }
    }
}
