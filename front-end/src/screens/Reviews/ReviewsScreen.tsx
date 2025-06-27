import { useAppSelector } from "@app/store/rootReducer";
import * as S from "./styles";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import ReviewCard from "../CommomComponents/ReviewCard/ReviewCard";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { listReviewsByBook } from "@app/store/slices/ReviewsByBookSlice";
import SecondaryHeader from "../CommomComponents/SecondaryHeader/SecondaryHeader";

export default function ReviewsScreen() {
  const dispatch = useDispatch();
  const { reviewsByBook } = useAppSelector((state) => state.reviewsByBookSlice);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    dispatch(listReviewsByBook({ bookId: id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GlobalStyle />
      <S.Container>
        <SecondaryHeader title="Avaliações" />
        <S.ReviewsContainer>
          {reviewsByBook?.map((review) => (
            <ReviewCard review={review} key={review.reviewId} />
          ))}
        </S.ReviewsContainer>
      </S.Container>
    </>
  );
}
