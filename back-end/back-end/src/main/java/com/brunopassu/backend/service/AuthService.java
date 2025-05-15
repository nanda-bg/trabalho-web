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


    /*
    public String authenticateUser(String email, String password) throws FirebaseAuthException {
        try {
            // Verificar se o usuário existe
            UserRecord userRecord = FirebaseAuth.getInstance().getUserByEmail(email);

            // Usar HTTP Client para chamar a API REST do Firebase
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            // Criar payload
            String payload = String.format("{\"email\":\"%s\",\"password\":\"%s\",\"returnSecureToken\":true}",
                    email, password);

            // Enviar requisição
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = payload.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            // Ler resposta
            if (conn.getResponseCode() == 200) {
                try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }

                    // Extrair idToken da resposta JSON
                    // Nota: Em produção, use uma biblioteca JSON adequada
                    String responseStr = response.toString();
                    int idTokenStart = responseStr.indexOf("\"idToken\":\"") + 11;
                    int idTokenEnd = responseStr.indexOf("\"", idTokenStart);
                    String idToken = responseStr.substring(idTokenStart, idTokenEnd);

                    return idToken;
                }
            } else {
                throw new FirebaseAuthException("authentication-error",
                        "Falha na autenticação: " + conn.getResponseCode());
            }
        } catch (IOException e) {
            throw new FirebaseAuthException("network-error",
                    "Erro de conexão: " + e.getMessage());
        }
    }
    */
}