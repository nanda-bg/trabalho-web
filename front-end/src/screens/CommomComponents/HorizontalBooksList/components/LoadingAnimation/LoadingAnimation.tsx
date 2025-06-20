import * as S from "./styles";
import { FC } from "react";

const LoadingAnimation: FC = () => {
  return (
    <>
      {[...Array(15)].map((_, index) => (
        <S.SkeletonBookCard key={index}>
          <S.SkeletonBookCover />
          <S.SkeletonBookInfo>
            <S.SkeletonText />
            <S.SkeletonText />
            <S.SkeletonText />
          </S.SkeletonBookInfo>
        </S.SkeletonBookCard>
      ))}
    </>
  );
};

export default LoadingAnimation;
