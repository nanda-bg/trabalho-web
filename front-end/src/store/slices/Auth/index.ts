import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, GetTokenPayloadAction } from "./types";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";

export const initialState: AuthState = {
  isAuthenticated: false,
  error: undefined,
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
    resetAuthSlice: () => initialState,
  },
});

export const { setAuthSliceField, setAuthSlice, getToken, resetAuthSlice } = authSlice.actions;

export default authSlice;
