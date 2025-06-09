import { useAppSelector } from "@app/store/rootReducer";
import * as S from "./styles";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import ReviewCard from "../CommomComponents/ReviewCard/ReviewCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { listReviewsByBook } from "@app/store/slices/ReviewsSlice";
import { ArrowLeft } from "lucide-react";

export default function ReviewsScreen() {
  const dispatch = useDispatch();
  const { reviews } = useAppSelector((state) => state.reviewSlice);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    dispatch(listReviewsByBook({ bookId: id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <>
      <GlobalStyle />
      <S.AppContainer>
        <S.Header>
          <S.GoBack onClick={handleGoBack}>
            <ArrowLeft size={20} />
          </S.GoBack>
          <S.HeaderTitle>Avaliações</S.HeaderTitle>
        </S.Header>

        {reviews?.map((review) => (
          <ReviewCard review={review} key={review.reviewId} />
        ))}
      </S.AppContainer>
    </>
  );
}
