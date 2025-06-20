import {
  addBookToFavorites,
  checkIsBookFavorite,
  listFavoriteBooks,
  removeBookFromFavorites,
} from "@app/store/slices/FavoriteBooksSlice";
import { takeLatest } from "redux-saga/effects";
import { listFavoriteBooksHandler } from "./handlers/listFavoriteBooksHandler";
import { checkIsBookFavoriteHandler } from "./handlers/checkIsBookFavoriteHandler";
import { addBookToFavoritesHandler } from "./handlers/addBookToFavoritesHandler";
import { removeBookFromFavoritesHandler } from "./handlers/removeBookFromFavoritesHandler";

export function* watchFavoriteBooksSagas() {
  yield takeLatest(listFavoriteBooks.type, listFavoriteBooksHandler);
  yield takeLatest(checkIsBookFavorite.type, checkIsBookFavoriteHandler);
  yield takeLatest(addBookToFavorites.type, addBookToFavoritesHandler);
  yield takeLatest(
    removeBookFromFavorites.type,
    removeBookFromFavoritesHandler
  );
}
