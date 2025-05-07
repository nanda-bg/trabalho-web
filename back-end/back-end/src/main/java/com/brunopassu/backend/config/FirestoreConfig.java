package com.brunopassu.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirestoreConfig {

    @Bean
    public Firestore firestore() throws IOException {

        InputStream serviceAccount = new ClassPathResource("serviceAccountKey.json").getInputStream();

        return FirestoreOptions.getDefaultInstance().toBuilder()
                .setProjectId("trabalho-web-4fe70")
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build()
                .getService();
    }

}
