package com.brunopassu.backend.controller;

import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.service.UserRelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserRelationshipController {
    private final UserRelationshipService relationshipService;


    @Autowired
    public UserRelationshipController(UserRelationshipService relationshipService) {
        this.relationshipService = relationshipService;
    }

    // Endpoint para ambiente de desenvolvimento (sem autenticação)
    @PostMapping("/{followerId}/follow/{followingId}")
    public ResponseEntity<Map<String, Object>> toggleFollow(
            @PathVariable String followerId,
            @PathVariable String followingId) {
        try {
            boolean result = relationshipService.toggleFollow(followerId, followingId);

            //Verificação se ele seguiu ele mesmo
            if (!result) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("error", "O usuário não pode seguir ele mesmo!")
                );
            }

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "action", "followed"
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erro ao processar follow/unfollow: " + e.getMessage()));
        }
    }
    /*
        // Endpoint para ambiente de produção (com autenticação)
        @PostMapping("/follow/{followingId}")
        public ResponseEntity<Map<String, Object>> toggleFollowWithAuth(
                @PathVariable String followingId,
                Authentication authentication) {
            try {
                // Extrair token do usuário autenticado
                FirebaseToken token = (FirebaseToken) authentication.getPrincipal();

                boolean result = relationshipService.toggleFollowWithAuth(followingId, token);
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "action", result ? "followed" : "unfollowed"
                ));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Erro ao processar follow/unfollow: " + e.getMessage()));
            }
        }
      /*

        // Endpoint sem autenticação (para desenvolvimento)
        @PostMapping("/{followerId}/follow/{followingId}")
        public ResponseEntity<String> followUser(@PathVariable String followerId, @PathVariable String followingId) {
            try {
                boolean success = relationshipService.followUser(followerId, followingId);
                if (success) {
                    return new ResponseEntity<>("Usuário seguido com sucesso", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Não foi possível seguir o usuário", HttpStatus.BAD_REQUEST);
                }
            } catch (ExecutionException | InterruptedException e) {
                return new ResponseEntity<>("Erro ao seguir usuário: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        // Endpoint sem autenticação (para desenvolvimento)
        @DeleteMapping("/{followerId}/unfollow/{followingId}")
        public ResponseEntity<String> unfollowUser(@PathVariable String followerId, @PathVariable String followingId) {
            try {
                boolean success = relationshipService.unfollowUser(followerId, followingId);
                if (success) {
                    return new ResponseEntity<>("Deixou de seguir o usuário com sucesso", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Não foi possível deixar de seguir o usuário", HttpStatus.BAD_REQUEST);
                }
            } catch (ExecutionException | InterruptedException e) {
                return new ResponseEntity<>("Erro ao deixar de seguir usuário: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


        // Endpoint com autenticação (para produção)
        @PostMapping("/follow/{followingId}")
        public ResponseEntity<String> followUserWithAuth(@PathVariable String followingId) {
            try {
                boolean success = relationshipService.followUserWithAuth(followingId);
                if (success) {
                    return new ResponseEntity<>("Usuário seguido com sucesso", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Não foi possível seguir o usuário", HttpStatus.BAD_REQUEST);
                }
            } catch (ExecutionException | InterruptedException | FirebaseAuthException e) {
                return new ResponseEntity<>("Erro ao seguir usuário: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


        // Endpoint com autenticação (para produção)
        @DeleteMapping("/unfollow/{followingId}")
        public ResponseEntity<String> unfollowUserWithAuth(@PathVariable String followingId) {
            try {
                boolean success = relationshipService.unfollowUserWithAuth(followingId);
                if (success) {
                    return new ResponseEntity<>("Deixou de seguir o usuário com sucesso", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Não foi possível deixar de seguir o usuário", HttpStatus.BAD_REQUEST);
                }
            } catch (ExecutionException | InterruptedException | FirebaseAuthException e) {
                return new ResponseEntity<>("Erro ao deixar de seguir usuário: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    */
    @GetMapping("/{userId}/followers")
    public ResponseEntity<List<User>> getUserFollowers(@PathVariable String userId) {
        try {
            List<User> followers = relationshipService.getUserFollowers(userId);
            return new ResponseEntity<>(followers, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<List<User>> getUserFollowing(@PathVariable String userId) {
        try {
            List<User> following = relationshipService.getUserFollowing(userId);
            return new ResponseEntity<>(following, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
