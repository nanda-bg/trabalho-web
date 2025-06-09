import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  FetchUserInfoPayloadAction,
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
  },
});

export const { setUserSliceField, setUserSlice, fetchUserInfo, updateProfile } =
  userSlice.actions;
export default userSlice;
