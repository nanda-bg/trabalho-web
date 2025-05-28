import * as S from "./styles";

const RatingsBars = ({ book }) => {
  const ratingCounts: Record<number, number> = [5, 4, 3, 2, 1].reduce(
    (acc, value) => {
      acc[value] = book.reviews.filter((r) => r.rating === value).length;
      return acc;
    },
    {}
  );

  const reviewsCount = book.reviews.length;

  return (
    <S.RatingSection>
      <S.RatingTitle>Avaliações</S.RatingTitle>
      <S.RatingValue>{book.rating}</S.RatingValue>
      <S.RatingStars>
        {[1, 2, 3, 4, 5].map((star) => (
          <S.Star
            key={star}
            filled={star <= Math.floor(book.rating)}
            half={
              star === Math.ceil(book.rating) && !Number.isInteger(book.rating)
            }
          />
        ))}
      </S.RatingStars>
      <S.RatingGraph>
        {[5, 4, 3, 2, 1].map((value) => (
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
