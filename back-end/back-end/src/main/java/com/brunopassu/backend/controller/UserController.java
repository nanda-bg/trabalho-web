package com.brunopassu.backend.controller;

import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.exception.UserAlreadyExistsException;
import com.brunopassu.backend.exception.UserEmailmmutableFieldException;
import com.brunopassu.backend.exception.UserUsernameImmutableFieldException;
import com.brunopassu.backend.service.UserService;
import com.google.firebase.auth.FirebaseAuthException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*") //ESTUDAR COMO MELHORAR ISSO!
@Tag(name = "Usuários", description = "Gerenciamento de usuários")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @Operation(
            summary = "Listar todos os usuários",
            description = "Retorna uma lista com todos os usuários cadastrados no sistema"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de usuários retornada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Lista de usuários",
                                    value = """
                [
                    {
                        "uid": "abc123def456",
                        "email": "usuario1@gmail.com",
                        "name": "Usuario Um",
                        "username": "usuario1",
                        "profilePicture": "https://example.com/foto1.jpg",
                        "bio": "Biografia do usuário 1",
                        "followers": 10,
                        "following": 5
                    },
                    {
                        "uid": "def456ghi789",
                        "email": "usuario2@gmail.com",
                        "name": "Usuario Dois",
                        "username": "usuario2",
                        "profilePicture": null,
                        "bio": "Biografia do usuário 2",
                        "followers": 20,
                        "following": 15
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
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/paginated")
    @Operation(
            summary = "Listar usuários com paginação",
            description = "Retorna usuários ordenados por username com paginação e cache Redis"
    )
    public ResponseEntity<List<User>> getUsersWithPagination(
            @RequestParam(required = false) String lastUserId,
            @RequestParam(defaultValue = "20") Integer pageSize) {
        try {
            List<User> users = userService.getUsersWithPagination(lastUserId, pageSize);
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{username}")
    @Operation(
            summary = "Buscar usuário por username",
            description = "Retorna os dados de um usuário específico baseado no username fornecido"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Usuário encontrado com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Usuário encontrado",
                                    value = """
                {
                    "uid": "abc123def456",
                    "email": "usuario@gmail.com",
                    "name": "Nome Usuario",
                    "username": "usuario123",
                    "profilePicture": "https://example.com/foto.jpg",
                    "bio": "Minha biografia",
                    "followers": 50,
                    "following": 30
                }
                """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuário não encontrado",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = "null"
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
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        try {
            User user = userService.getUserByUsername(username);
            if (user != null) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/id/{userId}")
    @Operation(
            summary = "Buscar usuário por ID",
            description = "Retorna os dados de um usuário específico baseado no UID fornecido"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Usuário encontrado com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Usuário encontrado",
                                    value = """
                {
                    "uid": "abc123def456",
                    "email": "usuario@gmail.com",
                    "name": "Nome Usuario",
                    "username": "usuario123",
                    "profilePicture": "https://example.com/foto.jpg",
                    "bio": "Minha biografia",
                    "followers": 50,
                    "following": 30,
                    "userType": "PADRAO"
                }
                """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuário não encontrado",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = "null"
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
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        try {
            User user = userService.getUserById(userId);
            if (user != null) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/id/{id}")
    @Operation(
            summary = "Atualizar dados do usuário",
            description = "Atualiza os dados de um usuário existente. Email e username são validados para evitar duplicatas."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Usuário atualizado com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Usuário atualizado",
                                    value = "\"Usuário atualizado com sucesso\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuário não encontrado",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Usuário não encontrado",
                                    value = "\"Usuário não encontrado\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "Conflito - dados já existem",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Username já existe",
                                            value = "\"Username já está em uso por outro usuário!\""
                                    ),
                                    @ExampleObject(
                                            name = "Email já existe",
                                            value = "\"Email já está em uso por outro usuário!\""
                                    )
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno do servidor",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Erro Firebase Auth",
                                            value = "\"Erro ao atualizar usuário no Authentication: Token has expired\""
                                    ),
                                    @ExampleObject(
                                            name = "Erro geral",
                                            value = "\"Erro ao atualizar usuário: Connection timeout\""
                                    )
                            }
                    )
            )
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Dados para atualização do usuário",
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    examples = @ExampleObject(
                            name = "Exemplo de cadastro",
                            value = """
            {
               "email": "testeput@gmail.com",
               "name": "testeput",
               "username": "testeput",
               "profilePicture": "testeput",
               "bio": "testeput"
            }
            """
                    )
            )
    )
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody User user) {
        try {
            // Garante que o ID no path seja o mesmo usado para atualização
            user.setUid(id);
            boolean updated = userService.updateUser(user);

            if (updated) {
                return new ResponseEntity<>("Usuário atualizado com sucesso", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Usuário não encontrado", HttpStatus.NOT_FOUND);
            }
        } catch (UserAlreadyExistsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (UserUsernameImmutableFieldException | UserEmailmmutableFieldException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (FirebaseAuthException e) {
            return new ResponseEntity<>("Erro ao atualizar usuário no Authentication: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>("Erro ao atualizar usuário: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/id/{id}")
    @Operation(
            summary = "Deletar usuário",
            description = "Remove um usuário do sistema, incluindo dados do Firestore e Firebase Authentication"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Usuário deletado com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Usuário deletado",
                                    value = "\"Usuário deletado com sucesso do Firestore e Authentication\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuário não encontrado",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Usuário não encontrado",
                                    value = "\"Usuário não encontrado\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno do servidor",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Erro Firebase Auth",
                                            value = "\"Erro ao deletar usuário do Authentication: User not found\""
                                    ),
                                    @ExampleObject(
                                            name = "Erro geral",
                                            value = "\"Erro ao deletar usuário: Connection timeout\""
                                    )
                            }
                    )
            )
    })
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        try {
            boolean deleted = userService.deleteUser(id);
            if (deleted) {
                return new ResponseEntity<>("Usuário deletado com sucesso do Firestore e Authentication", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Usuário não encontrado", HttpStatus.NOT_FOUND);
            }
        } catch (FirebaseAuthException e) {
            return new ResponseEntity<>("Erro ao deletar usuário do Authentication: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>("Erro ao deletar usuário: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
