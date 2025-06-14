import { setBookSlice, setBookSliceField } from "@app/store/slices/BooksSlice";
import axios, { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import _ from "lodash";
import { Book } from "@app/types/Book";
import { setBookByGenreSlice, setBookByGenreSliceField } from "@app/store/slices/BookByGenreSlice";
import { ListBookByGenrePayloadAction } from "@app/store/slices/BookByGenreSlice/types";

export function* listBooksByGenreHandler({payload}:ListBookByGenrePayloadAction) {
  const { booksByGenre, isLoading } = yield select((state) => state.bookByGenreSlice);
  try {
    yield put(setBookByGenreSliceField({ key: "isLoading", value: {...isLoading, [payload.genre]: true } }));
    yield put(setBookByGenreSliceField({ key: "error", value: null }));

    const token = localStorage.getItem("token");

    const { data }: AxiosResponse<Book[]> = yield call(
      axios.get,
      `/books/genre`,
      {
        params: {
          genre: payload.genre,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(
      setBookByGenreSlice({
        booksByGenre: {...booksByGenre, [payload.genre]: data },
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
    yield put(setBookByGenreSliceField({ key: "isLoading", value: {...isLoading, [payload.genre]: false } }));
  }
}
