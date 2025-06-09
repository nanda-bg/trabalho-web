import { takeLatest } from "redux-saga/effects";
import { getToken } from "@app/store/slices/Auth";

export function* watchAuthSagas() {
  yield takeLatest(getToken.type, getToken);
}