import axios from "axios";
import { call, put } from "redux-saga/effects";
import Cookies from "js-cookie";
import {
  checkIsBookFavorite,
  setFavoriteBooksSliceField,
} from "@app/store/slices/FavoriteBooksSlice";
import { AddBookToFavoritesPayloadAction } from "@app/store/slices/FavoriteBooksSlice/types";

export function* addBookToFavoritesHandler({
  payload,
}: AddBookToFavoritesPayloadAction) {
  try {
    yield put(
      setFavoriteBooksSliceField({ key: "isLoadingAddOrRemove", value: true })
    );

    const token = Cookies.get("token");

    yield call(
      axios.post,
      `/api/users/books/favorites/${payload.bookId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(checkIsBookFavorite({ bookId: payload.bookId }));
  } catch (error) {
    yield put(
      setFavoriteBooksSliceField({
        key: "error",
        value:
          "Erro ao adicionar livro aos favoritos, tente novamente.",
      })
    );
  } finally {
    yield put(
      setFavoriteBooksSliceField({ key: "isLoadingAddOrRemove", value: false })
    );
  }
}
