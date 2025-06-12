
import { takeLatest } from "redux-saga/effects";
import { listBooksHandler } from "./handlers/listBooksHandler";
import { listBooks } from "@app/store/slices/BooksSlice";

export function* watchBooksSagas() {
  yield takeLatest(listBooks.type, listBooksHandler);}
