package com.brunopassu.backend.service;

import com.brunopassu.backend.exception.UserAlreadyExistsException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private FirebaseAuth firebaseAuth;

    public UserRecord createUser(String email, String password) throws FirebaseAuthException, UserAlreadyExistsException {

        try {
            UserRecord.CreateRequest request = new UserRecord.CreateRequest().
                    setEmail(email).
                    setPassword(password).
                    setEmailVerified(false);

            return FirebaseAuth.getInstance().createUser(request);
        } catch (FirebaseAuthException e) {
            throw new UserAlreadyExistsException("Usuário já cadastrado com esse email!");
        }
    }

    public String verifyToken(String idToken) throws FirebaseAuthException {
        System.out.println("==== AUTH SERVICE - VERIFY TOKEN ====");
        System.out.println("Verificando token: " + idToken.substring(0, Math.min(idToken.length(), 20)) + "...");

        try {
            String uid = FirebaseAuth.getInstance().verifyIdToken(idToken).getUid();
            System.out.println("Token verificado com sucesso. UID: " + uid);
            return uid;
        } catch (FirebaseAuthException e) {
            System.out.println("Erro na verificação do token: " + e.getMessage());
            System.out.println("Código de erro: " + e.getErrorCode());
            throw e;
        }
    }

}