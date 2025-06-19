import { useAppSelector } from "@app/store/rootReducer";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { listBookByGenre } from "@app/store/slices/BookByGenreSlice";
import * as S from "./styles";
import HorizontalBooksList from "../CommomComponents/HorizontalBooksList/HorizontalBooksList";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import React from "react";
import PrimaryHeader from "../CommomComponents/PrimaryHeader/PrimaryHeader";

const GENRES = [
  "Ficção",
  "Autoajuda",
  "Arquitetura",
  "Poesia",
  "Coleções literárias",
  "História",
  "Ciências sociais",
];

const BooksScreen: FC = () => {
  const dispatch = useDispatch();
  const { booksByGenre, isLoading } = useAppSelector(
    (state) => state.bookByGenreSlice
  );

  useEffect(() => {
    GENRES.forEach((genre) => {
      if (!booksByGenre[genre] && !isLoading[genre]) {
        dispatch(listBookByGenre({ genre }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booksByGenre, isLoading]);

  return (
    <>
      <GlobalStyle />
      <S.Container>
        <PrimaryHeader activeScreen="Books" title="Livros"/>
        <S.Body>
          {GENRES.map((genre) => (
            <React.Fragment key={genre}>
              <h3>{genre}</h3>
              <HorizontalBooksList
                books={booksByGenre[genre]}
                isLoading={isLoading[genre]}
              />
            </React.Fragment>
          ))}
        </S.Body>
      </S.Container>
    </>
  );
};

export default BooksScreen;
