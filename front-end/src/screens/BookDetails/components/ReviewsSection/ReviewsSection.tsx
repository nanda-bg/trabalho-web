import * as S from "./styles";
import { type FC } from "react";
import { Review } from "@app/store/slices/ReviewsSlice/types";
import ReviewCard from "@app/screens/CommomComponents/ReviewCard/ReviewCard";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection: FC<ReviewsSectionProps> = ({ reviews }) => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const onSeeAllClick = () => {
    navigate(`/reviews/${id}`);
  };

  if (!reviews || reviews.length === 0) {
    return (
      <S.NoReviewsMessage>
        Esse livro ainda não possui avaliações.
      </S.NoReviewsMessage>
    );
  }

  return (
    <S.ReviewsSection>
      {reviews.length > 3 && (
        <S.SeeAllContainer>
          <S.SeeAll onClick={onSeeAllClick}>Ver todas as avaliações</S.SeeAll>
        </S.SeeAllContainer>
      )}
      {reviews.slice(0, 3).map((review) => (
        <ReviewCard key={review.reviewId} review={review} />
      ))}
    </S.ReviewsSection>
  );
};

export default ReviewsSection;
