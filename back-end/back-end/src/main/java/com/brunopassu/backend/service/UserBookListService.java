package com.brunopassu.backend.service;

import com.brunopassu.backend.cacheManager.RedisUserBookListCacheManager;
import com.brunopassu.backend.dto.UserBookListDTO;
import com.brunopassu.backend.entity.enums.SortOrder;
import com.brunopassu.backend.entity.enums.UserListType;
import com.brunopassu.backend.repository.UserBookListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserBookListService {

    @Autowired
    private UserBookListRepository userBookListRepository;

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    @Autowired
    private RedisUserBookListCacheManager userBookListCacheManager;

    @Cacheable(value = "user-favorites", key = "#userId + '_' + #lastItemId + '_' + #pageSize + '_' + #sortOrder")
    public List<UserBookListDTO> getUserFavorites(String userId, String lastItemId, Integer pageSize, SortOrder sortOrder)
            throws ExecutionException, InterruptedException {

        String cacheKey = userId + "_" + lastItemId + "_" + pageSize + "_" + sortOrder;
        System.out.println("[CACHE] Cache key: " + cacheKey);
        System.out.println("[CACHE] SortOrder: " + sortOrder);

        int actualPageSize = (pageSize != null && pageSize > 0) ? pageSize : 20;
        SortOrder actualSortOrder = (sortOrder != null) ? sortOrder : SortOrder.NEWEST_FIRST;

        return userBookListRepository.getUserBookListWithPagination(
                userId, UserListType.FAVORITES, lastItemId, actualPageSize, actualSortOrder);
    }

    @Cacheable(value = "user-future-reads", key = "#userId + '_' + #lastItemId + '_' + #pageSize + '_' + #sortOrder")
    public List<UserBookListDTO> getUserFutureReads(String userId, String lastItemId, Integer pageSize, SortOrder sortOrder)
            throws ExecutionException, InterruptedException {

        String cacheKey = userId + "_" + lastItemId + "_" + pageSize + "_" + sortOrder;
        System.out.println("[CACHE] Cache key: " + cacheKey);
        System.out.println("[CACHE] SortOrder: " + sortOrder);

        int actualPageSize = (pageSize != null && pageSize > 0) ? pageSize : 20;
        SortOrder actualSortOrder = (sortOrder != null) ? sortOrder : SortOrder.NEWEST_FIRST;

        return userBookListRepository.getUserBookListWithPagination(
                userId, UserListType.FUTURE_READS, lastItemId, actualPageSize, actualSortOrder);
    }

    public String addBookToFavorites(String userId, String bookId)
            throws ExecutionException, InterruptedException {
        // Verificar se o livro existe
        if (bookService.getBookById(bookId) == null) {
            throw new IllegalArgumentException("Book not found");
        }

        String result = userBookListRepository.addBookToUserList(userId, bookId, UserListType.FAVORITES);

        // INVALIDAR CACHE após adicionar
        userBookListCacheManager.invalidateUserBookListCaches(userId);
        System.out.println("[CACHE INVALIDATION] Cache invalidated after adding book to favorites");

        return result;
    }

    public String addBookToFutureReads(String userId, String bookId)
            throws ExecutionException, InterruptedException {

        if (bookService.getBookById(bookId) == null) {
            throw new IllegalArgumentException("Book not found");
        }
        String result = userBookListRepository.addBookToUserList(userId, bookId, UserListType.FUTURE_READS);

        userBookListCacheManager.invalidateUserBookListCaches(userId);
        System.out.println("[CACHE INVALIDATION] Cache invalidated after adding book to future reads");

        return result;
    }

    public boolean removeBookFromFavorites(String userId, String bookId)
            throws ExecutionException, InterruptedException {
        boolean removed = userBookListRepository.removeBookFromUserList(userId, bookId, UserListType.FAVORITES);

        if (removed) {
            // INVALIDAR CACHE após remover - AQUI É O PONTO PRINCIPAL
            userBookListCacheManager.invalidateSpecificBookCache(userId, bookId);
            System.out.println("[CACHE INVALIDATION] Cache invalidated after removing book from favorites");
        }

        return removed;

    }

    public boolean removeBookFromFutureReads(String userId, String bookId)
            throws ExecutionException, InterruptedException {

        boolean removed = userBookListRepository.removeBookFromUserList(userId, bookId, UserListType.FUTURE_READS);

        if (removed) {
            // INVALIDAR CACHE após remover - AQUI É O PONTO PRINCIPAL
            userBookListCacheManager.invalidateSpecificBookCache(userId, bookId);
            System.out.println("[CACHE INVALIDATION] Cache invalidated after removing book from future reads");
        }

        return removed;
    }

    @Cacheable(value = "book-in-favorites", key = "#userId + '_' + #bookId")
    public boolean isBookInFavorites(String userId, String bookId)
            throws ExecutionException, InterruptedException {
        return userBookListRepository.isBookInFavorites(userId, bookId);
    }

    @Cacheable(value = "book-in-future-reads", key = "#userId + '_' + #bookId")
    public boolean isBookInFutureReads(String userId, String bookId)
            throws ExecutionException, InterruptedException {
        return userBookListRepository.isBookInFutureReads(userId, bookId);
    }
}

