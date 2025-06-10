import { Review } from "@app/store/slices/ReviewsSlice/types";
import * as S from "./styles";
import { FC } from "react";

interface RatingsBarsProps {
  bookRating: number;
  reviews: Review[];
}
const RatingsBars: FC<RatingsBarsProps> = ({ reviews }) => {
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const bookRating = Math.round(totalRating / (reviews.length || 1));

  const ratingCounts: Record<number, number> = [5, 4, 3, 2, 1, 0].reduce(
    (acc, value) => {
      acc[value] = reviews.filter((r) => Math.floor(r.rating) === value).length;
      return acc;
    },
    {} as Record<number, number>
  );

  const reviewsCount = reviews.length;

  return (
    <S.RatingSection>
      <S.RatingTitle>Avaliações</S.RatingTitle>
      <S.RatingValue>{bookRating}</S.RatingValue>
      <S.RatingStars>
        {[1, 2, 3, 4, 5].map((star) => (
          <S.Star
            key={star}
            filled={star <= Math.floor(bookRating)}
            half={
              star === Math.ceil(bookRating) && !Number.isInteger(bookRating)
            }
          />
        ))}
      </S.RatingStars>
      <S.RatingGraph>
        {[5, 4, 3, 2, 1, 0].map((value) => (
          <S.RatingBar key={value}>
            <S.RatingBarValue>{value}</S.RatingBarValue>
            <S.RatingBarGraph>
              <S.RatingBarFill
                width={
                  reviewsCount ? (ratingCounts[value] / reviewsCount) * 100 : 0
                }
                value={value}
              />
            </S.RatingBarGraph>
            <span style={{ marginLeft: 8 }}>{ratingCounts[value]}</span>
          </S.RatingBar>
        ))}
      </S.RatingGraph>
    </S.RatingSection>
  );
};

export default RatingsBars;
