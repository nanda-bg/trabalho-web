import { useAppSelector } from "@app/store/rootReducer";
import { FC, useEffect, useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  listMyReviews,
  listFriendReviews,
  resetReviewsFeedSlice,
  setReviewsFeedSliceField,
  setReviewsFeedSlice,
} from "@app/store/slices/ReviewsFeedSlice";
import * as S from "./styles";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import PrimaryHeader from "../CommomComponents/PrimaryHeader/PrimaryHeader";
import ReviewCard from "../CommomComponents/ReviewCard/ReviewCard";
import { ActiveTab } from "@app/store/slices/ReviewsFeedSlice/types";
import { set } from "date-fns";

const ReviewsFeedScreen: FC = () => {
  const dispatch = useDispatch();
  const { myReviews, friendReviews, hasMore, isLoading, error, activeTab } =
    useAppSelector((state) => state.reviewsFeedSlice);

  const { userId } = useAppSelector((state) => state.userSlice);

  const containerRef = useRef(null);
  const lastReviewRef = useRef(null);
  const [hasCalledListEnd, setHasCalledListEnd] = useState(false);

  const currentReviews = activeTab === "myReviews" ? myReviews : friendReviews;
  const currentIsLoading = isLoading[activeTab];
  const currentHasMore = hasMore[activeTab];

  const onListEnd = useCallback(() => {
    if (!hasCalledListEnd && currentHasMore && !currentIsLoading) {
      if (activeTab === "myReviews") {
        dispatch(listMyReviews({ userId }));
      } else {
        dispatch(listFriendReviews({}));
      }
      setHasCalledListEnd(true);
    }
  }, [
    hasCalledListEnd,
    currentHasMore,
    currentIsLoading,
    activeTab,
    userId,
    dispatch,
  ]);

  useEffect(() => {
    setHasCalledListEnd(false);
  }, [currentReviews.length]);

  useEffect(() => {
    if (!lastReviewRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onListEnd();
        }
      },
      { root: containerRef.current }
    );

    observer.observe(lastReviewRef.current);

    return () => {
      observer.disconnect();
    };
  }, [currentReviews, onListEnd]);

  useEffect(() => {
    if (myReviews.length === 0 && !isLoading.myReviews) {
      dispatch(listMyReviews({ userId }));
    }
    if (friendReviews.length === 0 && !isLoading.friendReviews) {
      dispatch(listFriendReviews({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myReviews.length, friendReviews.length, userId]);

  const handleTabChange = (tab: ActiveTab) => {
    dispatch(setReviewsFeedSliceField({ key: "activeTab", value: tab }));
    setHasCalledListEnd(false);
  };

  useEffect(() => {
    return () => {
      dispatch(
        setReviewsFeedSlice({
          isLoading: { myReviews: false, friendReviews: false },
          error: null,
          myReviews: [],
          friendReviews: [],
          lastReviewId: { myReviews: null, friendReviews: null },
          hasMore: { myReviews: true, friendReviews: true },
        })
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GlobalStyle />
      <S.Container ref={containerRef}>
        <PrimaryHeader activeScreen="Reviews" title="Avaliações" />

        <S.TabsContainer>
          <S.Tab
            active={activeTab === "myReviews"}
            onClick={() => handleTabChange("myReviews")}
          >
            Minhas Avaliações
          </S.Tab>
          <S.Tab
            active={activeTab === "friendReviews"}
            onClick={() => handleTabChange("friendReviews")}
          >
            Avaliações de Amigos
          </S.Tab>
        </S.TabsContainer>

        <S.Body>
          {error ? (
            <S.ErrorMessage>{error}</S.ErrorMessage>
          ) : currentReviews.length > 0 ? (
            <S.ReviewsList>
              {currentReviews.map((review, index) => {
                const isLastReview = index === currentReviews.length - 1;
                return (
                  <div
                    key={review.reviewId}
                    ref={isLastReview ? lastReviewRef : null}
                  >
                    <ReviewCard review={review} />
                  </div>
                );
              })}
            </S.ReviewsList>
          ) : !currentIsLoading ? (
            <S.EmptyState>
              <S.EmptyMessage>
                {activeTab === "myReviews"
                  ? "Você ainda não fez nenhuma avaliação."
                  : "Nenhuma avaliação encontrada."}
              </S.EmptyMessage>
            </S.EmptyState>
          ) : null}

          {currentIsLoading && <S.LoadingSpinner />}
        </S.Body>
      </S.Container>
    </>
  );
};

export default ReviewsFeedScreen;
