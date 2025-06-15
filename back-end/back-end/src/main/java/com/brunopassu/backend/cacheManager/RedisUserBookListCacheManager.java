package com.brunopassu.backend.cacheManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class RedisUserBookListCacheManager {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private CacheManager cacheManager;

    public void invalidateUserBookListCaches(String userId) {
        long startTime = System.currentTimeMillis();
        System.out.println("[CACHE INVALIDATION] Starting UserBookList cache invalidation for userId: " + userId);

        try {
            // Invalidar cache de favoritos
            invalidateFavoritesCache(userId);

            // Invalidar cache de leituras futuras
            invalidateFutureReadsCache(userId);

            // Invalidar cache de verificação de existência
            invalidateExistenceCache(userId);

        } catch (Exception e) {
            System.err.println("[CACHE INVALIDATION] Redis error: " + e.getMessage());
            fallbackCacheInvalidation(userId);
        }

        long endTime = System.currentTimeMillis();
        System.out.println("[CACHE INVALIDATION] UserBookList cache invalidation completed in " + (endTime - startTime) + "ms");
    }

    private void invalidateFavoritesCache(String userId) {
        System.out.println("🗑️ [CACHE INVALIDATION] Invalidating favorites cache for userId: " + userId);

        // Padrão para cache de favoritos: userId_lastItemId_pageSize_sortOrder
        String pattern = "*user-favorites*" + userId + "*";
        Set<String> keys = redisTemplate.keys(pattern);

        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
            System.out.println("[CACHE INVALIDATION] Deleted " + keys.size() + " favorites cache entries");
            System.out.println("[CACHE INVALIDATION] Favorites keys deleted: " + keys);
        } else {
            System.out.println("[CACHE INVALIDATION] No favorites cache entries found for pattern: " + pattern);
        }
    }

    private void invalidateFutureReadsCache(String userId) {
        System.out.println("🗑️ [CACHE INVALIDATION] Invalidating future reads cache for userId: " + userId);

        // Padrão para cache de leituras futuras: userId_lastItemId_pageSize_sortOrder
        String pattern = "*user-future-reads*" + userId + "*";
        Set<String> keys = redisTemplate.keys(pattern);

        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
            System.out.println("[CACHE INVALIDATION] Deleted " + keys.size() + " future reads cache entries");
            System.out.println("[CACHE INVALIDATION] Future reads keys deleted: " + keys);
        } else {
            System.out.println("[CACHE INVALIDATION] No future reads cache entries found for pattern: " + pattern);
        }
    }

    private void invalidateExistenceCache(String userId) {
        System.out.println("🗑️ [CACHE INVALIDATION] Invalidating existence cache for userId: " + userId);

        // Padrão para cache de verificação: userId_bookId
        String favoritesPattern = "*book-in-favorites*" + userId + "*";
        String futureReadsPattern = "*book-in-future-reads*" + userId + "*";

        Set<String> favoritesKeys = redisTemplate.keys(favoritesPattern);
        Set<String> futureReadsKeys = redisTemplate.keys(futureReadsPattern);

        int deletedCount = 0;

        if (favoritesKeys != null && !favoritesKeys.isEmpty()) {
            redisTemplate.delete(favoritesKeys);
            deletedCount += favoritesKeys.size();
            System.out.println("[CACHE INVALIDATION] Favorites existence keys deleted: " + favoritesKeys);
        }

        if (futureReadsKeys != null && !futureReadsKeys.isEmpty()) {
            redisTemplate.delete(futureReadsKeys);
            deletedCount += futureReadsKeys.size();
            System.out.println("[CACHE INVALIDATION] Future reads existence keys deleted: " + futureReadsKeys);
        }

        System.out.println("[CACHE INVALIDATION] Total existence cache entries deleted: " + deletedCount);
    }

    private void fallbackCacheInvalidation(String userId) {
        System.out.println("[FALLBACK] Using Spring Cache eviction for userId: " + userId);

        // Fallback para favoritos
        Cache favoritesCache = cacheManager.getCache("user-favorites");
        if (favoritesCache != null) {
            favoritesCache.clear();
            System.out.println("[FALLBACK] Cleared entire favorites cache");
        }

        // Fallback para leituras futuras
        Cache futureReadsCache = cacheManager.getCache("user-future-reads");
        if (futureReadsCache != null) {
            futureReadsCache.clear();
            System.out.println("[FALLBACK] Cleared entire future reads cache");
        }

        // Fallback para verificação de existência
        Cache favoritesExistenceCache = cacheManager.getCache("book-in-favorites");
        if (favoritesExistenceCache != null) {
            favoritesExistenceCache.clear();
            System.out.println("[FALLBACK] Cleared entire favorites existence cache");
        }

        Cache futureReadsExistenceCache = cacheManager.getCache("book-in-future-reads");
        if (futureReadsExistenceCache != null) {
            futureReadsExistenceCache.clear();
            System.out.println("[FALLBACK] Cleared entire future reads existence cache");
        }
    }

    // Método específico para invalidar cache quando um livro específico é removido
    public void invalidateSpecificBookCache(String userId, String bookId) {
        System.out.println("🗑️ [CACHE INVALIDATION] Invalidating cache for specific book removal - userId: " + userId + ", bookId: " + bookId);

        // Invalidar todas as listas do usuário (mais seguro)
        invalidateUserBookListCaches(userId);

        // Invalidar cache específico de verificação de existência
        String favoritesKey = userId + "_" + bookId;
        Cache favoritesExistenceCache = cacheManager.getCache("book-in-favorites");
        if (favoritesExistenceCache != null) {
            favoritesExistenceCache.evict(favoritesKey);
            System.out.println("[CACHE INVALIDATION] Evicted specific favorites existence cache key: " + favoritesKey);
        }

        Cache futureReadsExistenceCache = cacheManager.getCache("book-in-future-reads");
        if (futureReadsExistenceCache != null) {
            futureReadsExistenceCache.evict(favoritesKey);
            System.out.println("[CACHE INVALIDATION] Evicted specific future reads existence cache key: " + favoritesKey);
        }
    }
}

