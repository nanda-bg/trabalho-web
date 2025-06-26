import axios from "axios";
import { call, put } from "redux-saga/effects";
import Cookies from "js-cookie";
import {
  setFavoriteBooksSlice,
  setFavoriteBooksSliceField,
} from "@app/store/slices/FavoriteBooksSlice";
import { CheckIsBookFavoritePayloadAction } from "@app/store/slices/FavoriteBooksSlice/types";

export function* checkIsBookFavoriteHandler({
  payload,
}: CheckIsBookFavoritePayloadAction) {
  try {
    yield put(
      setFavoriteBooksSliceField({ key: "isLoadingCheck", value: true })
    );

    const token = Cookies.get("token");

    const { data } = yield call(
      axios.get,
      `/api/users/books/favorites/${payload.bookId}/exists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(
      setFavoriteBooksSlice({
        isSelectedBookFavorite: data.inFavorites,
      })
    );
  } catch (error) {
    yield put(
      setFavoriteBooksSliceField({
        key: "error",
        value: "Erro ao verificar se o livro está nos favoritos, tente novamente.",
      })
    );
  } finally {
    yield put(
      setFavoriteBooksSliceField({ key: "isLoadingCheck", value: false })
    );
  }
}
