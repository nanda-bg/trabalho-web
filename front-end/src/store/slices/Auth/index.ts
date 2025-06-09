import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, GetTokenPayloadAction } from "./types";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";

export const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<AuthState>
    ) => setStateSliceFieldReducer<AuthState>(state, action),
    setAuthSlice: (state, action: PayloadAction<Partial<AuthState>>) =>
      setStateSliceReducer<AuthState>(state, action),
    getToken: (_state, _action: GetTokenPayloadAction) => {},
  },
});

export const { setAuthSliceField, setAuthSlice, getToken } = authSlice.actions;

export default authSlice;
