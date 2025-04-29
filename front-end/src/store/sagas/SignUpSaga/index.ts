import { takeLatest } from "redux-saga/effects";
import { handleSignUp } from "./handlers/handleSignUp";
import { signUp } from "@app/store/slices/SignUpSlice";

export function* watchSignUpSagas() {
  yield takeLatest(signUp.type, handleSignUp);
}