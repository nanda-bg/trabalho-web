package com.brunopassu.backend.controller;

import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.exception.UserAlreadyExistsException;
import com.brunopassu.backend.exception.UserEmailmmutableFieldException;
import com.brunopassu.backend.exception.UserUsernameImmutableFieldException;
import com.brunopassu.backend.service.UserService;
import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*") //ESTUDAR COMO MELHORAR ISSO!
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /*
    @PostMapping
    public ResponseEntity<String> createUser (@RequestBody User user) {
        try {
            String userId = userService.AddUser(user);
            return new ResponseEntity<>("Usuário criado com ID: " + userId, HttpStatus.CREATED);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>("Erro ao criar usuário: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    */

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{username}")
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

    @PatchMapping("/id/{id}")
    public ResponseEntity<?> updateUserFields(@PathVariable String id, @RequestBody Map<String, Object> fields) {
        try {
            boolean updated = userService.updateUserFields(id, fields);
            if (updated) {
                return new ResponseEntity<>("Campos do usuário atualizados com sucesso", HttpStatus.OK);
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
            return new ResponseEntity<>("Erro ao atualizar campos do usuário: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/id/{id}")
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
