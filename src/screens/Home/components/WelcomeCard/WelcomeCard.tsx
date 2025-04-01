import { FC } from "react";
import * as S from "./styles";

interface WelcomeCardProps {
    name: string
}

const WelcomeCard: FC<WelcomeCardProps> = ({name}) => {
  return (
    <S.HeroSection>
      <S.GreetingText>Hello, {name}!</S.GreetingText>
      <S.SubText>Review or track books that you read.</S.SubText>
    </S.HeroSection>
  );
};

export default WelcomeCard;