package com.brunopassu.backend.dto;

import com.google.cloud.Timestamp;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReviewDTO {
    private String reviewId;
    private String userUid;     // ID do usuário (em vez da referência)
    private String bookId;      // ID do livro (em vez da referência)
    private Integer rating;         // Avaliação (1-5 estrelas)
    private String reviewText;     // Comentário da avaliação
    private Timestamp date; // Data de criação
    private Integer likeCount;
    private boolean spoiler;
    private Timestamp dateLastUpdated;

}