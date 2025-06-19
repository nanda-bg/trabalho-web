import { FC, useEffect, useState } from "react";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import * as S from "./styles";
import BookListItem from "../CommomComponents/HorizontalBooksList/components/BookListItem/BookListItem";
import { useAppSelector } from "@app/store/rootReducer";
import { useDispatch } from "react-redux";
import { listBooks } from "@app/store/slices/BooksSlice";
import PrimaryHeader from "../CommomComponents/PrimaryHeader/PrimaryHeader";
import HorizontalBooksList from "../CommomComponents/HorizontalBooksList/HorizontalBooksList";

const FavoriteBooks: FC = () => {
  const dispatch = useDispatch();
  
  const { books } = useAppSelector((state) => state.bookSlice);

  useEffect(() => {
    dispatch(listBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filteredBooks = activeGenre
    ? books?.filter((book) => book.genre === activeGenre)
    : books;

  const genres = Array.from(new Set(books.flatMap((book) => book.genre)));

  return (
    <>
      <GlobalStyle />
      <S.Container>

        <PrimaryHeader title={"Livros Favoritos"} activeScreen="Favorites"/>

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

        <S.StatsSection>
          <S.StatCard>
            <S.StatValue>{books.length}</S.StatValue>
            <S.StatLabel>Livros Favoritos</S.StatLabel>
          </S.StatCard>
          <S.StatCard>
            <S.StatValue>
              {(
                books.reduce((acc, book) => acc + book.averageRating, 0) / books.length
              ).toFixed(1)}
            </S.StatValue>
            <S.StatLabel>Média de Avaliação</S.StatLabel>
          </S.StatCard>
        </S.StatsSection>

        <S.BookGrid>
          {filteredBooks.map((book) => (
            <BookListItem key={book.bookId} book={book} />
          ))}
        </S.BookGrid>

        <S.RecommendationSection>
          <S.SectionTitle>Baseado nos seus favoritos</S.SectionTitle>
          <HorizontalBooksList books={books.slice(0, 3)}/>
        </S.RecommendationSection>
      </S.Container>
    </>
  );
};

export default FavoriteBooks;
