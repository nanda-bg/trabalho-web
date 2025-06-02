package com.brunopassu.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Request para verificação de token Firebase")
public class VerifyTokenRequestDTO {

    @Schema(description = "Token ID do Firebase Authentication",
            example = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2NzAyN...",
            required = true)
    @NotNull(message = "Token não pode ser nulo")
    @NotBlank(message = "Token não pode estar vazio")
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}