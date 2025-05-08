package com.brunopassu.backend.entity;

public class User {

    private String uid; //Chave primária *
    private String email; //*
    private String name;
    private String username; //NOME ÚNICO
    private String profilePicture; //URL
    private String bio;
    private Integer followers;
    private Integer following;

    public User() {
    }

    public User(String uid, String email, String name, String username, String profilePicture, String bio, Integer followers, Integer following) {
        this.uid = uid;
        this.email = email;
        this.name = name;
        this.username = username;
        this.profilePicture = profilePicture;
        this.bio = bio;
        this.followers = followers;
        this.following = following;
    }

    //Construtor sem opcionais
    public User (String email, String username) {
        this.email = email;
        this.username = username;
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
