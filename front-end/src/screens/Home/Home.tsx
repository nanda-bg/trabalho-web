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

  const { books } = useAppSelector((state) => state.bookSlice);

  useEffect(() => {
    dispatch(listBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const popularBooks = [...books]
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 20);

  return (
    <>
      <GlobalStyle />
      <S.AppContainer>
        <Header />

        <S.MainContent>
          <WelcomeCard />

          <S.SectionTitle>Livros populares</S.SectionTitle>
          {books && <HorizontalBooksList books={popularBooks} />}

          <S.SectionTitle>Avaliações de amigos</S.SectionTitle>

          {/* {mockedReviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))} */}
        </S.MainContent>
      </S.AppContainer>
    </>
  );
}
