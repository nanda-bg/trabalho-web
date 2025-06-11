import {  getBookDetails } from "@app/store/slices/BookDetailsSlice";
import { takeLatest } from "redux-saga/effects";
import { getBookDetailsHandler } from "./handlers/getBookDetailsHandler";

export function* watchBookDetailsSagas() {
  yield takeLatest(getBookDetails.type, getBookDetailsHandler);
}
