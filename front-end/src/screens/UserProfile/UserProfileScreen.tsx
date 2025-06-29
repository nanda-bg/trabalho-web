import { useAppSelector } from "@app/store/rootReducer";
import { FC, useEffect, useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  listUserReviews,
  listUserFavorites,
  followUser,
  resetUserProfileSlice,
  listUserFollowers,
  listUserFollowing,
} from "@app/store/slices/UserProfileSlice";
import * as S from "./styles";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import SecondaryHeader from "../CommomComponents/SecondaryHeader/SecondaryHeader";
import UserAvatar from "../CommomComponents/UserAvatar/UserAvatar";
import ReviewCard from "../CommomComponents/ReviewCard/ReviewCard";
import HorizontalBooksList from "../CommomComponents/HorizontalBooksList/HorizontalBooksList";
import { UserPlus, UserMinus } from "lucide-react";

type ActiveTab = "reviews" | "favorites";

const UserProfileScreen: FC = () => {
  const dispatch = useDispatch();
  const { userId } = useParams<{ userId: string }>();
  const { userId: currentUserId } = useAppSelector((state) => state.userSlice);

  const {
    selectedUser,
    userReviews,
    userFavorites,
    followersCount,
    followingCount,
    isFollowing,
    isFollowingCurrentUser,
    hasMore,
    isLoading,
    error,
  } = useAppSelector((state) => state.userProfileSlice);

  const [activeTab, setActiveTab] = useState<ActiveTab>("reviews");

  const containerRef = useRef(null);
  const lastItemRef = useRef(null);
  const [hasCalledListEnd, setHasCalledListEnd] = useState(false);

  const isOwnProfile = currentUserId === userId;

  const currentData = activeTab === "reviews" ? userReviews : userFavorites;
  const currentIsLoading = isLoading[activeTab];
  const currentHasMore = hasMore[activeTab];

  const onListEnd = useCallback(() => {
    if (!hasCalledListEnd && currentHasMore && !currentIsLoading && userId) {
      if (activeTab === "reviews") {
        dispatch(listUserReviews({ userId }));
      } else {
        dispatch(listUserFavorites({ userId }));
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
    dispatch(listUserFollowers({ userId }));
    dispatch(listUserFollowing({ userId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    setHasCalledListEnd(false);
  }, [currentData.length]);

  useEffect(() => {
    if (!lastItemRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onListEnd();
        }
      },
      { root: containerRef.current }
    );

    observer.observe(lastItemRef.current);

    return () => {
      observer.disconnect();
    };
  }, [currentData, onListEnd]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile({ userId }));
      dispatch(listUserReviews({ userId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setHasCalledListEnd(false);

    if (tab === "favorites" && userFavorites.length === 0 && userId) {
      dispatch(listUserFavorites({ userId }));
    }
  };

  const handleFollowToggle = () => {
    if (!userId) return;
    dispatch(followUser({ userId }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetUserProfileSlice());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading.profile) {
    return (
      <>
        <GlobalStyle />
        <S.Container>
          <SecondaryHeader title="Perfil" />
          <S.LoadingContainer>
            <S.LoadingSpinner />
          </S.LoadingContainer>
        </S.Container>
      </>
    );
  }

  if (error && !selectedUser) {
    return (
      <>
        <GlobalStyle />
        <S.Container>
          <SecondaryHeader title="Perfil" />
          <S.ErrorContainer>
            <S.ErrorMessage>{error}</S.ErrorMessage>
          </S.ErrorContainer>
        </S.Container>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <S.Container ref={containerRef}>
        <SecondaryHeader title="Perfil" />

        {selectedUser && (
          <>
            <S.ProfileHeader>
              <UserAvatar
                profileImgUrl={selectedUser.profilePicture}
                size="lg"
              />
              <S.UserInfo>
                <S.UserName>{selectedUser.name}</S.UserName>
                <S.UserUsername>@{selectedUser.username}</S.UserUsername>
              </S.UserInfo>

              <S.StatsContainer>
                <S.StatItem>
                  <S.StatNumber>{followersCount}</S.StatNumber>
                  <S.StatLabel>Seguidores</S.StatLabel>
                </S.StatItem>
                <S.StatItem>
                  <S.StatNumber>{followingCount}</S.StatNumber>
                  <S.StatLabel>Seguindo</S.StatLabel>
                </S.StatItem>
              </S.StatsContainer>

              {!isOwnProfile && (
                <S.FollowButton
                  onClick={handleFollowToggle}
                  disabled={isLoading.followAction}
                  following={isFollowing}
                >
                  {isLoading.followAction ? (
                    <S.ButtonSpinner />
                  ) : isFollowing ? (
                    <>
                      <UserMinus size={16} />
                      Deixar de seguir
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      {isFollowingCurrentUser
                        ? "Seguir de volta"
                        : "Seguir"}
                    </>
                  )}
                </S.FollowButton>
              )}
            </S.ProfileHeader>

            <S.TabsContainer>
              <S.Tab
                active={activeTab === "reviews"}
                onClick={() => handleTabChange("reviews")}
              >
                Avaliações
              </S.Tab>
              <S.Tab
                active={activeTab === "favorites"}
                onClick={() => handleTabChange("favorites")}
              >
                Favoritos
              </S.Tab>
            </S.TabsContainer>

            <S.Body>
              {error ? (
                <S.ErrorMessage>{error}</S.ErrorMessage>
              ) : activeTab === "reviews" ? (
                currentData.length > 0 ? (
                  <S.ReviewsList>
                    {userReviews.map((review, index) => {
                      const isLastReview = index === userReviews.length - 1;
                      return (
                        <div
                          key={review.reviewId}
                          ref={isLastReview ? lastItemRef : null}
                        >
                          <ReviewCard review={review} />
                        </div>
                      );
                    })}
                  </S.ReviewsList>
                ) : !currentIsLoading ? (
                  <S.EmptyState>
                    <S.EmptyMessage>
                      {isOwnProfile
                        ? "Você ainda não fez nenhuma avaliação."
                        : "Este usuário ainda não fez nenhuma avaliação."}
                    </S.EmptyMessage>
                  </S.EmptyState>
                ) : null
              ) : currentData.length > 0 ? (
                <HorizontalBooksList
                  books={userFavorites}
                  isLoading={currentIsLoading}
                  onEndReached={onListEnd}
                />
              ) : !currentIsLoading ? (
                <S.EmptyState>
                  <S.EmptyMessage>
                    {isOwnProfile
                      ? "Você ainda não tem livros favoritos."
                      : "Este usuário ainda não tem livros favoritos."}
                  </S.EmptyMessage>
                </S.EmptyState>
              ) : null}

              {currentIsLoading && <S.LoadingSpinner />}
            </S.Body>
          </>
        )}
      </S.Container>
    </>
  );
};

export default UserProfileScreen;
