package com.brunopassu.backend.service;

import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.entity.UserRelationship;
import com.brunopassu.backend.repository.UserRelationshipRepository;
import com.brunopassu.backend.repository.UserRepository;
import com.google.firebase.auth.FirebaseToken;
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
    public UserRelationshipService(UserRelationshipRepository relationshipRepository, UserRepository userRepository) {
        this.relationshipRepository = relationshipRepository;
        this.userRepository = userRepository;
    }

    // Método para ambiente de desenvolvimento (sem autenticação)
    public boolean toggleFollow(String followerId, String followingId)
            throws ExecutionException, InterruptedException, IOException {
        // Verificar se os IDs são válidos e diferentes
        if (followerId == null || followingId == null || followerId.equals(followingId)) {
            return false;
        }

        return relationshipRepository.toggleFollow(followerId, followingId);
    }

    // Método para ambiente de produção (com autenticação)
    public boolean toggleFollowWithAuth(String followingId, FirebaseToken token)
            throws ExecutionException, InterruptedException, IOException {
        if (token == null || followingId == null) {
            return false;
        }

        String followerId = token.getUid();

        // Verificar se o usuário não está tentando seguir a si mesmo
        if (followerId.equals(followingId)) {
            return false;
        }

        return relationshipRepository.toggleFollow(followerId, followingId);
    }

    /*
    public boolean followUser(String followerId, String followingId) throws ExecutionException, InterruptedException {
        // Verificar se os usuários existem
        User follower = userRepository.getUserById(followerId);
        User following = userRepository.getUserById(followingId);

        if (follower == null || following == null) {
            return false;
        }

        // Verificar se já existe o relacionamento
        if (relationshipRepository.checkRelationshipExists(followerId, followingId)) {
            return false; // Já está seguindo
        }

        // Criar o relacionamento
        UserRelationship relationship = new UserRelationship(followerId, followingId);
        relationshipRepository.saveRelationship(relationship);

        // Atualizar contadores usando FieldValue.increment para operação atômica
        Firestore firestore = FirestoreClient.getFirestore();

        // Incrementar following do seguidor
        Map<String, Object> followerUpdate = new HashMap<>();
        followerUpdate.put("following", FieldValue.increment(1));
        firestore.collection("users").document(followerId).update(followerUpdate).get();

        // Incrementar followers do seguido
        Map<String, Object> followingUpdate = new HashMap<>();
        followingUpdate.put("followers", FieldValue.increment(1));
        firestore.collection("users").document(followingId).update(followingUpdate).get();

        return true;
    }

    public boolean unfollowUser(String followerId, String followingId) throws ExecutionException, InterruptedException {
        // Verificar se os usuários existem
        User follower = userRepository.getUserById(followerId);
        User following = userRepository.getUserById(followingId);

        if (follower == null || following == null) {
            return false;
        }

        // Verificar se existe o relacionamento
        if (!relationshipRepository.checkRelationshipExists(followerId, followingId)) {
            return false; // Não está seguindo
        }

        // Remover o relacionamento
        relationshipRepository.deleteRelationship(followerId, followingId);

        // Atualizar contadores usando FieldValue.increment para operação atômica
        Firestore firestore = FirestoreClient.getFirestore();

        // Decrementar following do seguidor
        Map<String, Object> followerUpdate = new HashMap<>();
        followerUpdate.put("following", FieldValue.increment(-1));
        firestore.collection("users").document(followerId).update(followerUpdate).get();

        // Decrementar followers do seguido
        Map<String, Object> followingUpdate = new HashMap<>();
        followingUpdate.put("followers", FieldValue.increment(-1));
        firestore.collection("users").document(followingId).update(followingUpdate).get();

        return true;
    }
    */
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

    /*
    // Versão com autenticação
    public boolean followUserWithAuth(String followingId) throws ExecutionException, InterruptedException, FirebaseAuthException {
        // Obter o usuário autenticado
        FirebaseAuth auth = FirebaseAuth.getInstance();
        String followerId = auth.getToken(true).getUid();

        return followUser(followerId, followingId);
    }


    // Versão com autenticação
    public boolean unfollowUserWithAuth(String followingId) throws ExecutionException, InterruptedException, FirebaseAuthException {
        // Obter o usuário autenticado
        FirebaseAuth auth = FirebaseAuth.getInstance();
        String followerId = auth.getToken(true).getUid();

        return unfollowUser(followerId, followingId);
    }
    */
}
