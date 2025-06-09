
import { takeLatest } from "redux-saga/effects";
import { getBookHandler } from "./handlers/getBookHandler";
import { listBooksHandler } from "./handlers/listBooksHandler";
import { getBook, listBooks } from "@app/store/slices/BooksSlice";

export function* watchBooksSagas() {
  yield takeLatest(getBook.type, getBookHandler);
  yield takeLatest(listBooks.type, listBooksHandler);}
