import * as S from "./styles";
import { FC } from "react";

const LoadingAnimation: FC = () => {
  return (
    <S.HorizontalScroll>
      {[...Array(5)].map((_, index) => (
        <S.SkeletonBookCard key={index}>
          <S.SkeletonBookCover />
          <S.SkeletonBookInfo>
            <S.SkeletonText />
            <S.SkeletonText />
            <S.SkeletonText />
          </S.SkeletonBookInfo>
        </S.SkeletonBookCard>
      ))}
    </S.HorizontalScroll>
  );
};

export default LoadingAnimation;
