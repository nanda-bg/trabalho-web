package com.brunopassu.backend.entity;

import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserRelationship {
    private String userRelationshipId;
    private String followerId; // Usuário que está seguindo
    private String followingId; // Usuário que está sendo seguido
    private Timestamp createdAt;
    private DocumentReference followerRef;  // referência ao usuário seguidor
    private DocumentReference followingRef; // referência ao usuário seguido

    public UserRelationship(String followerId, String followingId) {
        this.followerId = followerId;
        this.followingId = followingId;
        this.createdAt = Timestamp.now();
    }
}
