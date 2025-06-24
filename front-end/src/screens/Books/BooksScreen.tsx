import { useAppSelector } from "@app/store/rootReducer";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  listBookByGenre,
  resetBookByGenreSlice,
} from "@app/store/slices/BookByGenreSlice";
import * as S from "./styles";
import HorizontalBooksList from "../CommomComponents/HorizontalBooksList/HorizontalBooksList";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import React from "react";
import PrimaryHeader from "../CommomComponents/PrimaryHeader/PrimaryHeader";

const GENRES = [
  "Ficção",
  "Ficção juvenil",
  "Autoajuda",
  "Poesia",
  "Coleções literárias",
  "Biografia e autobiografia",
  "História",
  "Ciências sociais",
];

const BooksScreen: FC = () => {
  const dispatch = useDispatch();
  const { booksByGenre, hasMore, isLoading } = useAppSelector(
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

  const onHorizontalListEnd = (genre) => {
    if (!hasMore[genre]) return;

    dispatch(listBookByGenre({ genre }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetBookByGenreSlice());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GlobalStyle />
      <S.Container>
        <PrimaryHeader activeScreen="Books" title="Livros" />
        <S.Body>
          {GENRES.map((genre) => {
            if (
              (booksByGenre[genre] && booksByGenre[genre].length > 0) ||
              isLoading[genre]
            ) {
              return (
                <React.Fragment key={genre}>
                  <h3>{genre}</h3>
                  <HorizontalBooksList
                    books={booksByGenre[genre]}
                    isLoading={isLoading[genre]}
                    onEndReached={() => onHorizontalListEnd(genre)}
                  />
                </React.Fragment>
              );
            }
            return null;
          })}
        </S.Body>
      </S.Container>
    </>
  );
};

export default BooksScreen;
