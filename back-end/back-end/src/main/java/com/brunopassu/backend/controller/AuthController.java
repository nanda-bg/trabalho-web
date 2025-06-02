package com.brunopassu.backend.controller;

import com.brunopassu.backend.dto.VerifyTokenRequestDTO;
import com.brunopassu.backend.entity.AuthRequest;
import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.exception.UserAlreadyExistsException;
import com.brunopassu.backend.service.AuthService;
import com.brunopassu.backend.service.UserService;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Autowired
    public UserService userService;


    @PostMapping("/register")
    @Operation(
            summary = "Registrar novo usuário",
            description = "Cria um novo usuário no Firebase Authentication e no Firestore. " +
                    "O usuário deve fornecer email, senha e username. O nome é opcional."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Usuário criado com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Usuário criado",
                                    value = """
                {
                    "uid": "iw6CbUxMxahnjBdgeN2NLz5Idte2",
                    "email": "email@gmail.com"
                }
                """
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
                                            name = "Email inválido",
                                            value = "Email não pode ser nulo ou vazio"
                                    ),
                                    @ExampleObject(
                                            name = "Senha inválida",
                                            value = "Senha não pode ser nula ou vazia"
                                    ),
                                    @ExampleObject(
                                            name = "Username inválido",
                                            value = "O usuário deve possuir um username"
                                    ),
                                    @ExampleObject(
                                            name = "Erro Firebase",
                                            value = "Erro ao criar usuário: The email address is badly formatted"
                                    )
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "Usuário já existe",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Email já cadastrado",
                                            value = "\"Usuário já cadastrado com esse email!\""
                                    ),
                                    @ExampleObject(
                                            name = "Username já existe",
                                            value = "\"Username já cadastrado!\""
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
                                    name = "Erro no Firestore",
                                    value = "\"Erro ao salvar usuário no Firestore: Connection timeout\""
                            )
                    )
            )
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Dados para criação do usuário",
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    examples = @ExampleObject(
                            name = "Exemplo de cadastro",
                            value = """
                            {
                                "email": "teste10@gmail.com",
                                "password": "12345678",
                                "name": "teste10",
                                "username": "teste10",
                                "profilePicture": null,
                                "bio": "teste10"
                            }
                            """
                    )
            )
    )
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return new ResponseEntity<>("Email não pode ser nulo ou vazio", HttpStatus.BAD_REQUEST);
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            return new ResponseEntity<>("Senha não pode ser nula ou vazia", HttpStatus.BAD_REQUEST);
        }

        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            return new ResponseEntity<>("O usuário deve possuir um username", HttpStatus.BAD_REQUEST);
        }

        try {
            boolean usernameExists = userService.checkUsernameExists(request.getUsername());
            if (usernameExists) {
                throw new UserAlreadyExistsException("Username já cadastrado!");
            }

            UserRecord userRecord = authService.createUser(request.getEmail(), request.getPassword());

            // Cria o usuário no Firestore com o mesmo UID
            User user = new User();
            user.setUid(userRecord.getUid());
            user.setEmail(request.getEmail());
            if (request.getName() == null || request.getName().trim().isEmpty()) {
                user.setName(null);
            } else {
                user.setName(request.getName());
            }
            user.setUsername(request.getUsername());
            user.setFollowers(0);
            user.setFollowing(0);

            userService.AddUser(user);

            Map<String, String> response = new HashMap<>();
            response.put("uid", userRecord.getUid());
            response.put("email", userRecord.getEmail());

            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (FirebaseAuthException e) {
            return new ResponseEntity<>("Erro ao criar usuário: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>("Erro ao salvar usuário no Firestore: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (UserAlreadyExistsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }


    @PostMapping("/verify-token")
    @Operation(
            summary = "Verificar token Firebase",
            description = "Valida um token ID do Firebase Authentication e retorna o UID do usuário. " +
                    "Este endpoint é usado para verificar se um token ainda é válido e obter informações do usuário."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Token válido - dados do usuário",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = """
                {
                  "uid": "abc123def456ghi789"
                }
                """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Token não fornecido ou inválido",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = """
                {
                  "error": "BAD_REQUEST",
                  "message": "Token é obrigatório"
                }
                """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token inválido ou expirado",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = """
                {
                  "INVALID_TOKEN": "Token Firebase inválido: Token has expired"
                }
                """
                            )
                    )
            )
    })
    public ResponseEntity<?> verifyToken(@RequestBody @Valid VerifyTokenRequestDTO request) {
        try {
            String uid = authService.verifyToken(request.getToken());
            Map<String, String> response = new HashMap<>();
            response.put("uid", uid);
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (FirebaseAuthException e) {
            System.out.println("Token inválido: " + e.getMessage());
            System.out.println("Token inválido: " + e.getErrorCode());

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("INVALID_TOKEN", "Token Firebase inválido: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    @Operation(
            summary = "Testar autenticação",
            description = "Endpoint para testar a autenticação. Retorna o userId do usuário autenticado."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Autenticação bem-sucedida",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = """
                                           {
                                            "message": "Autenticação bem-sucedida",
                                            "userId": "abc123def456ghi789"
                                           }"""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token inválido ou não fornecido",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = """
                                           {
                                            "message": "Falha na autenticação: userId não encontrado"
                                           }"""
                            )
                    )
            )
    })
    @GetMapping("/test-auth")
    public ResponseEntity<Map<String, String>> testAuth(HttpServletRequest request) {
        System.out.println("==== AUTH CONTROLLER - TEST AUTH ====");
        String userId = (String) request.getAttribute("userId");
        System.out.println("UserId do request: " + userId);

        if (userId == null) {
            System.out.println("ALERTA: userId é null!");
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Falha na autenticação: userId não encontrado");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        // Usando HashMap em vez de Map.of() para evitar NullPointerException
        Map<String, String> response = new HashMap<>();
        response.put("message", "Autenticação bem-sucedida");
        response.put("userId", userId);

        System.out.println("Resposta de autenticação bem-sucedida para userId: " + userId);
        return ResponseEntity.ok(response);
    }
}
