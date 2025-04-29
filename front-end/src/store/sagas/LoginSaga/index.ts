
import { takeLatest } from "redux-saga/effects";
import { handleLogin } from "./handlers/handleLogin";
import { handleLogout } from "./handlers/handleLogout";
import { login, logout } from "@app/store/slices/LoginSlice";

export function* watchLoginSagas() {
  yield takeLatest(login.type, handleLogin);
  yield takeLatest(logout.type, handleLogout);}
