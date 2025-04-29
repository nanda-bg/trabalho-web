import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UpdateProfilePayloadAction, UserState } from "./types";
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
    fetchUserInfo: () => {},
    updateProfile: (_state, _action: UpdateProfilePayloadAction) => {},
  },
});

export const { setUserSliceField, setUserSlice, fetchUserInfo, updateProfile } = userSlice.actions;
export default userSlice;
