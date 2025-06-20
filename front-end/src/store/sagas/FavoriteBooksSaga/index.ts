
import { listFavoriteBooks } from "@app/store/slices/FavoriteBooksSlice";
import { takeLatest } from "redux-saga/effects";
import { listFavoriteBooksHandler } from "./handlers/listFavoriteBooksHandler";

export function* watchFavoriteBooksSagas() {
  yield takeLatest(listFavoriteBooks.type, listFavoriteBooksHandler);}
