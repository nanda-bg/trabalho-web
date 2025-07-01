package com.brunopassu.backend.service;

import com.brunopassu.backend.config.FirestoreConfig;
import com.brunopassu.backend.entity.Book;
import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.entity.enums.UserType;
import com.brunopassu.backend.exception.BookTitleImmutableFieldException;
import com.brunopassu.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final FirestoreConfig firestore;
    private final UserService userService;

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

    //Cache para paginação - chave baseada em cursor e pageSize
    @Cacheable(value = "books-paginated", key = "#lastBookId + '_' + #pageSize")
    public List<Book> getBooksWithPagination(String lastBookId, Integer pageSize) throws ExecutionException, InterruptedException {
        // SÓ EXECUTA se não estiver no cache
        int actualPageSize = (pageSize != null && pageSize > 0) ? pageSize : 20;
        return bookRepository.getBooksWithPagination(lastBookId, actualPageSize);
    }

    //Cache para livro individual
    @Cacheable(value = "book-details", key = "#bookId")
    public Book getBookById(String bookId) throws ExecutionException, InterruptedException {
        // SÓ EXECUTA se não estiver no cache
        return bookRepository.getBookById(bookId);
    }

    // Cache para busca por gênero
    @Cacheable(value = "books-by-genre", key = "#genre")
    public List<Book> getBooksByGenre(String genre) throws ExecutionException, InterruptedException {

        return bookRepository.getBooksByGenre(genre);
    }

    // Cache para paginação por gênero
    @Cacheable(value = "books-genre-paginated", key = "#genre + '_' + #lastBookId + '_' + #pageSize")
    public List<Book> getBooksByGenreWithPagination(String genre, String lastBookId, Integer pageSize)
            throws ExecutionException, InterruptedException {
        // SÓ EXECUTA se não estiver no cache
        int actualPageSize = (pageSize != null && pageSize > 0) ? pageSize : 20;
        return bookRepository.getBooksByGenreWithPagination(genre, lastBookId, actualPageSize);
    }


    // Invalidar cache quando livro é atualizado
    @CacheEvict(value = {"book-details", "books-paginated", "books-by-genre", "books-genre-paginated"}, key = "#book.bookId", allEntries = false)
    public boolean updateBook(Book book) throws ExecutionException, InterruptedException {

        boolean updated = bookRepository.updateBook(book);

        if (updated) {
            evictGenreCache(book.getGenre());
        }
        return updated;
    }

    // Invalidar cache quando livro é deletado
    @CacheEvict(value = {"book-details", "books-paginated", "books-by-genre", "books-genre-paginated"}, key = "#bookId")
    public boolean deleteBook(String bookId) throws ExecutionException, InterruptedException {
        Book book = getBookById(bookId); // Buscar antes de deletar para invalidar gênero
        boolean deleted = bookRepository.deleteBook(bookId);
        if (deleted && book != null) {
            evictGenreCache(book.getGenre());
        }
        return deleted;
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

    //ERRADO!
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
        } else {
            return false;
        }
    }

    @CacheEvict(value = {"book-details", "books-by-genre"}, key = "#bookId")
    public void evictGenreCache(String genre) {
        // INVALIDAR CACHE
    }
    @CacheEvict(value = {"book-details", "books-paginated", "books-genre-paginated"}, allEntries = true)
    public void invalidateBookCache(String bookId) {
    }
}
