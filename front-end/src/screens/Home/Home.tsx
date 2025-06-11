import Header from "./components/Header/Header";
import HorizontalBooksList from "../CommomComponents/HorizontalBooksList/HorizontalBooksList";
import WelcomeCard from "./components/WelcomeCard/WelcomeCard";
import * as S from "./styles";
import { useEffect } from "react";
import { useAppSelector } from "@app/store/rootReducer";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import { useDispatch } from "react-redux";
import { listBooks } from "@app/store/slices/BooksSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const { books, isLoading } = useAppSelector((state) => state.bookSlice);

  useEffect(() => {
    if (books.length > 0) return;

    dispatch(listBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHorizontalListEnd = () => {
    dispatch(listBooks());
  };

  return (
    <>
      <GlobalStyle />
      <S.AppContainer>
        <Header />

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

          <S.SectionTitle>Avaliações de amigos</S.SectionTitle>

          {/* {mockedReviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))} */}
        </S.MainContent>
      </S.AppContainer>
    </>
  );
}
