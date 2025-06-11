import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginPayloadAction, LoginState } from "./types";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";

export const initialState: LoginState = {
  isLoading: false,
  loginError: undefined,
  logoutError: undefined,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<LoginState>
    ) => setStateSliceFieldReducer<LoginState>(state, action),
    setLoginSlice: (state, action: PayloadAction<Partial<LoginState>>) =>
      setStateSliceReducer<LoginState>(state, action),
    login: (_state, _action: LoginPayloadAction) => {},
    logout: () => {},
    resetLoginSlice: () => initialState,
  },
});

export const {
  setLoginSliceField,
  setLoginSlice,
  login,
  logout,
  resetLoginSlice,
} = loginSlice.actions;
export default loginSlice;
