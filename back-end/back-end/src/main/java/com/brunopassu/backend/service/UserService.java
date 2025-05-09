package com.brunopassu.backend.service;

import com.brunopassu.backend.config.FirestoreConfig;
import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
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

    public boolean updateUser(User user) throws ExecutionException, InterruptedException {
        // Aqui você pode adicionar validações ou lógica adicional antes da atualização
        return userRepository.updateUser(user);
    }

    public boolean updateUserFields(String userId, Map<String, Object> fields) throws ExecutionException, InterruptedException {
        // Validações adicionais podem ser feitas aqui
        return userRepository.updateUserFields(userId, fields);
    }

    public boolean deleteUser(String userId) throws ExecutionException, InterruptedException {
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
}
