"use client";

import { FC, useState } from "react";
import { BookOpen, Heart, ArrowLeft } from "lucide-react";
import { bookDetails } from "@app/utils/mocks/MockedBookDetails";
import { recommendedBooks } from "@app/utils/mocks/MockedRecommendedBooks";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import * as S from "./styles";
import ReviewCard from "../CommomComponents/ReviewCard/ReviewCard";
import HorizontalBooksList from "../CommomComponents/HorizontalBooksList/HorizontalBooksList";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import RatingsBars from "./components/RatingBars/RatingsBar";

const BookDetails: FC = () => {
  const navigation = useNavigate();
  const [activeTab, setActiveTab] = useState<"summary" | "details" | "reviews">(
    "summary"
  );

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
          <S.HeaderTitle>Book Details</S.HeaderTitle>
        </S.Header>

        <Header bookDetails={bookDetails}/>

        <S.ActionButtons>
          <S.ActionButton $primary>
            <BookOpen size={16} />
            Add to Reading List
          </S.ActionButton>
          <S.ActionButton>
            <Heart size={16} />
            Favorite
          </S.ActionButton>
        </S.ActionButtons>

        <RatingsBars book={bookDetails} />

        <S.TabsContainer>
          <S.Tab
            active={activeTab === "summary"}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </S.Tab>
          <S.Tab
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
          >
            Details
          </S.Tab>
          <S.Tab
            active={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </S.Tab>
        </S.TabsContainer>

        <S.TabContent>
          {activeTab === "summary" && (
            <div>
              <p>{bookDetails.description}</p>
            </div>
          )}

          {activeTab === "details" && (
            <div>
              <p>
                <strong>Author(s):</strong> {bookDetails.authors.join(", ")}
              </p>
              <p>
                <strong>Published:</strong> {bookDetails.year}
              </p>
              <p>
                <strong>Pages:</strong> {bookDetails.pages}
              </p>
              <p>
                <strong>Genres:</strong> {bookDetails.genres.join(", ")}
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <S.ReviewsSection>
              <S.ReviewsHeader>
                <S.ReviewsTitle>All Reviews</S.ReviewsTitle>
                <S.SeeAllLink href="#">See All</S.SeeAllLink>
              </S.ReviewsHeader>

              {bookDetails.reviews.map((review) => (
                <ReviewCard review={review} />
              ))}
            </S.ReviewsSection>
          )}
        </S.TabContent>

        <S.RecommendedSection>
          <S.RecommendedHeader>
            <S.RecommendedTitle>Recommended Books</S.RecommendedTitle>
            <S.SeeAllLink href="#">See All</S.SeeAllLink>
          </S.RecommendedHeader>

          <HorizontalBooksList books={recommendedBooks} />
        </S.RecommendedSection>
      </S.Container>
    </>
  );
};

export default BookDetails;
