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
import { getBookDetails } from "@app/store/slices/BookDetailsSlice";
import SecondaryHeader from "../CommomComponents/SecondaryHeader/SecondaryHeader";

const BookDetails: FC = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { selectedBook, isLoading } = useAppSelector(
    (state) => state.bookDetailsSlice
  );
  const { books } = useAppSelector((state) => state.bookSlice);
  const { reviews } = useAppSelector((state) => state.reviewSlice);

  const [activeTab, setActiveTab] = useState<"summary" | "details" | "reviews">(
    "summary"
  );

  useEffect(() => {
    dispatch(getBookDetails({ uid: id }));
    dispatch(listReviewsByBook({ bookId: id }));

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!selectedBook) {
    return <div>Não rolou</div>;
  }

  return (
    <>
      <GlobalStyle />
      <S.Container>
        <SecondaryHeader title="Detalhes" />

        <S.DetailsContainer>
          <Header bookDetails={selectedBook} />

          <S.ActionButtons>
            <S.ActionButton $primary>
              <BookOpen size={16} />
              Adicionar a lista de leituras
            </S.ActionButton>
            <S.ActionButton>
              <Heart size={16} />
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

          <S.RecommendedSection>
            <S.RecommendedHeader>
              <S.RecommendedTitle>Recomendados</S.RecommendedTitle>
              <S.SeeAllLink href="#">Ver mais</S.SeeAllLink>
            </S.RecommendedHeader>

            {books && <HorizontalBooksList books={books} />}
          </S.RecommendedSection>
        </S.DetailsContainer>
      </S.Container>
    </>
  );
};

export default BookDetails;
