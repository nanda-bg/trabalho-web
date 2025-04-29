import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginPayloadAction, LoginState, } from "./types";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";

export const initialState: LoginState = {
  isLoading: false,
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
  },
});

export const { setLoginSliceField, setLoginSlice, login, logout } =
  loginSlice.actions;
export default loginSlice;
