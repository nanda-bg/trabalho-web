package com.brunopassu.backend.entity;

import com.brunopassu.backend.entity.enums.UserType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Request para autenticação e registro de usuário")
public class AuthRequest {

    @Schema(description = "Email do usuário", example = "teste10@gmail.com", required = true)
    private String email;

    @Schema(description = "Senha do usuário", example = "12345678", required = true)
    private String password;

    @Schema(description = "Username único", example = "teste10", required = true)
    private String username;

    @Schema(description = "Nome completo do usuário", example = "teste10", required = true)
    private String name;

    @Schema(description = "URL da foto de perfil", example = "null")
    private String profilePicture;

    @Schema(description = "Biografia do usuário", example = "teste10")
    private String bio;

    @Schema(description = "Tipo de Usuário, receber 'PADRAO' caso seja um usuário normal ou 'CONTRIBUIDOR' caso seja um usuário que pode cadastrar livros", example = "CONTRIBUIDOR", required = true)
    private UserType userType;

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
