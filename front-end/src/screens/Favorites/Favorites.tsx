import { FC, useEffect, useRef, useState } from "react";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import * as S from "./styles";
import BookListItem from "../CommomComponents/HorizontalBooksList/components/BookListItem/BookListItem";
import { useAppSelector } from "@app/store/rootReducer";
import { useDispatch } from "react-redux";
import PrimaryHeader from "../CommomComponents/PrimaryHeader/PrimaryHeader";
import {
  listFavoriteBooks,
  resetFavoriteBooksSlice,
} from "@app/store/slices/FavoriteBooksSlice";

const FavoriteBooks: FC = () => {
  const dispatch = useDispatch();

  const { favoriteBooks, isLoading } = useAppSelector(
    (state) => state.favoriteBooksSlice
  );

  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filteredBooks = activeGenre
    ? favoriteBooks?.filter((book) => book.genre === activeGenre)
    : favoriteBooks;

  const genres = Array.from(
    new Set(favoriteBooks.flatMap((book) => book.genre))
  );

  const containerRef = useRef(null);
  const lastBookRef = useRef(null);

  const [hasCalledListEnd, setHasCalledListEnd] = useState(false);

  const onListEnd = () => {
    if (!hasCalledListEnd) {
      dispatch(listFavoriteBooks());
      setHasCalledListEnd(true);
    }
  };

  useEffect(() => {
    setHasCalledListEnd(false);
  }, [favoriteBooks.length]);

  useEffect(() => {
    if (!lastBookRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasCalledListEnd) {
          onListEnd();
        }
      },
      { root: containerRef.current }
    );

    observer.observe(lastBookRef.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteBooks, hasCalledListEnd, lastBookRef.current]);

  useEffect(() => {
    dispatch(listFavoriteBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetFavoriteBooksSlice());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GlobalStyle />
      <S.Container ref={containerRef}>
        <PrimaryHeader title={"Livros Favoritos"} activeScreen="Favorites" />

        <S.GenreFilter>
          {genres.map((genre) => (
            <S.GenreButton
              key={genre}
              active={activeGenre === genre}
              onClick={() =>
                setActiveGenre(activeGenre === genre ? null : genre)
              }
            >
              {genre}
            </S.GenreButton>
          ))}
        </S.GenreFilter>

        <S.BookGrid>
          {filteredBooks.map((book, index) => {
            const isLastBook = index === filteredBooks.length - 1;
            return (
              <div key={book.bookId} ref={isLastBook ? lastBookRef : null}>
                <BookListItem book={book} />
              </div>
            );
          })}
        </S.BookGrid>
        {isLoading && <S.LoadingSpinner />}

        {filteredBooks.length === 0 && !isLoading && (
          <S.NoFavoritesMessage>
            Você ainda não tem livros favoritos.
          </S.NoFavoritesMessage>
        )}
      </S.Container>
    </>
  );
};

export default FavoriteBooks;
