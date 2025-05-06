package com.brunopassu.backend.service;

import com.brunopassu.backend.exception.UserAlreadyExistsException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

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

    public UserRecord getUserById(String uid) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().getUser(uid);
    }

    public UserRecord getUserByEmail(String email) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().getUserByEmail(email);
    }

    public String verifyToken(String idToken) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().verifyIdToken(idToken).getUid();
    }
}