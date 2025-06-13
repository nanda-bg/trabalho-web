package com.brunopassu.backend.controller;

import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.service.UserRelationshipService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "User Relationships", description = "Operações relacionadas aos relacionamentos entre usuários (seguir/deixar de seguir)")
public class UserRelationshipController {
    private final UserRelationshipService relationshipService;

    @Autowired
    public UserRelationshipController(UserRelationshipService relationshipService) {
        this.relationshipService = relationshipService;
    }

    @PostMapping("/follow/{followingId}")
    @Operation(
            summary = "Seguir/deixar de seguir usuário",
            description = "Alterna entre seguir e deixar de seguir um usuário. Usa autenticação via token Bearer para identificar o usuário que está fazendo a ação. Atualiza automaticamente os contadores de seguidores e seguindo."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Operação realizada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Usuário seguido",
                                            value = """
                    {
                        "success": true,
                        "action": "followed"
                    }
                    """
                                    ),
                                    @ExampleObject(
                                            name = "Deixou de seguir",
                                            value = """
                    {
                        "success": true,
                        "action": "unfollowed"
                    }
                    """
                                    )
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno do servidor",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Erro interno",
                                    value = """
                {
                    "error": "Erro ao processar follow/unfollow: Token inválido"
                }
                """
                            )
                    )
            )
    })
    @Parameter(
            name = "followingId",
            description = "ID do usuário que será seguido/deixará de ser seguido",
            example = "def456ghi789",
            required = true
    )
    @Parameter(
            name = "Authorization",
            description = "Token Bearer do usuário autenticado",
            example = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2NzAyN...",
            required = false,
            in = ParameterIn.HEADER
    )
    public ResponseEntity<Map<String, Object>> toggleFollowWithAuth(@PathVariable String followingId, @RequestHeader(value = "Authorization", required = false) String token) {
        try {
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

    @GetMapping("/{userId}/followers")
    @Operation(
            summary = "Listar seguidores do usuário",
            description = "Retorna uma lista com todos os usuários que seguem o usuário especificado"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de seguidores retornada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Lista de seguidores",
                                    value = """
                [
                    {
                        "uid": "follower1",
                        "email": "seguidor1@gmail.com",
                        "name": "João Silva",
                        "username": "joao123",
                        "profilePicture": "https://example.com/joao.jpg",
                        "bio": "Amante de livros",
                        "followers": 50,
                        "following": 30
                    },
                    {
                        "uid": "follower2",
                        "email": "seguidor2@gmail.com",
                        "name": "Maria Santos",
                        "username": "maria456",
                        "profilePicture": null,
                        "bio": "Leitora voraz",
                        "followers": 75,
                        "following": 45
                    }
                ]
                """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno do servidor",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = "null"
                            )
                    )
            )
    })
    @Parameter(
            name = "userId",
            description = "ID do usuário para listar seus seguidores",
            example = "abc123def456",
            required = true
    )
    public ResponseEntity<List<User>> getUserFollowers(@PathVariable String userId) {
        try {
            List<User> followers = relationshipService.getUserFollowers(userId);
            return new ResponseEntity<>(followers, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{userId}/following")
    @Operation(
            summary = "Listar usuários seguidos",
            description = "Retorna uma lista com todos os usuários que o usuário especificado está seguindo"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de usuários seguidos retornada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Lista de seguindo",
                                    value = """
                [
                    {
                        "uid": "following1",
                        "email": "seguido1@gmail.com",
                        "name": "Carlos Oliveira",
                        "username": "carlos789",
                        "profilePicture": "https://example.com/carlos.jpg",
                        "bio": "Escritor e crítico literário",
                        "followers": 120,
                        "following": 80
                    },
                    {
                        "uid": "following2",
                        "email": "seguido2@gmail.com",
                        "name": "Ana Costa",
                        "username": "ana321",
                        "profilePicture": "https://example.com/ana.jpg",
                        "bio": "Professora de literatura",
                        "followers": 200,
                        "following": 150
                    }
                ]
                """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno do servidor",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = "null"
                            )
                    )
            )
    })
    @Parameter(
            name = "userId",
            description = "ID do usuário para listar quem está seguindo",
            example = "abc123def456",
            required = true
    )
    public ResponseEntity<List<User>> getUserFollowing(@PathVariable String userId) {
        try {
            List<User> following = relationshipService.getUserFollowing(userId);
            return new ResponseEntity<>(following, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
