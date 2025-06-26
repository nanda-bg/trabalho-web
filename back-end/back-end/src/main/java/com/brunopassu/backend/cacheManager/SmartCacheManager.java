package com.brunopassu.backend.cacheManager;

import com.brunopassu.backend.dto.ReviewDTO;
import com.brunopassu.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class SmartCacheManager {

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public void updateUserInAllCaches(User updatedUser) {
        // Atualiza cache principal
        Cache userDetailsCache = cacheManager.getCache("user-details");
        if (userDetailsCache != null) {
            userDetailsCache.put(updatedUser.getUid(), updatedUser);
        }

        // Atualiza cache por username
        Cache userByUsernameCache = cacheManager.getCache("user-by-username");
        if (userByUsernameCache != null) {
            userByUsernameCache.put(updatedUser.getUsername(), updatedUser);
        }

        // Invalida caches de paginação (complexos demais para update)
        invalidatePaginationCaches("users-paginated");
    }

    public void updateReviewInAllCaches(ReviewDTO updatedReview) {
        // Atualiza cache principal
        Cache reviewDetailsCache = cacheManager.getCache("review-details");
        if (reviewDetailsCache != null) {
            reviewDetailsCache.put(updatedReview.getReviewId(), updatedReview);
        }

        // Invalida caches relacionais (muito complexos para update)
        String[] relatedCaches = {"reviews-by-book", "reviews-by-user", "reviews-feed", "reviews-paginated"};
        for (String cacheName : relatedCaches) {
            Cache cache = cacheManager.getCache(cacheName);
            if (cache != null) {
                cache.clear();
            }
        }
    }

    private void invalidatePaginationCaches(String cachePrefix) {
        Set<String> keys = redisTemplate.keys("*" + cachePrefix + "*");
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }
}

