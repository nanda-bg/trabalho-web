package com.brunopassu.backend.controller;

import com.brunopassu.backend.dto.ReviewDTO;
import com.brunopassu.backend.service.AuthService;
import com.brunopassu.backend.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*") //ESTUDAR COMO MELHORAR ISSO!
@Tag(name = "Reviews", description = "Gerenciamento de reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    private AuthService authService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    @Operation(
            summary = "Criar nova review",
            description = "Adiciona uma nova review para um livro. Atualiza automaticamente a média de avaliação do livro."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Review criada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Review criada",
                                    value = "\"Review criado com ID: abc123def456\""
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
                                            name = "Erro de validação",
                                            value = "\"Erro de validação de review: [Field error in object 'reviewDTO' on field 'rating': rejected value [6]; codes [Max.reviewDTO.rating]]\""
                                    ),
                                    @ExampleObject(
                                            name = "Rating inválido",
                                            value = "\"Erro de validação de review: A nota deve ser menor ou igual a 5!\""
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
                                    value = "\"Erro ao criar review: Connection timeout\""
                            )
                    )
            )
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Dados da review a ser criada",
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    examples = @ExampleObject(
                            name = "Exemplo de review",
                            value = """
            {
                "userUid": "abc123def456",
                "bookId": "def456ghi789",
                "rating": 5,
                "reviewText": "Livro excelente! Recomendo muito.",
                "spoiler": false
            }
            """
                    )
            )
    )
    public ResponseEntity<String> createReview(@Valid @RequestBody ReviewDTO reviewDTO, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Erro de validação de review: " + result.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        try {
            String ReviewID = reviewService.addReview(reviewDTO);
            return new ResponseEntity<>("Review criado com ID: " + ReviewID, HttpStatus.CREATED);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>("Erro ao criar review: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    @Operation(
            summary = "Listar todas as reviews",
            description = "Retorna uma lista com todas as reviews cadastradas no sistema"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de reviews retornada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Lista de reviews",
                                    value = """
                [
                    {
                        "reviewId": "abc123def456",
                        "userUid": "user123",
                        "bookId": "book456",
                        "rating": 5,
                        "reviewText": "Livro excelente!",
                        "date": "2025-06-01T18:41:00Z",
                        "likeCount": 10,
                        "spoiler": false
                    },
                    {
                        "reviewId": "def456ghi789",
                        "userUid": "user789",
                        "bookId": "book123",
                        "rating": 4,
                        "reviewText": "Muito bom, recomendo.",
                        "date": "2025-05-30T15:20:00Z",
                        "likeCount": 5,
                        "spoiler": true
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
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        try {
            return new ResponseEntity<>(reviewService.getAllReviews(), HttpStatus.OK);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/paginated")
    @Operation(
            summary = "Listar reviews com paginação",
            description = "Retorna reviews ordenadas por data com paginação e cache Redis"
    )
    public ResponseEntity<List<ReviewDTO>> getReviewsWithPagination(
            @RequestParam(required = false) String lastReviewId,
            @RequestParam(defaultValue = "20") Integer pageSize) {
        try {
            List<ReviewDTO> reviews = reviewService.getReviewsWithPagination(lastReviewId, pageSize);
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{reviewId}")
    @Operation(
            summary = "Buscar review por ID",
            description = "Retorna os dados de uma review específica baseada no ID fornecido"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Review encontrada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Review encontrada",
                                    value = """
                {
                    "reviewId": "abc123def456",
                    "userUid": "user123",
                    "bookId": "book456",
                    "rating": 5,
                    "reviewText": "Livro excelente! A narrativa é envolvente e os personagens são bem desenvolvidos.",
                    "date": "2025-06-01T18:41:00Z",
                    "likeCount": 15,
                    "spoiler": false
                }
                """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Review não encontrada",
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
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable String reviewId) {
        try {
            ReviewDTO review = reviewService.getReviewById(reviewId);
            return review != null ?
                    new ResponseEntity<>(review, HttpStatus.OK) :
                    new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/book/{bookId}")
    @Operation(
            summary = "Buscar reviews por livro",
            description = "Retorna todas as reviews de um livro específico"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Reviews do livro retornadas com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Reviews do livro",
                                    value = """
                [
                    {
                        "reviewId": "review1",
                        "userUid": "user123",
                        "bookId": "book456",
                        "rating": 5,
                        "reviewText": "Obra-prima da literatura!",
                        "date": "2025-06-01T18:41:00Z",
                        "likeCount": 20,
                        "spoiler": false
                    },
                    {
                        "reviewId": "review2",
                        "userUid": "user789",
                        "bookId": "book456",
                        "rating": 4,
                        "reviewText": "Muito bom, mas o final poderia ser melhor.",
                        "date": "2025-05-28T10:15:00Z",
                        "likeCount": 8,
                        "spoiler": true
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
    public ResponseEntity<List<ReviewDTO>> getReviewsByBookId(@PathVariable String bookId) {
        try {
            List<ReviewDTO> reviews = reviewService.getReviewsByBookId(bookId);
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{userId}")
    @Operation(
            summary = "Buscar reviews por usuário",
            description = "Retorna todas as reviews de um usuário específico"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Reviews do usuário retornadas com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Reviews do usuário",
                                    value = """
                [
                    {
                        "reviewId": "review1",
                        "userUid": "user123",
                        "bookId": "book456",
                        "rating": 5,
                        "reviewText": "Adorei este livro!",
                        "date": "2025-06-01T18:41:00Z",
                        "likeCount": 12,
                        "spoiler": false
                    },
                    {
                        "reviewId": "review2",
                        "userUid": "user123",
                        "bookId": "book789",
                        "rating": 3,
                        "reviewText": "Livro mediano, esperava mais.",
                        "date": "2025-05-25T14:30:00Z",
                        "likeCount": 3,
                        "spoiler": false
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
    public ResponseEntity<List<ReviewDTO>> getReviewsByUserId(@PathVariable String userId) {
        try {
            List<ReviewDTO> reviews = reviewService.getReviewsByUserId(userId);
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/{reviewId}")
    @Operation(
            summary = "Atualizar review",
            description = "Atualiza os dados de uma review existente. Recalcula automaticamente a média de avaliação do livro."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Review atualizada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Review atualizada",
                                    value = "\"Review atualizada com sucesso\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Falha ao atualizar review",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Falha na atualização",
                                    value = "\"Falha ao atualizar review\""
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
                                    value = "\"Erro ao atualizar review: Connection timeout\""
                            )
                    )
            )
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Dados atualizados da review",
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    examples = @ExampleObject(
                            name = "Exemplo de atualização",
                            value = """
            {
                "userUid": "user123",
                "bookId": "book456",
                "rating": 4,
                "reviewText": "Após uma segunda leitura, mudei minha opinião. Ainda é bom, mas não excepcional.",
                "spoiler": false
            }
            """
                    )
            )
    )
    public ResponseEntity<String> updateReview(@PathVariable String reviewId, @RequestBody ReviewDTO reviewDTO) {
        try {
            reviewDTO.setReviewId(reviewId);
            boolean updated = reviewService.updateReview(reviewDTO);
            return updated ?
                    new ResponseEntity<>("Review atualizada com sucesso", HttpStatus.OK) :
                    new ResponseEntity<>("Falha ao atualizar review", HttpStatus.BAD_REQUEST);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>("Erro ao atualizar review: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/{reviewId}/like")
    @Operation(
            summary = "Curtir/descurtir review",
            description = "Adiciona ou remove um like de uma review. Requer autenticação via token Bearer. Se o usuário já curtiu a review, o like é removido; caso contrário, é adicionado."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Like processado com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Like adicionado",
                                            value = """
                    {
                        "success": true,
                        "action": "liked"
                    }
                    """
                                    ),
                                    @ExampleObject(
                                            name = "Like removido",
                                            value = """
                    {
                        "success": true,
                        "action": "unliked"
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
                                    name = "Erro ao processar like",
                                    value = """
                {
                    "error": "Erro ao processar like: Token inválido"
                }
                """
                            )
                    )
            )
    })
    public ResponseEntity<?> toggleLike(@PathVariable String reviewId, @Parameter(hidden = true) @RequestHeader ("Authorization") String token) {
        try {
            // Extrair ID do usuário autenticado
            String userId = authService.getUserIdFromToken(token);
            boolean result = reviewService.toggleLike(userId, reviewId);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "action", result ? "liked" : "unliked"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erro ao processar like: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{reviewId}")
    @Operation(
            summary = "Deletar review",
            description = "Remove uma review do sistema. Recalcula automaticamente a média de avaliação do livro."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Review deletada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Review deletada",
                                    value = "\"Review deletada com sucesso\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Falha ao deletar review",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Falha na exclusão",
                                    value = "\"Falha ao deletar review\""
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
                                    value = "\"Erro ao deletar review: Connection timeout\""
                            )
                    )
            )
    })
    public ResponseEntity<String> deleteReview(@PathVariable String reviewId) {
        try {
            boolean deleted = reviewService.deleteReview(reviewId);
            return deleted ?
                    new ResponseEntity<>("Review deletada com sucesso", HttpStatus.OK) :
                    new ResponseEntity<>("Falha ao deletar review", HttpStatus.BAD_REQUEST);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>("Erro ao deletar review: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
