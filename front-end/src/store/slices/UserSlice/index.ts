import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  FetchUserInfoPayloadAction,
  ListFollowersPayloadAction,
  ListFollowingPayloadAction,
  UpdateProfilePayloadAction,
  UserState,
} from "./types";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";

export const initialState: UserState = {
  username: null,
  userId: null,
  email: null,
  name: null,
  error: null,
  profilePicture: null,
  bio: null,
  type: null,
  isLoading: false,
  followers: 0,
  following: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<UserState>
    ) => setStateSliceFieldReducer<UserState>(state, action),
    setUserSlice: (state, action: PayloadAction<Partial<UserState>>) =>
      setStateSliceReducer<UserState>(state, action),
    fetchUserInfo: (_state, _action: FetchUserInfoPayloadAction) => {},
    updateProfile: (_state, _action: UpdateProfilePayloadAction) => {},
    listFollowers: (_state, _action: ListFollowersPayloadAction) => {},
    listFollowing: (_state, _action: ListFollowingPayloadAction) => {},
    resetUserSlice: () => initialState,
  },
});

export const {
  setUserSliceField,
  setUserSlice,
  fetchUserInfo,
  updateProfile,
  listFollowers,
  listFollowing,
  resetUserSlice,
} = userSlice.actions;
export default userSlice;
