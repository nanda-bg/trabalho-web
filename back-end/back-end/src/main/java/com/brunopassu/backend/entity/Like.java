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
public class Like {
    public static final String PATH = "likes";

    private String likeId;
    private DocumentReference userRef;
    private DocumentReference reviewRef;
    private String userId;
    private String reviewId;
    private Timestamp createdAt;

}
