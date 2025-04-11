import { mockedReviews } from "@app/utils/mocks/MockedReview";
import Header from "./components/Header/Header";
import HorizontalBooksList from "./components/HorizontalBooksList/HorizontalBooksList";
import ReviewCard from "./components/ReviewCard/ReviewCard";
import WelcomeCard from "./components/WelcomeCard/WelcomeCard";
import * as S from "./styles";
import { Home, Search, Bell, User } from "lucide-react";

export default function HomeScreen() {
  const user = {
    name: "Kyran",
    avatar: "https://i.pravatar.cc/300",
  };

  return (
    <>
      <S.GlobalStyle />
      <S.AppContainer>
        <Header profileImgUrl={user.avatar} />

        <S.MainContent>
          <WelcomeCard name={user.name} />

          <S.SectionTitle>Popular Books This Month</S.SectionTitle>
          <HorizontalBooksList />

          <S.SectionTitle>Recent Friends Review</S.SectionTitle>

          {mockedReviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </S.MainContent>

        <S.BottomNav>
          <S.NavButton $active>
            <Home size={20} />
          </S.NavButton>
          <S.NavButton>
            <Search size={20} />
          </S.NavButton>
          <S.NavButton>
            <Bell size={20} />
          </S.NavButton>
          <S.NavButton>
            <User size={20} />
          </S.NavButton>
        </S.BottomNav>
      </S.AppContainer>
    </>
  );
}
