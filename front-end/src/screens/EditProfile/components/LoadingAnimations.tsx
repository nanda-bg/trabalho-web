import React from "react";
import * as S from "./styles";

interface LoadingProps {
  active: boolean;
}

const Loading: React.FC<LoadingProps> = ({ active }) => {
  if (!active) return null;

  return (
    <S.LoadingOverlay>
      <S.LoadingSpinner />
    </S.LoadingOverlay>
  );
};

export default Loading;
