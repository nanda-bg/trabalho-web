package com.brunopassu.backend.service;

import com.brunopassu.backend.config.FirestoreConfig;
import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.exception.UserAlreadyExistsException;
import com.brunopassu.backend.exception.UserEmailmmutableFieldException;
import com.brunopassu.backend.exception.UserUsernameImmutableFieldException;
import com.brunopassu.backend.repository.UserRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {


    private final UserRepository userRepository;
    private final FirestoreConfig firestore;

    @Autowired
    public UserService(UserRepository userRepository, FirestoreConfig firestore) {
        this.userRepository = userRepository;
        this.firestore = firestore;
    }

    public String AddUser(User user) throws ExecutionException, InterruptedException{
        // Aqui você poderia adicionar lógica como hash da senha antes de salvar
        // Por exemplo: user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.saveUser(user);
    }


    public User getUserByUsername(String username) throws ExecutionException, InterruptedException {
        return userRepository.getUserByUsername(username);
    }

    public User getUserById(String userId) throws ExecutionException, InterruptedException {
        return userRepository.getUserById(userId);
    }

    public List<User> getAllUsers() throws ExecutionException, InterruptedException {
        return userRepository.getAllUsers();
    }

    public boolean updateUser(User user) throws ExecutionException, InterruptedException, IOException,
            UserAlreadyExistsException, UserUsernameImmutableFieldException, UserEmailmmutableFieldException, FirebaseAuthException {

        if (user.getUid() == null || user.getUid().isEmpty()) {
            return false; // Não podemos atualizar sem um ID
        }

        // Obter usuário atual para comparação
        User existingUser = getUserById(user.getUid());
        if (existingUser == null) {
            return false;
        }

        // Verificar se o username foi alterado
        if (!existingUser.getUsername().equals(user.getUsername())) {
            // Verificar se o novo username já existe
            if (checkUsernameExists(user.getUsername())) {
                throw new UserUsernameImmutableFieldException("Username já está em uso por outro usuário!");
            }
        }

        // Verificar se o email foi alterado
        if (!existingUser.getEmail().equals(user.getEmail())) {
            // Verificar se o novo email já existe
            if (checkEmailExists(user.getEmail())) {
                throw new UserEmailmmutableFieldException("Email já está em uso por outro usuário!");
            }

            // Atualizar o email no Firebase Authentication
            try {
                UserRecord.UpdateRequest request = new UserRecord.UpdateRequest(user.getUid())
                        .setEmail(user.getEmail());
                FirebaseAuth.getInstance().updateUser(request);
            } catch (FirebaseAuthException e) {
                // Se falhar a atualização no Authentication, não prosseguir com a atualização no Firestore
                throw new FirebaseAuthException(e);
            }
        }

        // Atualiza o documento no Firestore
        return userRepository.updateUser(user);
    }

    public boolean deleteUser(String userId) throws ExecutionException, InterruptedException, FirebaseAuthException {
        if (userId == null || userId.isEmpty()) {
            return false;
        }

        // Primeiro, verifica se o usuário existe no Firestore
        User user = getUserById(userId);
        if (user == null) {
            return false;
        }

        // Tenta excluir do Authentication primeiro
        try {
            FirebaseAuth.getInstance().deleteUser(userId);
        } catch (FirebaseAuthException e) {
            // Se o usuário não existir no Authentication, podemos prosseguir com a exclusão do Firestore
            if (e.getErrorCode().equals("user-not-found")) {
                System.out.println("Usuário não encontrado no Authentication, prosseguindo com exclusão do Firestore");
            } else {
                // Para outros erros, propaga a exceção
                throw e;
            }
        }

        // Exclui do Firestore
        return userRepository.deleteUser(userId);
    }

    public boolean checkUsernameExists(String username) throws ExecutionException, InterruptedException, IOException {
        return firestore.firestore().
                collection("users")
                .whereEqualTo("username", username)
                .get()
                .get() // Segundo get() para obter o resultado do Future
                .getDocuments()
                .size() > 0;
    }

    public boolean checkEmailExists(String email) throws ExecutionException, InterruptedException, IOException {
        return firestore.firestore()
                .collection("users")
                .whereEqualTo("email", email)
                .get()
                .get() // Segundo get() para obter o resultado do Future
                .getDocuments()
                .size() > 0;
    }
}
