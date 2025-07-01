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
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    //private final FirestoreConfig firestore;
    private final LikeRepository likeRepository;
    private final BookService bookService;

    public ReviewService(ReviewRepository reviewRepository, FirestoreConfig firestore, LikeRepository likeRepository1, BookService bookService) {
        this.reviewRepository = reviewRepository;
        //this.firestore = firestore;
        this.likeRepository = likeRepository1;
        this.bookService = bookService;

    }

    @CacheEvict(value = {"review-details", "reviews-paginated", "reviews-by-book", "reviews-by-user", "reviews-feed"}, allEntries = true)
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

        double relevanceScore = calculateRelevanceScore(average, count);

        // Atualizar o livro com AMBOS os campos
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference bookRef = firestore.collection("books").document(bookId);
        WriteBatch batch = firestore.batch();
        batch.update(bookRef, "averageRating", average);
        batch.update(bookRef, "ratingsCount", count);
        batch.update(bookRef, "relevanceScore", relevanceScore); // NOVA LINHA
        batch.commit().get();

        bookService.invalidateBookCache(bookId);
    }

    // CÁLCULO DE RELEVÂNCIA - Usa fórmula Bayesiana para ranking
    private double calculateRelevanceScore(Double averageRating, Integer ratingsCount) {
        double R = 3.0; // Rating médio assumido (escala 1-5)
        double W = 10.0; // Peso do prior (equivale a 10 ratings)

        if (averageRating == null) averageRating = 0.0;
        if (ratingsCount == null) ratingsCount = 0;

        return (W * R + ratingsCount * averageRating) / (W + ratingsCount);
    }

    @Cacheable(value = "reviews-paginated", key = "#lastReviewId + '_' + #pageSize")
    public List<ReviewDTO> getReviewsWithPagination(String lastReviewId, Integer pageSize)
            throws ExecutionException, InterruptedException, IOException {

        int actualPageSize = (pageSize != null && pageSize > 0) ? pageSize : 20;
        List<Review> reviews = reviewRepository.getReviewsWithPagination(lastReviewId, actualPageSize);

        return convertReviewsToDTOs(reviews);
    }

    @Cacheable(value = "reviews-feed", key = "#userId + '_' + #lastReviewId + '_' + #pageSize")
    public List<ReviewDTO> getFollowingFeed(String userId, String lastReviewId, Integer pageSize)
            throws ExecutionException, InterruptedException, IOException {

        long startTime = System.currentTimeMillis();
        System.out.println("[FEED] Starting optimized feed for userId: " + userId);

        List<String> followingUserIds = getFollowingUserIds(userId);
        System.out.println("[FEED] Found " + followingUserIds.size() + " followed users");

        if (followingUserIds.isEmpty()) {
            System.out.println("[FEED] No followed users");
            return new ArrayList<>();
        }

        if (followingUserIds.size() > 30) {
            followingUserIds = followingUserIds.subList(0, 30);
            System.out.println("[FEED] Limited to 30 users due to Firestore constraints");
        }

        Firestore firestore = FirestoreClient.getFirestore();
        int actualPageSize = (pageSize != null && pageSize > 0) ? pageSize : 20;

        List<DocumentReference> followingRefs = followingUserIds.stream()
                .map(id -> firestore.collection("users").document(id))
                .collect(Collectors.toList());

        Query query = firestore.collection("reviews")
                .whereIn("userRef", followingRefs)
                .orderBy("date", Query.Direction.DESCENDING)
                .limit(actualPageSize);

        int totalReads = 0;

        if (lastReviewId != null && !lastReviewId.isEmpty()) {
            System.out.println("[FEED] Using pagination cursor: " + lastReviewId);
            DocumentSnapshot lastDoc = firestore.collection("reviews")
                    .document(lastReviewId)
                    .get()
                    .get();
            totalReads++; // Count cursor read
            query = query.startAfter(lastDoc);
        }

        System.out.println("[FEED] Executing indexed query...");
        try {
            ApiFuture<QuerySnapshot> future = query.get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            totalReads += documents.size();

            System.out.println("[FEED] Query successful: " + documents.size() + " reviews");

            List<Review> reviews = documents.stream()
                    .map(doc -> doc.toObject(Review.class))
                    .collect(Collectors.toList());

            List<ReviewDTO> result = convertReviewsToDTOs(reviews);

            long endTime = System.currentTimeMillis();
            System.out.println("[FEED] TOTAL FIRESTORE READS: " + totalReads);
            System.out.println("[FEED] Execution time: " + (endTime - startTime) + "ms");
            System.out.println("[FEED] Returning " + result.size() + " reviews");

            return result;

        } catch (Exception e) {
            System.out.println("[FEED] Query failed: " + e.getMessage());

            if (e.getMessage().contains("index") || e.getMessage().contains("FAILED_PRECONDITION")) {
                System.out.println("[FEED] Index still propagating or incorrect structure");
                System.out.println("Expected: userRef (ASC) + date (DESC)");
            }

            throw e;
        }
    }

    private List<String> getFollowingUserIds(String userId) throws ExecutionException, InterruptedException, IOException {
        Firestore firestore = FirestoreClient.getFirestore();

        Query query = firestore.collection("user_relationships") // CORRECT collection
                .whereEqualTo("followerId", userId)
                .select("followingId");

        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        return documents.stream()
                .map(doc -> doc.getString("followingId"))
                .collect(Collectors.toList());
    }

    @Cacheable(value = "review-details", key = "#reviewId")
    public ReviewDTO getReviewById(String reviewId) throws ExecutionException, InterruptedException, IOException {
        Review review = reviewRepository.getReviewById(reviewId);
        return review != null ? convertToDTOAsync(review) : null;
    }

    @Cacheable(value = "reviews-by-book", key = "#bookId")
    public List<ReviewDTO> getReviewsByBookId(String bookId) throws ExecutionException, InterruptedException, IOException {
        List<Review> reviews = reviewRepository.getReviewsByBookId(bookId);

        Map<String, ApiFuture<DocumentSnapshot>> userFutures = new HashMap<>();
        Firestore firestore = FirestoreClient.getFirestore();

        for (Review review : reviews) {
            String userId = review.getUserRef().getId();
            if (!userFutures.containsKey(userId)) {
                userFutures.put(userId, firestore.collection("users").document(userId).get());
            }
        }

        Map<String, User> userCache = new HashMap<>();
        for (Map.Entry<String, ApiFuture<DocumentSnapshot>> entry : userFutures.entrySet()) {
            User user = entry.getValue().get().toObject(User.class);
            userCache.put(entry.getKey(), user);
        }

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
                    if (review.getDate() != null) {
                        Instant instant = Instant.ofEpochSecond(
                                review.getDate().getSeconds(),
                                review.getDate().getNanos()
                        );
                        dto.setDate(LocalDateTime.ofInstant(instant, ZoneId.systemDefault()));
                    }
                    dto.setLikeCount(review.getLikeCount());
                    dto.setSpoiler(review.isSpoiler());
                    dto.setUser(userCache.get(review.getUserRef().getId()));
                    dto.setBook(book);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Cacheable(value = "reviews-by-user", key = "#userId")
    public List<ReviewDTO> getReviewsByUserId(String userId) throws ExecutionException, InterruptedException, IOException {
        List<Review> reviews = reviewRepository.getReviewsByUserId(userId);

        // Otimização para buscar livros em lote
        Map<String, ApiFuture<DocumentSnapshot>> bookFutures = new HashMap<>();
        Firestore firestore = FirestoreClient.getFirestore();

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
                    if (review.getDate() != null) {
                        Instant instant = Instant.ofEpochSecond(
                                review.getDate().getSeconds(),
                                review.getDate().getNanos()
                        );
                        dto.setDate(LocalDateTime.ofInstant(instant, ZoneId.systemDefault()));
                    }
                    dto.setLikeCount(review.getLikeCount());
                    dto.setSpoiler(review.isSpoiler());
                    dto.setUser(user);
                    dto.setBook(bookCache.get(review.getBookRef().getId()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @CachePut(value = "review-details", key = "#reviewDTO.reviewId")
    @CacheEvict(value = {"reviews-paginated", "reviews-by-book", "reviews-by-user", "reviews-feed"}, allEntries = true)
    public ReviewDTO updateReview(ReviewDTO reviewDTO) throws ExecutionException, InterruptedException, IOException {
        //GAMBIARRA DO BRUNÃO:
        ReviewDTO existingReview = getReviewById(reviewDTO.getReviewId());
        if (existingReview == null) {
            return null;
        }

        Review review = convertToEntity(reviewDTO);
        review.setDateLastUpdated(Timestamp.now());

        if (existingReview.getDate() != null) {
            Instant instant = existingReview.getDate()
                    .atZone(ZoneId.systemDefault())
                    .toInstant();
            review.setDate(Timestamp.of(Date.from(instant)));
        }

        boolean updated = reviewRepository.updateReview(review);
        if (updated) {
            updateBookRating(review.getBookRef().getId());
            // RETORNA O DTO ATUALIZADO PARA O CACHE
            return reviewDTO;
        }

        return null;
    }

    @CacheEvict(value = {"review-details", "reviews-paginated", "reviews-by-book", "reviews-by-user", "reviews-feed"}, key = "#reviewId")
    public boolean deleteReview(String reviewId) throws ExecutionException, InterruptedException, IOException {
        Review review = reviewRepository.getReviewById(reviewId);
        if (review == null) {
            return false;
        }

        String bookId = review.getBookRef().getId();
        boolean deleted = reviewRepository.deleteReview(reviewId);

        if (deleted) {
            updateBookRating(bookId);
        }

        return deleted;
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

    // Métodos de conversão de Reviews de DTO e Entidade
    private Review convertToEntity(ReviewDTO dto) throws IOException {
        Review entity = new Review();
        entity.setReviewId(dto.getReviewId());

        // Criar referências para usuário e livro
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference userRef = firestore.collection("users").document(dto.getUserUid());
        DocumentReference bookRef = firestore.collection("books").document(dto.getBookId());

        entity.setUserRef(userRef);
        entity.setBookRef(bookRef);
        entity.setRating(dto.getRating());
        entity.setReviewText(dto.getReviewText());
        if (dto.getDate() != null) {
            // Converter LocalDateTime para Timestamp
            Instant instant = dto.getDate().atZone(ZoneId.systemDefault()).toInstant();
            entity.setDate(Timestamp.of(Date.from(instant)));
        } else {
            entity.setDate(Timestamp.now());
        }
        entity.setLikeCount(dto.getLikeCount() != null ? dto.getLikeCount() : 0);
        entity.setSpoiler(dto.isSpoiler());
        entity.setDateLastUpdated(null);

        return entity;
    }

    private List<ReviewDTO> convertReviewsToDTOs(List<Review> reviews)
            throws ExecutionException, InterruptedException, IOException {
        // Otimização para buscar usuários e livros em lote
        Map<String, ApiFuture<DocumentSnapshot>> userFutures = new HashMap<>();
        Map<String, ApiFuture<DocumentSnapshot>> bookFutures = new HashMap<>();
        Firestore firestore = FirestoreClient.getFirestore();

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

        return reviews.stream()
                .map(review -> {
                    ReviewDTO dto = new ReviewDTO();
                    dto.setReviewId(review.getReviewId());
                    dto.setUserUid(review.getUserRef().getId());
                    dto.setBookId(review.getBookRef().getId());
                    dto.setRating(review.getRating());
                    dto.setReviewText(review.getReviewText());
                    if (review.getDate() != null) {
                        Instant instant = Instant.ofEpochSecond(
                                review.getDate().getSeconds(),
                                review.getDate().getNanos()
                        );
                        dto.setDate(LocalDateTime.ofInstant(instant, ZoneId.systemDefault()));
                    }
                    dto.setLikeCount(review.getLikeCount());
                    dto.setSpoiler(review.isSpoiler());
                    dto.setUser(userCache.get(review.getUserRef().getId()));
                    dto.setBook(bookCache.get(review.getBookRef().getId()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    private ReviewDTO convertToDTOAsync(Review entity) throws ExecutionException, InterruptedException {
        ReviewDTO dto = new ReviewDTO();
        dto.setReviewId(entity.getReviewId());
        dto.setUserUid(entity.getUserRef().getId());
        dto.setBookId(entity.getBookRef().getId());
        dto.setRating(entity.getRating());
        dto.setReviewText(entity.getReviewText());
        if (entity.getDate() != null) {
            Instant instant = Instant.ofEpochSecond(
                    entity.getDate().getSeconds(),
                    entity.getDate().getNanos()
            );
            dto.setDate(LocalDateTime.ofInstant(instant, ZoneId.systemDefault()));
        }
        dto.setLikeCount(entity.getLikeCount());
        dto.setSpoiler(entity.isSpoiler());

        ApiFuture<DocumentSnapshot> userFuture = entity.getUserRef().get();
        ApiFuture<DocumentSnapshot> bookFuture = entity.getBookRef().get();

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

        Firestore firestore = FirestoreClient.getFirestore();

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
                    if (review.getDate() != null) {
                        Instant instant = Instant.ofEpochSecond(
                                review.getDate().getSeconds(),
                                review.getDate().getNanos()
                        );
                        dto.setDate(LocalDateTime.ofInstant(instant, ZoneId.systemDefault()));
                    }
                    dto.setLikeCount(review.getLikeCount());
                    dto.setSpoiler(review.isSpoiler());
                    dto.setUser(userCache.get(review.getUserRef().getId()));
                    dto.setBook(bookCache.get(review.getBookRef().getId()));
                    return dto;
                })
                .collect(Collectors.toList());
    }
}