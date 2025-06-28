import { FC, useEffect, useRef, useState } from "react";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import * as S from "./styles";
import BookListItem from "../CommomComponents/HorizontalBooksList/components/BookListItem/BookListItem";
import { useAppSelector } from "@app/store/rootReducer";
import { useDispatch } from "react-redux";
import PrimaryHeader from "../CommomComponents/PrimaryHeader/PrimaryHeader";
import {
  listReadingListBooks,
  resetReadingListSlice,
} from "@app/store/slices/ReadingListSlice";

const ReadingListScreen: FC = () => {
  const dispatch = useDispatch();

  const { readingListBooks, isLoading } = useAppSelector(
    (state) => state.readingListSlice
  );

  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filteredBooks = activeGenre
    ? readingListBooks?.filter((book) => book.genre === activeGenre)
    : readingListBooks;

  const genres = Array.from(
    new Set(readingListBooks.flatMap((book) => book.genre))
  );

  const containerRef = useRef(null);
  const lastBookRef = useRef(null);

  const [hasCalledListEnd, setHasCalledListEnd] = useState(false);

  const onListEnd = () => {
    if (!hasCalledListEnd) {
      dispatch(listReadingListBooks({}));
      setHasCalledListEnd(true);
    }
  };

  useEffect(() => {
    setHasCalledListEnd(false);
  }, [readingListBooks.length]);

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
  }, [readingListBooks, hasCalledListEnd, lastBookRef.current]);

  useEffect(() => {
    dispatch(listReadingListBooks({ reset: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetReadingListSlice());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GlobalStyle />
      <S.Container ref={containerRef}>
        <PrimaryHeader title={"Lista de Leitura"} activeScreen="ReadingList" />

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
        <S.NoReadingListMessage>
          Você ainda não tem livros na sua lista de leitura.
        </S.NoReadingListMessage>
      )}
      </S.Container>
    </>
  );
};

export default ReadingListScreen;