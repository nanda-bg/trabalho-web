package com.brunopassu.backend.controller;

import com.brunopassu.backend.dto.UserBookListDTO;
import com.brunopassu.backend.entity.enums.SortOrder;
import com.brunopassu.backend.service.BookService;
import com.brunopassu.backend.service.UserBookListService;
import com.brunopassu.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/users/books")
@Tag(name = "Listas de Livros para o Usuário", description = "Gerenciamento de listas de livros dos usuários")
public class UserBookListController {

    @Autowired
    private UserBookListService userBookListService;

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @GetMapping("/favorites")
    @Operation(
            summary = "Listar livros favoritos com dados completos",
            description = "Retorna a lista de livros favoritos do usuário autenticado com dados completos do usuário, livro e metadados da lista, incluindo suporte a paginação e ordenação"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de favoritos retornada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserBookListDTO.class),
                            examples = @ExampleObject(
                                    name = "Lista de favoritos completa",
                                    value = """
                    [
                      {
                        "userBookListId": "qIYHqtp7FG7UDejLb4KJ",
                        "userId": "2jbzAtVP3eQJsEIYVICa9jb79sq1",
                        "bookId": "3LrcuZa9kG4GmPm56Oql",
                        "listType": "FAVORITES",
                        "addedAt": "2025-06-19T20:15:30",
                        "user": {
                          "userId": "2jbzAtVP3eQJsEIYVICa9jb79sq1",
                          "name": "Bruno Passu",
                          "email": "bruno@example.com",
                          "profilePictureUrl": "https://example.com/profile.jpg"
                        },
                        "book": {
                          "bookId": "3LrcuZa9kG4GmPm56Oql",
                          "title": "O homem duplicado",
                          "description": "Romance de José Saramago sobre identidade e duplicação",
                          "authors": ["José Saramago"],
                          "coverUrl": "https://example.com/cover.jpg",
                          "publicationYear": 2008,
                          "genre": "Ficção",
                          "averageRating": 4.2,
                          "ratingsCount": 156,
                          "pagesCount": 292
                        }
                      }
                    ]
                    """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token de autorização inválido ou ausente",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "null")
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno do servidor",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "null")
                    )
            )
    })
    public ResponseEntity<List<UserBookListDTO>> getUserFavorites(
            @RequestParam(required = false) String lastItemId,
            @RequestParam(defaultValue = "20") Integer pageSize,
            @RequestParam(defaultValue = "NEWEST_FIRST") SortOrder sortOrder,
            @RequestHeader HttpHeaders headers) {
        try {
            String userId = extractUserIdFromToken(headers);
            List<UserBookListDTO> favorites = userBookListService.getUserFavorites(userId, lastItemId, pageSize, sortOrder);
            return new ResponseEntity<>(favorites, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/future-reads")
    @Operation(
            summary = "Listar livros para leitura futura com dados completos",
            description = "Retorna a lista de livros marcados para leitura futura do usuário autenticado com dados completos do usuário, livro e metadados da lista"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de leituras futuras retornada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserBookListDTO.class),
                            examples = @ExampleObject(
                                    name = "Lista de leituras futuras completa",
                                    value = """
                    [
                      {
                        "userBookListId": "mN8pQr2TvX9YzA5bC7dE",
                        "userId": "2jbzAtVP3eQJsEIYVICa9jb79sq1",
                        "bookId": "def456ghi789",
                        "listType": "FUTURE_READS",
                        "addedAt": "2025-06-18T14:30:15",
                        "user": {
                          "userId": "2jbzAtVP3eQJsEIYVICa9jb79sq1",
                          "name": "Bruno Passu",
                          "email": "bruno@example.com",
                          "profilePictureUrl": "https://example.com/profile.jpg"
                        },
                        "book": {
                          "bookId": "def456ghi789",
                          "title": "O Cortiço",
                          "description": "Romance naturalista brasileiro de Aluísio Azevedo",
                          "authors": ["Aluísio Azevedo"],
                          "coverUrl": "https://example.com/cortico.jpg",
                          "publicationYear": 1890,
                          "genre": "Romance",
                          "averageRating": 4.2,
                          "ratingsCount": 89,
                          "pagesCount": 312
                        }
                      }
                    ]
                    """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token de autorização inválido ou ausente",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "null")
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno do servidor",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "null")
                    )
            )
    })
    public ResponseEntity<List<UserBookListDTO>> getUserFutureReads(
            @RequestParam(required = false) String lastItemId,
            @RequestParam(defaultValue = "20") Integer pageSize,
            @RequestParam(defaultValue = "NEWEST_FIRST") SortOrder sortOrder,
            @RequestHeader HttpHeaders headers) {

        try {
            String userId = extractUserIdFromToken(headers);
            List<UserBookListDTO> futureReads = userBookListService.getUserFutureReads(userId, lastItemId, pageSize, sortOrder);
            return new ResponseEntity<>(futureReads, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        } catch (ExecutionException | InterruptedException e) {
            System.err.println("Error in getUserFutureReads: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/favorites/{bookId}")
    @Operation(
            summary = "Adicionar livro aos favoritos",
            description = "Adiciona um livro específico à lista de favoritos do usuário autenticado"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Livro adicionado aos favoritos com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Livro adicionado com sucesso",
                                    value = "\"Livro adicionado aos favoritos: qIYHqtp7FG7UDejLb4KJ\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Dados inválidos fornecidos",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Livro não encontrado",
                                            value = "\"Book not found\""
                                    ),
                                    @ExampleObject(
                                            name = "Livro já nos favoritos",
                                            value = "\"Book already in FAVORITES list\""
                                    )
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token de autorização inválido ou ausente",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Token inválido",
                                    value = "\"Token inválido\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno do servidor",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Erro interno",
                                    value = "\"Erro interno\""
                            )
                    )
            )
    })
    public ResponseEntity<String> addBookToFavorites(
            @PathVariable String bookId,
            @RequestHeader HttpHeaders headers) {
        try {
            String userId = extractUserIdFromToken(headers);
            String listItemId = userBookListService.addBookToFavorites(userId, bookId);
            return new ResponseEntity<>("Livro adicionado aos favoritos: " + listItemId, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            if (e.getMessage().contains("Authorization")) {
                return new ResponseEntity<>("Token inválido", HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>("Erro interno", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/future-reads/{bookId}")
    @Operation(
            summary = "Adicionar livro às leituras futuras",
            description = "Adiciona um livro específico à lista de leituras futuras do usuário autenticado. O usuário é extraído automaticamente do token JWT."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Livro adicionado às leituras futuras com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Livro adicionado com sucesso",
                                    value = "\"Livro adicionado às leituras futuras: mN8pQr2TvX9YzA5bC7dE\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Dados inválidos fornecidos",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Livro não encontrado",
                                            value = "\"Book not found\""
                                    ),
                                    @ExampleObject(
                                            name = "Livro já nas leituras futuras",
                                            value = "\"Book already in FUTURE_READS list\""
                                    )
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token de autorização inválido ou ausente",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Token inválido",
                                    value = "\"Token inválido\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno do servidor",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Erro interno",
                                    value = "\"Erro interno\""
                            )
                    )
            )
    })
    public ResponseEntity<String> addBookToFutureReads(
            @PathVariable String bookId,
            @RequestHeader HttpHeaders headers) {
        try {
            String userId = extractUserIdFromToken(headers);
            String listItemId = userBookListService.addBookToFutureReads(userId, bookId);
            return new ResponseEntity<>("Livro adicionado às leituras futuras: " + listItemId, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            if (e.getMessage().contains("Authorization")) {
                return new ResponseEntity<>("Token inválido", HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>("Erro interno", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/favorites/{bookId}")
    @Operation(
            summary = "Remover livro dos favoritos",
            description = "Remove um livro específico da lista de favoritos do usuário autenticado"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Livro removido dos favoritos com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Livro removido",
                                    value = "\"Livro removido dos favoritos\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Livro não encontrado nos favoritos",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Livro não encontrado",
                                    value = "\"Livro não encontrado nos favoritos\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token de autorização inválido ou ausente",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Token inválido",
                                    value = "\"Token inválido\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno do servidor",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Erro interno",
                                    value = "\"Erro interno\""
                            )
                    )
            )
    })
    public ResponseEntity<String> removeBookFromFavorites(
            @PathVariable String bookId,
            @RequestHeader HttpHeaders headers) {
        try {
            String userId = extractUserIdFromToken(headers);
            boolean removed = userBookListService.removeBookFromFavorites(userId, bookId);
            if (removed) {
                return new ResponseEntity<>("Livro removido dos favoritos", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Livro não encontrado nos favoritos", HttpStatus.NOT_FOUND);
            }
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Token inválido", HttpStatus.UNAUTHORIZED);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>("Erro interno", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/future-reads/{bookId}")
    @Operation(
            summary = "Remover livro das leituras futuras",
            description = "Remove um livro específico da lista de leituras futuras do usuário autenticado"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Livro removido das leituras futuras com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Livro removido",
                                    value = "\"Livro removido das leituras futuras\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Livro não encontrado nas leituras futuras",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Livro não encontrado",
                                    value = "\"Livro não encontrado nas leituras futuras\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token de autorização inválido ou ausente",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Token inválido",
                                    value = "\"Token inválido\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno do servidor",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Erro interno",
                                    value = "\"Erro interno\""
                            )
                    )
            )
    })
    public ResponseEntity<String> removeBookFromFutureReads(
            @PathVariable String bookId,
            @RequestHeader HttpHeaders headers) {
        try {
            String userId = extractUserIdFromToken(headers);
            boolean removed = userBookListService.removeBookFromFutureReads(userId, bookId);
            if (removed) {
                return new ResponseEntity<>("Livro removido das leituras futuras", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Livro não encontrado nas leituras futuras", HttpStatus.NOT_FOUND);
            }
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Token inválido", HttpStatus.UNAUTHORIZED);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>("Erro interno", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/favorites/{bookId}/exists")
    @Operation(
            summary = "Verificar se livro está nos favoritos",
            description = "Verifica se um livro específico já está na lista de favoritos do usuário autenticado"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Verificação realizada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Livro nos favoritos",
                                            value = """
                    {
                        "bookId": "abc123def456",
                        "inFavorites": true,
                        "message": "Livro está nos favoritos"
                    }
                    """
                                    ),
                                    @ExampleObject(
                                            name = "Livro não está nos favoritos",
                                            value = """
                    {
                        "bookId": "abc123def456",
                        "inFavorites": false,
                        "message": "Livro não está nos favoritos"
                    }
                    """
                                    )
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token de autorização inválido ou ausente",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Token inválido",
                                    value = "\"Token inválido\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Livro não encontrado no sistema",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Livro não encontrado",
                                    value = "\"Livro não encontrado\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno do servidor",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Erro interno",
                                    value = "\"Erro interno do servidor\""
                            )
                    )
            )
    })
    public ResponseEntity<Map<String, Object>> isBookInFavorites(
            @PathVariable String bookId,
            @RequestHeader HttpHeaders headers) {
        try {
            String userId = extractUserIdFromToken(headers);

            // Verificar se o livro existe
            if (bookService.getBookById(bookId) == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }

            boolean inFavorites = userBookListService.isBookInFavorites(userId, bookId);

            Map<String, Object> response = Map.of(
                    "bookId", bookId,
                    "inFavorites", inFavorites,
                    "message", inFavorites ? "Livro está nos favoritos" : "Livro não está nos favoritos"
            );

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/future-reads/{bookId}/exists")
    @Operation(
            summary = "Verificar se livro está nas leituras futuras",
            description = "Verifica se um livro específico já está na lista de leituras futuras do usuário autenticado"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Verificação realizada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Livro nas leituras futuras",
                                            value = """
                    {
                        "bookId": "abc123def456",
                        "inFutureReads": true,
                        "message": "Livro está nas leituras futuras"
                    }
                    """
                                    ),
                                    @ExampleObject(
                                            name = "Livro não está nas leituras futuras",
                                            value = """
                    {
                        "bookId": "abc123def456",
                        "inFutureReads": false,
                        "message": "Livro não está nas leituras futuras"
                    }
                    """
                                    )
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token de autorização inválido ou ausente",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Token inválido",
                                    value = "\"Token inválido\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Livro não encontrado no sistema",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Livro não encontrado",
                                    value = "\"Livro não encontrado\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno do servidor",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Erro interno",
                                    value = "\"Erro interno do servidor\""
                            )
                    )
            )
    })
    public ResponseEntity<Map<String, Object>> isBookInFutureReads(
            @PathVariable String bookId,
            @RequestHeader HttpHeaders headers) {
        try {
            String userId = extractUserIdFromToken(headers);

            // Verificar se o livro existe
            if (bookService.getBookById(bookId) == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }

            boolean inFutureReads = userBookListService.isBookInFutureReads(userId, bookId);

            Map<String, Object> response = Map.of(
                    "bookId", bookId,
                    "inFutureReads", inFutureReads,
                    "message", inFutureReads ? "Livro está nas leituras futuras" : "Livro não está nas leituras futuras"
            );

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //extrair userId do token
    private String extractUserIdFromToken(HttpHeaders headers) {
        List<String> authHeaders = headers.get("authorization");
        if (authHeaders == null || authHeaders.isEmpty()) {
            throw new IllegalArgumentException("Authorization header missing");
        }

        String token = authHeaders.get(0);
        return userService.getUserIdFromToken(token);
    }
}

