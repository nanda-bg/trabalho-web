import axios, { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import { Book } from "@app/types/Book";
import {
  setBookByGenreSlice,
  setBookByGenreSliceField,
} from "@app/store/slices/BookByGenreSlice";
import { ListBookByGenrePayloadAction } from "@app/store/slices/BookByGenreSlice/types";
import Cookies from "js-cookie";
import _ from "lodash";

export function* listBooksByGenreHandler({
  payload,
}: ListBookByGenrePayloadAction) {
  try {
    const { isLoading, lastBookIdByGenre } = yield select(
      (state) => state.bookByGenreSlice
    );

    yield put(
      setBookByGenreSliceField({
        key: "isLoading",
        value: { ...isLoading, [payload.genre]: true },
      })
    );
    yield put(setBookByGenreSliceField({ key: "error", value: null }));

    const token = Cookies.get("token");

    const { data }: AxiosResponse<Book[]> = yield call(
      axios.get,
      `/api/books/genre/paginated`,
      {
        params: {
          genre: payload.genre,
          lastBookId: lastBookIdByGenre[payload.genre],
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { booksByGenre, hasMore } = yield select(
      (state) => state.bookByGenreSlice
    );

    const books = _.uniqBy(
      [...(booksByGenre[payload.genre] || []), ...data],
      "bookId"
    );

    yield put(
      setBookByGenreSlice({
        booksByGenre: {
          ...booksByGenre,
          [payload.genre]: books,
        },
        lastBookIdByGenre: {
          ...lastBookIdByGenre,
          [payload.genre]: _.last(data)?.bookId,
        },
        hasMore: {
          ...hasMore,
          [payload.genre]: data.length > 0,
        },
      })
    );
  } catch (error) {
    yield put(
      setBookByGenreSliceField({
        key: "error",
        value: "Erro ao resgatar livros por gênero, tente novamente.",
      })
    );
  } finally {
    const { isLoading } = yield select((state) => state.bookByGenreSlice);
    yield put(
      setBookByGenreSliceField({
        key: "isLoading",
        value: { ...isLoading, [payload.genre]: false },
      })
    );
  }
}
