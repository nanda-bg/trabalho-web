package com.brunopassu.backend.controller;

import com.brunopassu.backend.dto.ReviewDTO;
import com.brunopassu.backend.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*") //ESTUDAR COMO MELHORAR ISSO!
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<String> createReview(@Valid @RequestBody ReviewDTO reviewDTO, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Erro de validação de review: " + result.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        try {
            String ReviewID = reviewService.addReview(reviewDTO);
            return new ResponseEntity<>("Review criado com ID: " + ReviewID, HttpStatus.CREATED);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>("Erro ao criar review: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        try {
            return new ResponseEntity<>(reviewService.getAllReviews(), HttpStatus.OK);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable String reviewId) {
        try {
            ReviewDTO review = reviewService.getReviewById(reviewId);
            return review != null ?
                    new ResponseEntity<>(review, HttpStatus.OK) :
                    new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByBookId(@PathVariable String bookId) {
        try {
            List<ReviewDTO> reviews = reviewService.getReviewsByBookId(bookId);
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByUserId(@PathVariable String userId) {
        try {
            List<ReviewDTO> reviews = reviewService.getReviewsByUserId(userId);
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<String> updateReview(@PathVariable String reviewId, @RequestBody ReviewDTO reviewDTO) {
        try {
            reviewDTO.setReviewId(reviewId);
            boolean updated = reviewService.updateReview(reviewDTO);
            return updated ?
                    new ResponseEntity<>("Review atualizada com sucesso", HttpStatus.OK) :
                    new ResponseEntity<>("Falha ao atualizar review", HttpStatus.BAD_REQUEST);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>("Erro ao atualizar review: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/{reviewId}/like")
    public ResponseEntity<String> likeReview(@PathVariable String reviewId) {
        try {
            boolean updated = reviewService.incrementLikeCount(reviewId);
            return updated ?
                    new ResponseEntity<>("Like adicionado com sucesso", HttpStatus.OK) :
                    new ResponseEntity<>("Falha ao adicionar like", HttpStatus.BAD_REQUEST);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>("Erro ao processar like: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable String reviewId) {
        try {
            boolean deleted = reviewService.deleteReview(reviewId);
            return deleted ?
                    new ResponseEntity<>("Review deletada com sucesso", HttpStatus.OK) :
                    new ResponseEntity<>("Falha ao deletar review", HttpStatus.BAD_REQUEST);
        } catch (ExecutionException | InterruptedException | IOException e) {
            return new ResponseEntity<>("Erro ao deletar review: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
