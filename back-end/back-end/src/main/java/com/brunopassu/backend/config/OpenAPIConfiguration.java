package com.brunopassu.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfiguration {

    @Bean
    public OpenAPI openAPI() {
        Server server = new Server();

        server.setUrl("http://localhost:8080");
        server.setDescription("Local development server");

        Info information = new Info()
                .title("Letterboxd API - Sua rede social de livros")
                .version("1.0")
                .description("API para gerenciar livros, resenhas e interações sociais entre usuários. " +
                        "Permite criação de usuários, adição de livros, resenhas, comentários e likes. " +
                        "Inclui funcionalidades de seguir outros usuários e visualizar suas atividades.")
                //.license(new License().name("Apache 2.0").url("http://www.apache.org/licenses/LICENSE-2.0.html"))
                ;

        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .description("Token Firebase Authentication");

        SecurityRequirement securityRequirement = new SecurityRequirement()
                .addList("Firebase Auth");

        return new OpenAPI().info(information).servers(List.of(server)).addSecurityItem(securityRequirement).schemaRequirement("Firebase Auth", securityScheme);
    }
}
