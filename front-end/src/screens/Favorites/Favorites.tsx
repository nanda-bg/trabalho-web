import type React from "react";
import { FC, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import BookListItem from "../CommomComponents/HorizontalBooksList/components/BookListItem/BookListItem";
import { useAppSelector } from "@app/store/rootReducer";
import { useDispatch } from "react-redux";
import { listBooks } from "@app/store/slices/BooksSlice";

const FavoriteBooks: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  
  const { books } = useAppSelector((state) => state.bookSlice);

  useEffect(() => {
    dispatch(listBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filteredBooks = activeGenre
    ? books?.filter((book) => book.genres.some((genre) => genre === activeGenre))
    : books;

  const genres = Array.from(new Set(books.flatMap((book) => book.genres)));

  const handleGoBack = () => {
    navigation(-1);
  };

  return (
    <>
      <GlobalStyle />
      <S.Container>
        <S.Header>
          <S.SaveButton onClick={handleGoBack}>
            <ArrowLeft size={20} />
          </S.SaveButton>
          <S.HeaderTitle>Livros Favoritos</S.HeaderTitle>
        </S.Header>

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
          <S.RecommendationScroll>
            {books.slice(0, 3).map((book) => (
              <S.RecommendationCard key={book.bookId}>
                <S.RecommendationCover src={book.coverUrl} alt={book.title} />
                <S.RecommendationTitle>{book.title}</S.RecommendationTitle>
                <S.RecommendationAuthor>
                  {book.authors.join(", ")}
                </S.RecommendationAuthor>
              </S.RecommendationCard>
            ))}
          </S.RecommendationScroll>
        </S.RecommendationSection>
      </S.Container>
    </>
  );
};

export default FavoriteBooks;
