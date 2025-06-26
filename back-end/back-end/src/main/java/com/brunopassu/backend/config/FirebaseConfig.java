package com.brunopassu.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        // Verifica se já existe uma instância do Firebase inicializada
        if (FirebaseApp.getApps().isEmpty()) {
            InputStream serviceAccount;

            // Carrega o arquivo de credenciais do Firebase
            try {
                serviceAccount = new ClassPathResource("serviceAccountKey.json").getInputStream();
            } catch (Exception e) {
                // Fallback para arquivo no sistema de arquivos
                serviceAccount = new FileInputStream("/app/serviceAccountKey.json");
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://trabalho-web-4fe70-default-rtdb.firebaseio.com/")  // Substitua pela URL do seu banco de dados
                    .build();

            return FirebaseApp.initializeApp(options);
        } else {
            return FirebaseApp.getInstance();
        }
    }

    @Bean
    public FirebaseAuth firebaseAuth(FirebaseApp firebaseApp) {
        return FirebaseAuth.getInstance(firebaseApp);
    }

}
