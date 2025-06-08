package com.brunopassu.backend.service;

import com.brunopassu.backend.config.FirestoreConfig;
import com.brunopassu.backend.dto.ReviewDTO;
import com.brunopassu.backend.entity.Book;
import com.brunopassu.backend.entity.Like;
import com.brunopassu.backend.entity.Review;
import com.brunopassu.backend.entity.User;
import com.brunopassu.backend.repository.LikeRepository;
import com.brunopassu.backend.repository.ReviewRepository;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final FirestoreConfig firestore;
    private final LikeRepository likeRepository;

    public ReviewService(ReviewRepository reviewRepository, FirestoreConfig firestore, LikeRepository likeRepository, LikeRepository likeRepository1) {
        this.reviewRepository = reviewRepository;
        this.firestore = firestore;
        this.likeRepository = likeRepository1;
    }

    public String addReview(ReviewDTO reviewDTO) throws ExecutionException, InterruptedException, IOException {
        // Converter DTO para entidade
        Review review = convertToEntity(reviewDTO);

        // Definir timestamp de criação se não existir
        if (review.getDate() == null) {
            review.setDate(Timestamp.now());
        }

        // Inicializar contador de likes se necessário
        if (review.getLikeCount() == null) {
            review.setLikeCount(0);
        }

        String reviewId = reviewRepository.saveReview(review);

        //updateBookRatingIncremental(review.getBookRef().getId(), review.getRating(), 0, true);
        // Atualizar a média de avaliação e contador do livro
        updateBookRating(review.getBookRef().getId());

        // Salvar no repositório
        return reviewId;
    }

    private void updateBookRating(String bookId) throws ExecutionException, InterruptedException, IOException {
        // Buscar todas as reviews para este livro
        List<Review> reviews = reviewRepository.getReviewsByBookId(bookId);

        // Calcular a nova média
        double sum = 0;
        for (Review review : reviews) {
            sum += review.getRating();
        }

        int count = reviews.size();
        double average = count > 0 ? sum / count : 0;

        // Arredondar para uma casa decimal
        average = Math.round(average * 10.0) / 10.0;

        // Atualizar o livro
        Firestore firestore = this.firestore.firestore();
        DocumentReference bookRef = firestore.collection("books").document(bookId);

        WriteBatch batch = firestore.batch();
        batch.update(bookRef, "averageRating", average);
        batch.update(bookRef, "ratingsCount", count);
        batch.commit().get();
    }

    public void updateBookRatingIncremental(String bookId, double newRating, double oldRating, boolean isNew) throws IOException {
        Firestore firestore = this.firestore.firestore();
        DocumentReference bookRef = firestore.collection("books").document(bookId);

        firestore.runTransaction(transaction -> {
            DocumentSnapshot bookSnapshot = transaction.get(bookRef).get();
            Book book = bookSnapshot.toObject(Book.class);

            double currentAvg = book.getAverageRating();
            int currentCount = book.getRatingsCount();

            // Calcular nova média e contador
            int newCount;
            double newAvg;

            if (isNew) {
                // Nova review
                newCount = currentCount + 1;
                newAvg = ((currentAvg * currentCount) + newRating) / newCount;
            } else if (oldRating != newRating) {
                // Atualização de review
                newCount = currentCount;
                newAvg = ((currentAvg * currentCount) - oldRating + newRating) / newCount;
            } else {
                // Nenhuma mudança necessária
                return null;
            }

            // Arredondar para uma casa decimal
            newAvg = Math.round(newAvg * 10.0) / 10.0;

            // Atualizar o livro
            transaction.update(bookRef, "averageRating", newAvg);
            transaction.update(bookRef, "ratingsCount", newCount);

            return null;
        });
    }


    public List<ReviewDTO> getAllReviews() throws ExecutionException, InterruptedException, IOException {
        return getAllReviewsWithDetails();
    }

    public ReviewDTO getReviewById(String reviewId) throws ExecutionException, InterruptedException, IOException {
        Review review = reviewRepository.getReviewById(reviewId);
        return review != null ? convertToDTOAsync(review) : null;
    }

    public List<ReviewDTO> getReviewsByBookId(String bookId) throws ExecutionException, InterruptedException, IOException {
        List<Review> reviews = reviewRepository.getReviewsByBookId(bookId);

        // Otimização para buscar usuários em lote
        Map<String, ApiFuture<DocumentSnapshot>> userFutures = new HashMap<>();
        Firestore firestore = this.firestore.firestore();

        for (Review review : reviews) {
            String userId = review.getUserRef().getId();
            if (!userFutures.containsKey(userId)) {
                userFutures.put(userId, firestore.collection("users").document(userId).get());
            }
        }

        // Cache dos usuários
        Map<String, User> userCache = new HashMap<>();
        for (Map.Entry<String, ApiFuture<DocumentSnapshot>> entry : userFutures.entrySet()) {
            User user = entry.getValue().get().toObject(User.class);
            userCache.put(entry.getKey(), user);
        }

        // Buscar dados do livro uma única vez
        DocumentSnapshot bookSnapshot = firestore.collection("books").document(bookId).get().get();
        Book book = bookSnapshot.toObject(Book.class);

        return reviews.stream()
                .map(review -> {
                    ReviewDTO dto = new ReviewDTO();
                    dto.setReviewId(review.getReviewId());
                    dto.setUserUid(review.getUserRef().getId());
                    dto.setBookId(review.getBookRef().getId());
                    dto.setRating(review.getRating());
                    dto.setReviewText(review.getReviewText());
                    dto.setDate(review.getDate());
                    dto.setLikeCount(review.getLikeCount());
                    dto.setSpoiler(review.isSpoiler());
                    dto.setUser(userCache.get(review.getUserRef().getId()));
                    dto.setBook(book);
                    return dto;
                })
                .toList();
    }

    public List<ReviewDTO> getReviewsByUserId(String userId) throws ExecutionException, InterruptedException, IOException {
        List<Review> reviews = reviewRepository.getReviewsByUserId(userId);

        // Otimização para buscar livros em lote
        Map<String, ApiFuture<DocumentSnapshot>> bookFutures = new HashMap<>();
        Firestore firestore = this.firestore.firestore();

        for (Review review : reviews) {
            String bookId = review.getBookRef().getId();
            if (!bookFutures.containsKey(bookId)) {
                bookFutures.put(bookId, firestore.collection("books").document(bookId).get());
            }
        }

        // Cache dos livros
        Map<String, Book> bookCache = new HashMap<>();
        for (Map.Entry<String, ApiFuture<DocumentSnapshot>> entry : bookFutures.entrySet()) {
            Book book = entry.getValue().get().toObject(Book.class);
            bookCache.put(entry.getKey(), book);
        }

        // Buscar dados do usuário uma única vez
        DocumentSnapshot userSnapshot = firestore.collection("users").document(userId).get().get();
        User user = userSnapshot.toObject(User.class);

        return reviews.stream()
                .map(review -> {
                    ReviewDTO dto = new ReviewDTO();
                    dto.setReviewId(review.getReviewId());
                    dto.setUserUid(review.getUserRef().getId());
                    dto.setBookId(review.getBookRef().getId());
                    dto.setRating(review.getRating());
                    dto.setReviewText(review.getReviewText());
                    dto.setDate(review.getDate());
                    dto.setLikeCount(review.getLikeCount());
                    dto.setSpoiler(review.isSpoiler());
                    dto.setUser(user);
                    dto.setBook(bookCache.get(review.getBookRef().getId()));
                    return dto;
                })
                .toList();
    }

    public boolean updateReview(ReviewDTO reviewDTO) throws ExecutionException, InterruptedException, IOException {
        //GAMBIARRA DO BRUNÃO:
        ReviewDTO existingReview = getReviewById(reviewDTO.getReviewId());
        if (existingReview == null) {
            return false;
        }

        Review review = convertToEntity(reviewDTO);
        review.setDateLastUpdated(Timestamp.now());
        review.setDate(existingReview.getDate());
        boolean updated = reviewRepository.updateReview(review);

        if (updated) {
            // Atualizar a média de avaliação e contador do livro
            updateBookRating(review.getBookRef().getId());
        }

        return updated;
    }

    public boolean deleteReview(String reviewId) throws ExecutionException, InterruptedException, IOException {
        // Obter a review antes de excluí-la para saber qual livro atualizar
        Review review = reviewRepository.getReviewById(reviewId);
        if (review == null) {
            return false;
        }

        String bookId = review.getBookRef().getId();
        boolean deleted = reviewRepository.deleteReview(reviewId);

        if (deleted) {
            // Atualizar a média de avaliação e contador do livro
            updateBookRating(bookId);
        }

        return deleted;
    }

    // Atualizar apenas o contador de likes
    public boolean incrementLikeCount(String reviewId) throws ExecutionException, InterruptedException, IOException {
        try {
            return reviewRepository.incrementLikeCount(reviewId);
        } catch (FirestoreException e) {
            // Log detalhado do erro
            System.err.println("Erro na transação do Firestore: " + e.getMessage());
            if (e.getMessage().contains("PERMISSION_DENIED")) {
                // Lidar com erros de permissão
                System.err.println("Erro de permissão ao atualizar documento");
            }
            throw e;
        }
    }

    public boolean toggleLike(String userUid, String reviewId) throws ExecutionException, InterruptedException, IOException {
        // Verifica se o like já existe
        Optional<Like> existingLike = likeRepository.findByUserUidAndReviewId(userUid, reviewId);

        if (existingLike.isPresent()) {
            // Remove o like se já existir
            likeRepository.removeLike(userUid, reviewId);
            return false; // Indica que o like foi removido
        } else {
            // Adiciona o like se não existir
            likeRepository.addLike(userUid, reviewId);
            return true; // Indica que o like foi adicionado
        }
    }

    // Métodos de conversão entre DTO e Entidade
    private Review convertToEntity(ReviewDTO dto) throws IOException {
        Review entity = new Review();
        entity.setReviewId(dto.getReviewId());

        // Criar referências para usuário e livro
        DocumentReference userRef = firestore.firestore().collection("users").document(dto.getUserUid());
        DocumentReference bookRef = firestore.firestore().collection("books").document(dto.getBookId());

        entity.setUserRef(userRef);
        entity.setBookRef(bookRef);
        entity.setRating(dto.getRating());
        entity.setReviewText(dto.getReviewText());
        entity.setDate(dto.getDate() != null ? dto.getDate() : Timestamp.now());
        entity.setLikeCount(dto.getLikeCount() != null ? dto.getLikeCount() : 0);
        entity.setSpoiler(dto.isSpoiler());
        entity.setDateLastUpdated(null);

        return entity;
    }

    private ReviewDTO convertToDTO(Review entity) throws ExecutionException, InterruptedException {
        ReviewDTO dto = new ReviewDTO();
        dto.setReviewId(entity.getReviewId());
        dto.setUserUid(entity.getUserRef().getId());
        dto.setBookId(entity.getBookRef().getId());
        dto.setRating(entity.getRating());
        dto.setReviewText(entity.getReviewText());
        dto.setDate(entity.getDate());
        dto.setLikeCount(entity.getLikeCount());
        dto.setSpoiler(entity.isSpoiler());

        User user = getUserFromReview(entity);
        Book book = getBookFromReview(entity);

        dto.setUser(user);
        dto.setBook(book);

        return dto;
    }

    private ReviewDTO convertToDTOAsync(Review entity) throws ExecutionException, InterruptedException {
        ReviewDTO dto = new ReviewDTO();
        dto.setReviewId(entity.getReviewId());
        dto.setUserUid(entity.getUserRef().getId());
        dto.setBookId(entity.getBookRef().getId());
        dto.setRating(entity.getRating());
        dto.setReviewText(entity.getReviewText());
        dto.setDate(entity.getDate());
        dto.setLikeCount(entity.getLikeCount());
        dto.setSpoiler(entity.isSpoiler());

        // Buscar dados em paralelo para melhor performance
        ApiFuture<DocumentSnapshot> userFuture = entity.getUserRef().get();
        ApiFuture<DocumentSnapshot> bookFuture = entity.getBookRef().get();

        // Aguardar ambas as consultas
        User user = userFuture.get().toObject(User.class);
        Book book = bookFuture.get().toObject(Book.class);

        dto.setUser(user);
        dto.setBook(book);

        return dto;
    }

    public List<ReviewDTO> getAllReviewsWithDetails() throws ExecutionException, InterruptedException, IOException {
        List<Review> reviews = reviewRepository.getAllReviews();

        // Buscar todos os usuários e livros únicos de uma vez
        Map<String, ApiFuture<DocumentSnapshot>> userFutures = new HashMap<>();
        Map<String, ApiFuture<DocumentSnapshot>> bookFutures = new HashMap<>();

        Firestore firestore = this.firestore.firestore();

        // Preparar todas as consultas
        for (Review review : reviews) {
            String userId = review.getUserRef().getId();
            String bookId = review.getBookRef().getId();

            if (!userFutures.containsKey(userId)) {
                userFutures.put(userId, firestore.collection("users").document(userId).get());
            }

            if (!bookFutures.containsKey(bookId)) {
                bookFutures.put(bookId, firestore.collection("books").document(bookId).get());
            }
        }

        // Aguardar todas as consultas e criar mapas de cache
        Map<String, User> userCache = new HashMap<>();
        Map<String, Book> bookCache = new HashMap<>();

        for (Map.Entry<String, ApiFuture<DocumentSnapshot>> entry : userFutures.entrySet()) {
            User user = entry.getValue().get().toObject(User.class);
            userCache.put(entry.getKey(), user);
        }

        for (Map.Entry<String, ApiFuture<DocumentSnapshot>> entry : bookFutures.entrySet()) {
            Book book = entry.getValue().get().toObject(Book.class);
            bookCache.put(entry.getKey(), book);
        }

        // Converter para DTOs usando o cache
        return reviews.stream()
                .map(review -> {
                    ReviewDTO dto = new ReviewDTO();
                    dto.setReviewId(review.getReviewId());
                    dto.setUserUid(review.getUserRef().getId());
                    dto.setBookId(review.getBookRef().getId());
                    dto.setRating(review.getRating());
                    dto.setReviewText(review.getReviewText());
                    dto.setDate(review.getDate());
                    dto.setLikeCount(review.getLikeCount());
                    dto.setSpoiler(review.isSpoiler());
                    dto.setUser(userCache.get(review.getUserRef().getId()));
                    dto.setBook(bookCache.get(review.getBookRef().getId()));
                    return dto;
                })
                .toList();
    }

    public User getUserFromReview(Review review) throws ExecutionException, InterruptedException {
        DocumentSnapshot userSnapshot = review.getUserRef().get().get();
        return userSnapshot.toObject(User.class);
    }

    public Book getBookFromReview(Review review) throws ExecutionException, InterruptedException {
        DocumentSnapshot bookSnapshot = review.getBookRef().get().get();
        return bookSnapshot.toObject(Book.class);
    }

}