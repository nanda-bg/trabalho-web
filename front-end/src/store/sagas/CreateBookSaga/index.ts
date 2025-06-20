import { createBook } from "@app/store/slices/CreateBookSlice";
import { takeLatest } from "redux-saga/effects";
import { createBookHandler } from "./handlers/createBookHandler";

export function* watchCreateBookSagas() {
  yield takeLatest(createBook.type, createBookHandler);
}
