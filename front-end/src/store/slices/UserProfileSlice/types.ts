import { User } from "@app/types/User";
import { Review } from "@app/types/Review";
import { Book } from "@app/types/Book";
import { PayloadAction } from "@reduxjs/toolkit";

export interface UserProfileState {
  isLoading: {
    profile: boolean;
    reviews: boolean;
    favorites: boolean;
    followers: boolean;
    following: boolean;
    followAction: boolean;
  };
  error: string | null;
  selectedUser: User | null;
  userReviews: Review[];
  userFavorites: Book[];
  followers: User[];
  following: User[];
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  isFollowingCurrentUser: boolean;
  lastReviewId: string | null;
  lastFavoriteId: string | null;
  hasMore: {
    reviews: boolean;
    favorites: boolean;
  };
}

export type GetUserProfilePayloadAction = PayloadAction<{
  userId: string;
}>;

export type ListUserReviewsPayloadAction = PayloadAction<{
  userId: string;
}>;

export type ListUserFavoritesPayloadAction = PayloadAction<{
  userId: string;
}>;

export type ListUserFollowersPayloadAction = PayloadAction<{
  userId: string;
}>;

export type ListUserFollowingPayloadAction = PayloadAction<{
  userId: string;
}>;

export type FollowUserPayloadAction = PayloadAction<{
  userId: string;
}>;