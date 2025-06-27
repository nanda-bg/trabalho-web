import HorizontalBooksList from "../CommomComponents/HorizontalBooksList/HorizontalBooksList";
import WelcomeCard from "./components/WelcomeCard/WelcomeCard";
import * as S from "./styles";
import { useEffect } from "react";
import { useAppSelector } from "@app/store/rootReducer";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import { useDispatch } from "react-redux";
import { listBooks, resetBookSlice } from "@app/store/slices/BooksSlice";
import PrimaryHeader from "../CommomComponents/PrimaryHeader/PrimaryHeader";
import { listReviews, resetReviewsSlice } from "@app/store/slices/ReviewsSlice";
import ReviewCard from "../CommomComponents/ReviewCard/ReviewCard";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const { books, isLoading, hasMore } = useAppSelector(
    (state) => state.bookSlice
  );
  const { reviews } = useAppSelector((state) => state.reviewsSlice);

  useEffect(() => {
    dispatch(listBooks());
    dispatch(listReviews());

    return () => {
      dispatch(resetBookSlice());
      dispatch(resetReviewsSlice());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHorizontalListEnd = () => {
    if (!hasMore) return;

    dispatch(listBooks());
  };

  return (
    <>
      <GlobalStyle />
      <S.AppContainer>
        <PrimaryHeader activeScreen="Home" />

        <S.MainContent>
          <WelcomeCard />

          <S.SectionTitle>Livros populares</S.SectionTitle>
          {books && (
            <HorizontalBooksList
              books={books}
              onEndReached={onHorizontalListEnd}
              isLoading={isLoading}
            />
          )}

          <S.SectionTitle>Avaliações recentes</S.SectionTitle>

          {reviews && (
            <S.ReviewsContainer>
              {reviews.map((review) => (
                <ReviewCard review={review} key={review.reviewId} />
              ))}
            </S.ReviewsContainer>
          )}
        </S.MainContent>
      </S.AppContainer>
    </>
  );
}
