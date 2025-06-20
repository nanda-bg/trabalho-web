import { FC } from "react";
import * as S from "./styles";

interface LoadingAnimationProps {
  active: boolean;
}

const LoadingAnimation: FC<LoadingAnimationProps> = ({ active }) => {
  if (!active) return null;

  return (
    <S.LoadingOverlay>
      <S.LoadingSpinner />
    </S.LoadingOverlay>
  );
};

export default LoadingAnimation;
