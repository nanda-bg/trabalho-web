import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SignUpPayloadAction, SignUpState } from "./types";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";

export const initialState: SignUpState = {
  isLoading: false,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setSignUpSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<SignUpState>
    ) => setStateSliceFieldReducer<SignUpState>(state, action),
    setSignUpSlice: (state, action: PayloadAction<Partial<SignUpState>>) =>
      setStateSliceReducer<SignUpState>(state, action),
    signUp: (_state, _action: SignUpPayloadAction) => {},
  },
});

export const { setSignUpSliceField, setSignUpSlice, signUp } =
  signUpSlice.actions;
export default signUpSlice;
