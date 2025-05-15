package com.brunopassu.backend.controller;

import com.brunopassu.backend.entity.AuthRequest;
import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.exception.UserAlreadyExistsException;
import com.brunopassu.backend.service.AuthService;
import com.brunopassu.backend.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
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
    //REQUESTBODY -> nome, email, senha
    //email, senha -> autentiação
    //nome -> id unico (além do uid)
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
    public ResponseEntity<?> verifyToken(@RequestBody Map<String, String> request) {
        try {
            String uid = authService.verifyToken(request.get("token"));
            Map<String, String> response = new HashMap<>();
            response.put("uid", uid);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (FirebaseAuthException e) {
            System.out.println("Token inválido: " + e.getMessage());
            System.out.println("Token inválido: " + e.getErrorCode());
            return new ResponseEntity<>("Token inválido: " + e.getMessage(),
                    HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/login-direct")
    public ResponseEntity<?> loginDirect(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        if (email == null || password == null) {
            return new ResponseEntity<>("Credenciais incompletas", HttpStatus.BAD_REQUEST);
        }

        try {
            URL url = new URL("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2AJWdGjTKoCd4OB_dODSosbtfZ3w4aUs");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            String payload = String.format("{\"email\":\"%s\",\"password\":\"%s\",\"returnSecureToken\":true}",
                    email, password);

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = payload.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            if (conn.getResponseCode() == 200) {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode response = mapper.readTree(new InputStreamReader(conn.getInputStream()));

                Map<String, String> tokenResponse = new HashMap<>();
                tokenResponse.put("idToken", response.get("idToken").asText());
                tokenResponse.put("refreshToken", response.get("refreshToken").asText());
                tokenResponse.put("expiresIn", response.get("expiresIn").asText());

                return new ResponseEntity<>(tokenResponse, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Erro na autenticação: " + conn.getResponseCode(),
                        HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Erro: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        if (email == null || password == null) {
            return new ResponseEntity<>("Credenciais incompletas", HttpStatus.BAD_REQUEST);
        }

        try {
            // 1. Autenticar o usuário (você precisaria implementar isso)
            // 2. Gerar custom token
            String customToken = FirebaseAuth.getInstance().createCustomToken(email);

            Map<String, String> response = new HashMap<>();
            response.put("customToken", customToken);
            response.put("message", "Use este token para trocar por um ID token");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (FirebaseAuthException e) {
            return new ResponseEntity<>("Erro: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    /*
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        if (email == null || email.trim().isEmpty()) {
            return new ResponseEntity<>("Email não fornecido", HttpStatus.BAD_REQUEST);
        }

        if (password == null || password.trim().isEmpty()) {
            return new ResponseEntity<>("Senha não fornecida", HttpStatus.BAD_REQUEST);
        }

        try {
            // Obter token usando Firebase Admin SDK
            String customToken = FirebaseAuth.getInstance().createCustomToken(email);

            Map<String, Object> response = new HashMap<>();
            response.put("customToken", customToken);
            response.put("message", "Use este token para autenticar no cliente Firebase");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (FirebaseAuthException e) {
            return new ResponseEntity<>("Erro na autenticação: " + e.getMessage(),
                    HttpStatus.UNAUTHORIZED);
        }
    }
    */

    @PostMapping("/exchange-token")
    public ResponseEntity<?> exchangeToken(@RequestBody Map<String, String> request) {
        String customToken = request.get("customToken");

        if (customToken == null) {
            return new ResponseEntity<>("Token não fornecido", HttpStatus.BAD_REQUEST);
        }

        try {
            // Esta parte deve ser feita no cliente, mas para testes podemos implementar no servidor
            URL url = new URL("https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyC2AJWdGjTKoCd4OB_dODSosbtfZ3w4aUs");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            String payload = String.format("{\"token\":\"%s\",\"returnSecureToken\":true}", customToken);

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = payload.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            if (conn.getResponseCode() == 200) {
                try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }

                    // Extrair idToken (em produção use uma biblioteca JSON)
                    ObjectMapper mapper = new ObjectMapper();
                    JsonNode root = mapper.readTree(response.toString());
                    String idToken = root.get("idToken").asText();

                    Map<String, String> tokenResponse = new HashMap<>();
                    tokenResponse.put("idToken", idToken);
                    return new ResponseEntity<>(tokenResponse, HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<>("Erro na troca de token: " + conn.getResponseCode(), HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Erro: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/test-auth")
    public ResponseEntity<?> testAuth(HttpServletRequest request) {
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
