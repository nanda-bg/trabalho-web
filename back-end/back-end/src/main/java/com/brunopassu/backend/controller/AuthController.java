package com.brunopassu.backend.controller;

import com.brunopassu.backend.entity.AuthRequest;
import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.exception.UserAlreadyExistsException;
import com.brunopassu.backend.service.AuthService;
import com.brunopassu.backend.service.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
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


}
