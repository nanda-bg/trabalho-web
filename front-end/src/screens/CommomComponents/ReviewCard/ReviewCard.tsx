import * as S from "./styles";
import Header from "./components/Header/Header";
import { type FC, useState } from "react";
import { AlertTriangle, Eye } from "lucide-react";
import { Review } from "@app/store/slices/ReviewsSlice/types";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  const [showSpoiler, setShowSpoiler] = useState(!review.spoiler);

  const handleShowSpoiler = () => {
    setShowSpoiler(true);
  };

  return (
    <S.ReviewCard>
      <Header createdAt={review.date} user={review.user} />
      <S.InfoContainer>
        <S.BookCover
          src={review.book?.coverUrl}
          alt={`Cover of the book ${review.book?.title}`}
        />

        <S.ReviewInfo>
          <div>
            <S.BookTitle>{review.book?.title}</S.BookTitle>

            <S.Rating>
              {[1, 2, 3, 4, 5].map((star) => (
                <S.Star
                  key={star}
                  filled={star <= Math.floor(review.rating)}
                  half={
                    star === Math.ceil(review.rating) &&
                    !Number.isInteger(review.rating)
                  }
                />
              ))}
            </S.Rating>
          </div>

          {review.spoiler && !showSpoiler && (
            <S.SpoilerContainer>
              <S.SpoilerAlert>
                <AlertTriangle size={16} />
                <span>Este comentário contém spoilers</span>
              </S.SpoilerAlert>
              <S.SpoilerButton onClick={handleShowSpoiler}>
                <Eye size={14} />
                <span>Mostrar mesmo assim</span>
              </S.SpoilerButton>
            </S.SpoilerContainer>
          )}

          <S.ReviewContent spoiler={!showSpoiler}>
            {review.reviewText}
          </S.ReviewContent>
        </S.ReviewInfo>
      </S.InfoContainer>
    </S.ReviewCard>
  );
};

export default ReviewCard;
