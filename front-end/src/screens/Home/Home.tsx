import { mockedReviews } from "@app/utils/mocks/MockedReview";
import Header from "./components/Header/Header";
import HorizontalBooksList from "../CommomComponents/HorizontalBooksList/HorizontalBooksList";
import ReviewCard from "../CommomComponents/ReviewCard/ReviewCard";
import WelcomeCard from "./components/WelcomeCard/WelcomeCard";
import * as S from "./styles";
import { useEffect } from "react";
import { useAppSelector } from "@app/store/rootReducer";
import { useNavigate } from "react-router-dom";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import { mockedPopularBooks } from "@app/utils/mocks/MockedPopularBooks";

export default function HomeScreen() {
  const navigate = useNavigate();
  const { userId } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  return (
    <>
      <GlobalStyle />
      <S.AppContainer>
        <Header />

        <S.MainContent>
          <WelcomeCard />

          <S.SectionTitle>Livros populares</S.SectionTitle>
          <HorizontalBooksList books={mockedPopularBooks}/>

          <S.SectionTitle>Avaliações de amigos</S.SectionTitle>

          {mockedReviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </S.MainContent>
      </S.AppContainer>
    </>
  );
}
