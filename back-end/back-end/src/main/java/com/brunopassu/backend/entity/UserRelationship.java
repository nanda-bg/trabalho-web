package com.brunopassu.backend.entity;

import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserRelationship {
    private String userRelationshipId;
    private String followerId; // Usuário que está seguindo
    private String followingId; // Usuário que está sendo seguido
    private Timestamp createdAt;
    private DocumentReference followerRef;  // referência ao usuário seguidor
    private DocumentReference followingRef; // referência ao usuário seguido

    public UserRelationship(){}

    public UserRelationship(String followerId, String followingId) {
        this.followerId = followerId;
        this.followingId = followingId;
        this.createdAt = Timestamp.now();
    }

    public String getUserRelationshipId() {
        return userRelationshipId;
    }

    public void setUserRelationshipId(String userRelationshipId) {
        this.userRelationshipId = userRelationshipId;
    }

    public String getFollowerId() {
        return followerId;
    }

    public void setFollowerId(String followerId) {
        this.followerId = followerId;
    }

    public String getFollowingId() {
        return followingId;
    }

    public void setFollowingId(String followingId) {
        this.followingId = followingId;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public DocumentReference getFollowerRef() {
        return followerRef;
    }

    public void setFollowerRef(DocumentReference followerRef) {
        this.followerRef = followerRef;
    }

    public DocumentReference getFollowingRef() {
        return followingRef;
    }

    public void setFollowingRef(DocumentReference followingRef) {
        this.followingRef = followingRef;
    }
}
