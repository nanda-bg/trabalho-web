import * as S from "./styles";
import { useAppSelector } from "@app/store/rootReducer";

const WelcomeCard = () => {
  const { name, isLoading } = useAppSelector((state) => state.userSlice);

  return (
    <S.HeroSection>
      {isLoading ? (
        <>
          <S.LoadingGreetingText />
          <S.LoadingSubText />
        </>
      ) : (
        <>
          <S.GreetingText>Olá, {name}!</S.GreetingText>
          <S.SubText>Registre e avalie os livros que você leu.</S.SubText>
        </>
      )}
    </S.HeroSection>
  );
};

export default WelcomeCard;
