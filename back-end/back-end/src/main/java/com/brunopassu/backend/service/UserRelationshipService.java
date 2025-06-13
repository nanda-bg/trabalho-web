package com.brunopassu.backend.service;

import com.brunopassu.backend.cacheManager.RedisFeedCacheManager;
import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.entity.UserRelationship;
import com.brunopassu.backend.repository.UserRelationshipRepository;
import com.brunopassu.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserRelationshipService {

    private final UserRelationshipRepository relationshipRepository;
    private final UserRepository userRepository;

    @Autowired
    private RedisFeedCacheManager feedCacheManager;

    @Autowired
    private AuthService authService;

    @Autowired
    public UserRelationshipService(UserRelationshipRepository relationshipRepository, UserRepository userRepository) {
        this.relationshipRepository = relationshipRepository;
        this.userRepository = userRepository;
    }

    // Método para ambiente de produção (com autenticação)
    public boolean toggleFollowWithAuth(String followingId, String token)
            throws ExecutionException, InterruptedException, IOException {

        if (token == null || token.isEmpty()) {
            return false; // Token inválido
        }

        String followerId = authService.getUserIdFromToken(token);

        // Verificar se o usuário não está tentando seguir a si mesmo
        if (followerId.equals(followingId)) {
            return false;
        }

        boolean sucess = relationshipRepository.toggleFollow(followerId, followingId);

        if (sucess) {
            feedCacheManager.invalidateUserFeedCache(followerId);
            System.out.println("✅ [FOLLOW] Successfully followed and invalidated cache");
        }
        else {
            feedCacheManager.invalidateUserFeedCache(followerId);
            System.out.println("✅ [UNFOLLOW] Successfully unfollowed and invalidated cache");
        }
        return sucess;
    }

    public List<User> getUserFollowers(String userId) throws ExecutionException, InterruptedException {
        List<UserRelationship> relationships = relationshipRepository.getFollowers(userId);
        List<User> followers = new ArrayList<>();

        for (UserRelationship relationship : relationships) {
            User follower = userRepository.getUserById(relationship.getFollowerId());
            if (follower != null) {
                followers.add(follower);
            }
        }

        return followers;
    }

    public List<User> getUserFollowing(String userId) throws ExecutionException, InterruptedException {
        List<UserRelationship> relationships = relationshipRepository.getFollowing(userId);
        List<User> following = new ArrayList<>();

        for (UserRelationship relationship : relationships) {
            User followed = userRepository.getUserById(relationship.getFollowingId());
            if (followed != null) {
                following.add(followed);
            }
        }

        return following;
    }
}
