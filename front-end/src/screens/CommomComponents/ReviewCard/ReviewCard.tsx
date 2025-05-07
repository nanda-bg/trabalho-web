import * as S from "./styles";
import Header from "./components/Header/Header";
import { Review } from "@app/types/Review";
import { FC } from "react";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: FC<ReviewCardProps> = ({review}) => {
  return (
    <S.ReviewCard>
      <Header createdAt={review.createdAt} user={review.user} />
      <S.InfoContainer>
          <S.BookCover src={new URL(review.book.coverUrl).toString()} alt={`Cover of the book ${review.book.title}`} />

        <S.ReviewInfo>
          <div>
            <S.BookTitle>{review.book.title}</S.BookTitle>

            <S.Rating>
              <S.RatingText>★★★★★</S.RatingText>
            </S.Rating>
          </div>

          <S.ReviewContent>{review.comment}</S.ReviewContent>
        </S.ReviewInfo>
      </S.InfoContainer>
    </S.ReviewCard>
  );
};

export default ReviewCard;
