import axios from "axios";
import { call, put, select } from "redux-saga/effects";
import _ from "lodash";
import Cookies from "js-cookie";
import {
  setFavoriteBooksSlice,
  setFavoriteBooksSliceField,
} from "@app/store/slices/FavoriteBooksSlice";

export function* listFavoriteBooksHandler() {
  try {
    yield put(setFavoriteBooksSliceField({ key: "isLoading", value: true }));
    yield put(setFavoriteBooksSliceField({ key: "error", value: null }));

    const token = Cookies.get("token");
    const { lastBookId, favoriteBooks } = yield select(
      (state) => state.favoriteBooksSlice
    );

    const { data } = yield call(axios.get, `/users/books/favorites`, {
      params: {
        lastItemId: lastBookId,
        pageSize: 1,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const books = data.map((item) => item.book);

    yield put(
      setFavoriteBooksSlice({
        lastBookId: _.last(data)?.userBookListId,
        favoriteBooks: _.uniqBy([...favoriteBooks, ...books], "bookId"),
      })
    );
  } catch (error) {
    yield put(
      setFavoriteBooksSliceField({
        key: "error",
        value: "Erro ao resgatar livros favoritos, tente novamente.",
      })
    );
  } finally {
    yield put(setFavoriteBooksSliceField({ key: "isLoading", value: false }));
  }
}
