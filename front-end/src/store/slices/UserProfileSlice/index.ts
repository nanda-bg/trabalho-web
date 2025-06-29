import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";
import {
  UserProfileState,
  GetUserProfilePayloadAction,
  ListUserReviewsPayloadAction,
  ListUserFollowersPayloadAction,
  ListUserFollowingPayloadAction,
  FollowUserPayloadAction,
} from "./types";

export const initialState: UserProfileState = {
  isLoading: {
    profile: false,
    reviews: false,
    followers: false,
    following: false,
    followAction: false,
  },
  error: null,
  selectedUser: null,
  userReviews: [],
  userFavorites: [],
  followers: [],
  following: [],
  followersCount: 0,
  followingCount: 0,
  isFollowing: false,
  isFollowingCurrentUser: false,
  lastReviewId: null,
  lastFavoriteId: null,
  hasMore: true,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfileSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<UserProfileState>
    ) => setStateSliceFieldReducer<UserProfileState>(state, action),
    setUserProfileSlice: (
      state,
      action: PayloadAction<Partial<UserProfileState>>
    ) => setStateSliceReducer<UserProfileState>(state, action),
    getUserProfile: (_state, _action: GetUserProfilePayloadAction) => {},
    listUserReviews: (_state, _action: ListUserReviewsPayloadAction) => {},
    listUserFollowers: (_state, _action: ListUserFollowersPayloadAction) => {},
    listUserFollowing: (_state, _action: ListUserFollowingPayloadAction) => {},
    followUser: (_state, _action: FollowUserPayloadAction) => {},
    resetUserProfileSlice: () => initialState,
  },
});

export const {
  setUserProfileSliceField,
  setUserProfileSlice,
  getUserProfile,
  listUserReviews,
  listUserFollowers,
  listUserFollowing,
  followUser,
  resetUserProfileSlice,
} = userProfileSlice.actions;
export default userProfileSlice;