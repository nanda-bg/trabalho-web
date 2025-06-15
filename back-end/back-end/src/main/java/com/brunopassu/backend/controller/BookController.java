package com.brunopassu.backend.controller;

import com.brunopassu.backend.entity.Book;
import com.brunopassu.backend.exception.BookTitleImmutableFieldException;
import com.brunopassu.backend.service.BookService;
import com.brunopassu.backend.service.MigrationStatus;
import com.brunopassu.backend.service.UnifiedMigrationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*") //ESTUDAR COMO MELHORAR ISSO!
/*
@CrossOrigin(origins = {"https://seu-frontend.com"},
             methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
                        RequestMethod.DELETE, RequestMethod.PATCH},
             allowedHeaders = "*")
 */
@Tag(name = "Livros", description = "Gerenciamento de livros")
public class BookController {

    @Autowired
    private BookService bookService;



    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    @Operation(
            summary = "Criar novo livro",
            description = "APENAS USUÁRIOS COM 'CONTRIBUIDOR' adiciona um novo livro ao sistema. O título deve ser único."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Livro criado com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Livro criado",
                                    value = "Livro criado com ID: abc123def456"
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
                                            value = "Erro de validação: [Field error in object 'book' on field 'title': rejected value []; codes [NotBlank.book.title]]"
                                    ),
                                    @ExampleObject(
                                            name = "Título obrigatório",
                                            value = "Erro de validação: Titulo é obrigatório!"
                                    )
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "Título já existe",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Título duplicado",
                                    value = "O título: 'Dom Casmurro' já existe!"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Usuário não tem permissão para adicionar livros",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Usuário sem permissão!",
                                    value = "Apenas usuários com 'CONTRIBUIDOR' podem adicionar livros."
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Erro interno",
                                    value = "Erro ao criar livro: Connection timeout"
                            )
                    )
            )
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Dados do livro a ser criado",
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    examples = @ExampleObject(
                            name = "Exemplo de livro",
                            value = """
            {
                "title": "Dom Casmurro",
                "description": "Romance clássico da literatura brasileira",
                "authors": ["Machado de Assis"],
                "coverUrl": "https://example.com/dom-casmurro.jpg",
                "publicationYear": 1899,
                "genres": ["Romance", "Literatura Brasileira"],
                "pagesCount": 256
            }
            """
                    )
            )
    )
    public ResponseEntity<String> createBook(@Valid @RequestBody Book book, BindingResult result, @RequestHeader HttpHeaders request) throws InterruptedException, ExecutionException {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Erro de validação: " + result.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        try {
            if (bookService.checkUserType(request)) {
                String bookId = bookService.addBook(book);
                return new ResponseEntity<>("Livro criado com ID: " + bookId, HttpStatus.CREATED);
            }
            else {
                return new ResponseEntity<>("Apenas usuários com 'CONTRIBUIDOR' podem adicionar livros.", HttpStatus.FORBIDDEN);
            }
        } catch (BookTitleImmutableFieldException e) {
            return new ResponseEntity<>("O título: '" + e.getMessage() + "' já existe!", HttpStatus.CONFLICT);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>("Erro ao criar livro: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    @Operation(
            summary = "Listar todos os livros",
            description = "Retorna uma lista com todos os livros cadastrados no sistema"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de livros retornada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Lista de livros",
                                    value = """
                [
                    {
                        "bookId": "abc123def456",
                        "title": "Dom Casmurro",
                        "description": "Romance clássico da literatura brasileira",
                        "authors": ["Machado de Assis"],
                        "coverUrl": "https://example.com/dom-casmurro.jpg",
                        "publicationYear": 1899,
                        "genre": "Literatura Brasileira",
                        "averageRating": 4.5,
                        "ratingsCount": 150,
                        "pagesCount": 256
                    },
                    {
                        "bookId": "def456ghi789",
                        "title": "O Cortiço",
                        "description": "Romance naturalista brasileiro",
                        "authors": ["Aluísio Azevedo"],
                        "coverUrl": "https://example.com/o-cortico.jpg",
                        "publicationYear": 1890,
                        "genre": "Romance",
                        "averageRating": 4.2,
                        "ratingsCount": 89,
                        "pagesCount": 312
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
    public ResponseEntity<List<Book>> getAllBooks() {
        try {
            List<Book> books = bookService.getAllBooks();
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/paginated")
    @Operation(
            summary = "Listar livros com paginação",
            description = "Retorna livros ordenados por relevância com paginação"
    )
    public ResponseEntity<List<Book>> getBooksWithPagination(
            @RequestParam(required = false) String lastBookId,
            @RequestParam(defaultValue = "20") Integer pageSize) {
        try {
            List<Book> books = bookService.getBooksWithPagination(lastBookId, pageSize);
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/id/{bookId}")
    @Operation(
            summary = "Buscar livro por ID",
            description = "Retorna os dados de um livro específico baseado no ID fornecido"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Livro encontrado com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Livro encontrado",
                                    value = """
                {
                    "bookId": "abc123def456",
                    "title": "Dom Casmurro",
                    "description": "Romance clássico da literatura brasileira",
                    "authors": ["Machado de Assis"],
                    "coverUrl": "https://example.com/dom-casmurro.jpg",
                    "publicationYear": 1899,
                    "genres": ["Romance", "Literatura Brasileira"],
                    "averageRating": 4.5,
                    "ratingsCount": 150,
                    "pagesCount": 256
                }
                """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Livro não encontrado",
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
    public ResponseEntity<Book> getBookById(@PathVariable("bookId") String bookId) {
        try {
            Book book = bookService.getBookById(bookId);
            if (book != null) {
                return new ResponseEntity<>(book, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/genre")
    @Operation(
            summary = "Listar todos os livros de um certo gênero",
            description = "Retorna uma lista com todos os livros de um mesmo gênero especificado"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de livros retornada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Lista de livros",
                                    value = """
                [
                    {
                        "bookId": "abc123def456",
                        "title": "Dom Casmurro",
                        "description": "Romance clássico da literatura brasileira",
                        "authors": ["Machado de Assis"],
                        "coverUrl": "https://example.com/dom-casmurro.jpg",
                        "publicationYear": 1899,
                        "genre": "Literatura Brasileira",
                        "averageRating": 4.5,
                        "ratingsCount": 150,
                        "pagesCount": 256
                    },
                    {
                        "bookId": "def456ghi789",
                        "title": "O Cortiço",
                        "description": "Romance naturalista brasileiro",
                        "authors": ["Aluísio Azevedo"],
                        "coverUrl": "https://example.com/o-cortico.jpg",
                        "publicationYear": 1890,
                        "genre": "Literatura Brasileira",
                        "averageRating": 4.2,
                        "ratingsCount": 89,
                        "pagesCount": 312
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
    public ResponseEntity<List<Book>> getBooksByGenre(@RequestParam String genre) {
        try {
            List<Book> books = bookService.getBooksByGenre(genre);
            if (books != null) {
                return new ResponseEntity<>(books, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/genre/paginated")
    @Operation(
            summary = "Listar livros de um gênero com paginação",
            description = "Retorna livros de um gênero específico ordenados por relevância com paginação cursor-based"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de livros do gênero retornada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Lista paginada por gênero",
                                    value = """
                [
                  {
                    "bookId": "abc123def456",
                    "title": "Dom Casmurro",
                    "description": "Romance clássico da literatura brasileira",
                    "authors": ["Machado de Assis"],
                    "coverUrl": "https://example.com/dom-casmurro.jpg",
                    "publicationYear": 1899,
                    "genre": "Literatura Brasileira",
                    "averageRating": 4.5,
                    "ratingsCount": 150,
                    "pagesCount": 256,
                    "relevanceScore": 4.2
                  },
                  {
                    "bookId": "def456ghi789",
                    "title": "O Cortiço",
                    "description": "Romance naturalista brasileiro",
                    "authors": ["Aluísio Azevedo"],
                    "coverUrl": "https://example.com/o-cortico.jpg",
                    "publicationYear": 1890,
                    "genre": "Literatura Brasileira",
                    "averageRating": 4.2,
                    "ratingsCount": 89,
                    "pagesCount": 312,
                    "relevanceScore": 4.0
                  }
                ]
                """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Parâmetro genre obrigatório não fornecido",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = "\"Parâmetro 'genre' é obrigatório\""
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
    public ResponseEntity<List<Book>> getBooksByGenreWithPagination(
            @RequestParam String genre,
            @RequestParam(required = false) String lastBookId,
            @RequestParam(defaultValue = "20") Integer pageSize) {

        if (genre == null || genre.trim().isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        try {
            List<Book> books = bookService.getBooksByGenreWithPagination(genre, lastBookId, pageSize);
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/id/{bookId}")
    @Operation(
            summary = "Atualizar dados do livro",
            description = "Atualiza os dados de um livro existente. O ID do livro será definido automaticamente."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Livro atualizado com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Livro atualizado",
                                    value = "\"Livro atualizado com sucesso\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Livro não encontrado",
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
                                    value = "\"Erro ao atualizar livro: Connection timeout\""
                            )
                    )
            )
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Dados atualizados do livro",
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    examples = @ExampleObject(
                            name = "Exemplo de atualização",
                            value = """
            {
                "title": "Dom Casmurro - Edição Revisada",
                "description": "Romance clássico da literatura brasileira - Nova edição com notas",
                "authors": ["Machado de Assis"],
                "coverUrl": "https://example.com/dom-casmurro-nova.jpg",
                "publicationYear": 1899,
                "genres": ["Romance", "Literatura Brasileira", "Clássicos"],
                "pagesCount": 280
            }
            """
                    )
            )
    )
    public ResponseEntity<String> updateBook(@PathVariable("bookId") String bookId, @RequestBody Book book) {
        try {
            book.setBookId(bookId);

            boolean updated = bookService.updateBook(book);
            if (updated) {
                return new ResponseEntity<>("Livro atualizado com sucesso", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Livro não encontrado", HttpStatus.NOT_FOUND);
            }
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>("Erro ao atualizar livro: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/id/{bookId}")
    @Operation(
            summary = "Deletar livro",
            description = "Remove um livro do sistema baseado no ID fornecido"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Livro deletado com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Livro deletado",
                                    value = "\"Livro deletado com sucesso\""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Livro não encontrado",
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
                                    value = "\"Erro ao deletar livro: Connection timeout\""
                            )
                    )
            )
    })
    public ResponseEntity<String> deleteBook(@PathVariable("bookId") String bookId) {
        try {
            boolean deleted = bookService.deleteBook(bookId);
            if (deleted) {
                return new ResponseEntity<>("Livro deletado com sucesso", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Livro não encontrado", HttpStatus.NOT_FOUND);
            }
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>("Erro ao deletar livro: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/migrate")
    @Operation(
            summary = "Executar migração de dados, não serve pra nada em produção",
            description = "Migra campos genres-> genre e calcula relevanceScore para todos os livros"
    )
    public ResponseEntity<String> executeMigration() {
        try {
            UnifiedMigrationService migrationService = new UnifiedMigrationService();
            migrationService.migrateAllBooksData();
            return new ResponseEntity<>("Migração executada com sucesso!", HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>("Erro na migração: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/migration-status")
    @Operation(
            summary = "Verificar status da migração, não serve para nada em produção",
            description = "Retorna informações sobre o progresso da migração"
    )
    public ResponseEntity<MigrationStatus> getMigrationStatus() {
        try {
            UnifiedMigrationService migrationService = new UnifiedMigrationService();
            MigrationStatus status = migrationService.checkMigrationStatus();
            return new ResponseEntity<>(status, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
