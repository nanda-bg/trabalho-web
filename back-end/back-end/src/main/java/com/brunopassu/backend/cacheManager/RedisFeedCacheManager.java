package com.brunopassu.backend.cacheManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class RedisFeedCacheManager {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate; //Acesso ao Redis

    @Autowired
    private CacheManager cacheManager; //Abstração do Spring Cache

    public void invalidateUserFeedCache(String userId) {
        long startTime = System.currentTimeMillis();
        System.out.println("🗑️ [CACHE INVALIDATION] Starting for userId: " + userId);

        try {
            String pattern = "*reviews-feed*" + userId + "*"; //busca todas as chaves do usuário

            Set<String> keys = redisTemplate.keys(pattern);

            if (keys != null && !keys.isEmpty()) {
                redisTemplate.delete(keys); //deleta todas as chaves encontradas
                System.out.println("[CACHE INVALIDATION] Deleted " + keys.size() + " cache entries");
                System.out.println("[CACHE INVALIDATION] Keys deleted: " + keys);
            } else {
                System.out.println("[CACHE INVALIDATION] No cache entries found for pattern: " + pattern);

                Set<String> allKeys = redisTemplate.keys("*reviews-feed*");
                System.out.println("[DEBUG] All feed cache keys: " + allKeys);

                // Fallback (backup)
                fallbackCacheInvalidation(userId);
            }

        } catch (Exception e) {
            System.err.println("[CACHE INVALIDATION] Redis error: " + e.getMessage());
            fallbackCacheInvalidation(userId);
        }

        long endTime = System.currentTimeMillis();
        System.out.println("[CACHE INVALIDATION] Completed in " + (endTime - startTime) + "ms");
    }

    private void fallbackCacheInvalidation(String userId) {
        System.out.println("[FALLBACK] Using Spring Cache eviction for userId: " + userId);

        Cache feedCache = cacheManager.getCache("reviews-feed");
        if (feedCache == null) {
            System.out.println("[FALLBACK] Cache 'reviews-feed' not found");
            return;
        }

        // apaga tod o cache para aquele usuario
        String[] commonPatterns = {
                userId + "_null_10",
                userId + "_null_20",
                userId + "_null_30",
                userId + "_null_50"
        };

        for (String pattern : commonPatterns) {
            feedCache.evict(pattern);
            System.out.println("[FALLBACK] Evicted cache key: " + pattern);
        }

        //APAGA tod o cache do feed
        feedCache.clear();
        System.out.println("[FALLBACK] Cleared entire feed cache");
    }

}