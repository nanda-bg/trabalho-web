package com.brunopassu.backend.controller;

import com.brunopassu.backend.entity.Book;
import com.brunopassu.backend.exception.BookTitleImmutableFieldException;
import com.brunopassu.backend.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*") //ESTUDAR COMO MELHORAR ISSO!
/*
@CrossOrigin(origins = {"https://seu-frontend.com"},
             methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
                        RequestMethod.DELETE, RequestMethod.PATCH},
             allowedHeaders = "*")
 */
public class BookController {

    @Autowired
    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    public ResponseEntity<String> createBook(@Valid @RequestBody Book book, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Erro de validação: " + result.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        try {
            String bookId = bookService.addBook(book);
            return new ResponseEntity<>("Livro criado com ID: " + bookId, HttpStatus.CREATED);
        } catch (BookTitleImmutableFieldException e) {
            return new ResponseEntity<>("O título: '" + e.getMessage() + "' já existe!", HttpStatus.CONFLICT);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>("Erro ao criar livro: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        try {
            List<Book> books = bookService.getAllBooks();
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/id/{bookId}")
    public ResponseEntity<Book> getBookById(@PathVariable("bookId") String bookId) {
        try {
            Book book = bookService.getBookById(bookId);
            if (book != null) {
                return new ResponseEntity<>(book, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/id/{bookId}")
    public ResponseEntity<String> updateBook(@PathVariable("bookId") String bookId, @RequestBody Book book) {
        try {
            book.setBookId(bookId);

            boolean updated = bookService.updateBook(book);
            if (updated) {
                return new ResponseEntity<>("Livro atualizado com sucesso", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Livro não encontrado", HttpStatus.NOT_FOUND);
            }
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>("Erro ao atualizar livro: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/id/{bookId}")
    public ResponseEntity<String> deleteBook(@PathVariable("bookId") String bookId) {
        try {
            boolean deleted = bookService.deleteBook(bookId);
            if (deleted) {
                return new ResponseEntity<>("Livro deletado com sucesso", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Livro não encontrado", HttpStatus.NOT_FOUND);
            }
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>("Erro ao deletar livro: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
