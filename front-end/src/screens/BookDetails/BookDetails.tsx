import { FC, useEffect, useState } from "react";
import { BookOpen, Heart } from "lucide-react";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import * as S from "./styles";
import HorizontalBooksList from "../CommomComponents/HorizontalBooksList/HorizontalBooksList";
import { useParams } from "react-router-dom";
import Header from "./components/Header/Header";
import { useAppSelector } from "@app/store/rootReducer";
import RatingsBars from "./components/RatingBars/RatingsBar";
import DetailsSection from "./components/DetailsSection/DetailsSection";
import ReviewsSection from "./components/ReviewsSection/ReviewsSection";
import { useDispatch } from "react-redux";
import { listReviewsByBook } from "@app/store/slices/ReviewsSlice";
import {
  getBookDetails,
  resetBookDetailsSlice,
} from "@app/store/slices/BookDetailsSlice";
import SecondaryHeader from "../CommomComponents/SecondaryHeader/SecondaryHeader";
import { listBookByGenre } from "@app/store/slices/BookByGenreSlice";
import LoadingAnimation from "../CommomComponents/LoadingAnimation/LoadingAnimation";
import {
  checkIsBookFavorite,
  addBookToFavorites,
  removeBookFromFavorites,
} from "@app/store/slices/FavoriteBooksSlice";
import {
  checkIsBookInReadingList,
  addBookToReadingList,
  removeBookFromReadingList,
} from "@app/store/slices/ReadingListSlice";

const BookDetails: FC = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { selectedBook, isLoading } = useAppSelector(
    (state) => state.bookDetailsSlice
  );

  const { booksByGenre, isLoading: isLoadingBooksByGenre } = useAppSelector(
    (state) => state.bookByGenreSlice
  );

  const { reviews } = useAppSelector((state) => state.reviewSlice);

  const { isSelectedBookFavorite } = useAppSelector(
    (state) => state.favoriteBooksSlice
  );

  const { isSelectedBookInReadingList } = useAppSelector(
    (state) => state.readingListSlice
  );

  const [activeTab, setActiveTab] = useState<"summary" | "details" | "reviews">(
    "summary"
  );

  useEffect(() => {
    dispatch(getBookDetails({ uid: id }));
    dispatch(listReviewsByBook({ bookId: id }));
    dispatch(checkIsBookFavorite({ bookId: id }));
    dispatch(checkIsBookInReadingList({ bookId: id }));

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (selectedBook && !isLoading) {
      dispatch(listBookByGenre({ genre: selectedBook.genre }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBook, isLoading]);

  const handleAddBookToFavorites = () => {
    if (!selectedBook) return;
    dispatch(addBookToFavorites({ bookId: selectedBook.bookId }));
  };

  const handleRemoveBookFromFavorites = () => {
    if (!selectedBook) return;
    dispatch(removeBookFromFavorites({ bookId: selectedBook.bookId }));
  };

  const handleAddBookToReadingList = () => {
    if (!selectedBook) return;
    dispatch(addBookToReadingList({ bookId: selectedBook.bookId }));
  };

  const handleRemoveBookFromReadingList = () => {
    if (!selectedBook) return;
    dispatch(removeBookFromReadingList({ bookId: selectedBook.bookId }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetBookDetailsSlice());
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <S.Container>
        <SecondaryHeader title="Detalhes" />

        <LoadingAnimation active={isLoading} />

        {!selectedBook && !isLoading && (
          <S.NoBookMessage>
            Livro indisponivel ou não encontrado, por favor verifique o ID do
            livro ou tente novamente mais tarde.
          </S.NoBookMessage>
        )}

        {selectedBook && !isLoading && (
          <S.DetailsContainer>
            <Header bookDetails={selectedBook} />

            <S.ActionButtons>
              <S.ActionButton 
                $primary
                onClick={
                  isSelectedBookInReadingList
                    ? handleRemoveBookFromReadingList
                    : handleAddBookToReadingList
                }
              >
                <BookOpen 
                  size={16}
                />
                {isSelectedBookInReadingList 
                  ? "Remover da lista de leituras" 
                  : "Adicionar a lista de leituras"
                }
              </S.ActionButton>
              <S.ActionButton
                onClick={
                  isSelectedBookFavorite
                    ? handleRemoveBookFromFavorites
                    : handleAddBookToFavorites
                }
              >
                <Heart
                  size={16}
                  color={isSelectedBookFavorite ? "#ff0080" : undefined}
                  fill={isSelectedBookFavorite ? "#ff0080" : "none"}
                />
                Favoritar
              </S.ActionButton>
            </S.ActionButtons>

            {reviews && (
              <RatingsBars
                bookRating={selectedBook.averageRating}
                reviews={reviews}
              />
            )}

            <S.TabsContainer>
              <S.Tab
                active={activeTab === "summary"}
                onClick={() => setActiveTab("summary")}
              >
                Descrição
              </S.Tab>
              <S.Tab
                active={activeTab === "details"}
                onClick={() => setActiveTab("details")}
              >
                Detalhes
              </S.Tab>
              <S.Tab
                active={activeTab === "reviews"}
                onClick={() => setActiveTab("reviews")}
              >
                Avaliações
              </S.Tab>
            </S.TabsContainer>

            <S.TabContent>
              {activeTab === "summary" && (
                <div>
                  <p>{selectedBook.description}</p>
                </div>
              )}

              {activeTab === "details" && (
                <DetailsSection selectedBook={selectedBook} />
              )}

              {activeTab === "reviews" && <ReviewsSection reviews={reviews} />}
            </S.TabContent>

            {(isLoadingBooksByGenre[selectedBook.genre] ||
              booksByGenre[selectedBook.genre]) && (
              <S.RecommendedSection>
                <S.RecommendedHeader>
                  <S.RecommendedTitle>Recomendados</S.RecommendedTitle>
                </S.RecommendedHeader>

                <HorizontalBooksList
                  books={booksByGenre[selectedBook.genre]}
                  isLoading={isLoadingBooksByGenre[selectedBook.genre]}
                />
              </S.RecommendedSection>
            )}
          </S.DetailsContainer>
        )}
      </S.Container>
    </>
  );
};

export default BookDetails;
