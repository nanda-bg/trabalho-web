package com.brunopassu.backend.entity;

import com.brunopassu.backend.entity.enums.UserType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

@Schema(description = "Entidade de usuário do sistema")
public class User {

    @Schema(description = "UID único do usuário (chave primária)", example = "abc123def456")
    private String uid;

    @Schema(description = "Email do usuário", example = "[email protected]", required = true)
    @NotBlank(message = "Email Obrigatório")
    @NotEmpty(message = "Email não pode ser branco!")
    private String email;

    @Schema(description = "Nome completo do usuário", example = "João Silva", required = true)
    @NotBlank(message = "Nome Obrigatório")
    @NotEmpty(message = "Nome não pode ser branco!")
    private String name;

    @Schema(description = "Username único do usuário", example = "joao123", required = true)
    @NotBlank(message = "Username Obrigatório")
    @NotEmpty(message = "Username não pode ser branco!")
    private String username;

    @Schema(description = "URL da foto de perfil", example = "https://example.com/foto.jpg")
    private String profilePicture;

    @Schema(description = "Biografia do usuário", example = "Amante de livros e literatura clássica")
    private String bio;

    @Schema(description = "Número de seguidores", example = "150")
    private Integer followers;

    @Schema(description = "Número de usuários seguindo", example = "75")
    private Integer following;

    @Schema(description = "Tipo de Usuário, receber 'PADRAO' caso seja um usuário normal ou 'CONTRIBUIDOR' caso seja um usuário que pode cadastrar livros", example = "CONTRIBUIDOR", required = true)
    @NotBlank(message = "UserType deve ter um tipo!")
    @NotEmpty(message = "UserType não pode ser branco!")
    private UserType userType;

    public User() {
    }

    public User(String uid, String email, String name, String username, String profilePicture, String bio, Integer followers, Integer following, UserType userType) {
        this.uid = uid;
        this.email = email;
        this.name = name;
        this.username = username;
        this.profilePicture = profilePicture;
        this.bio = bio;
        this.followers = followers;
        this.following = following;
        this.userType = userType;
    }

    //Construtor sem opcionais
    public User (String email, String username) {
        this.email = email;
        this.username = username;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

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

    public Integer getFollowing() {
        return following;
    }

    public void setFollowing(Integer following) {
        this.following = following;
    }

    public Integer getFollowers() {
        return followers;
    }

    public void setFollowers(Integer followers) {
        this.followers = followers;
    }
}
