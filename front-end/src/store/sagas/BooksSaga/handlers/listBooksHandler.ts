import { setBookSlice, setBookSliceField } from "@app/store/slices/BooksSlice";
import axios, { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import _ from "lodash";
import { Book } from "@app/types/Book";
import Cookies from "js-cookie";

export function* listBooksHandler() {
  try {
    yield put(setBookSliceField({ key: "isLoading", value: true }));
    yield put(setBookSliceField({ key: "error", value: null }));

    const token = Cookies.get("token");
    const { lastBookId, books } = yield select((state) => state.bookSlice);

    const { data }: AxiosResponse<Book[]> = yield call(
      axios.get,
      `/api/books/paginated`,
      {
        params: {
          lastBookId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(
      setBookSlice({
        lastBookId: _.last(data)?.bookId,
        books: [...books, ...data],
        hasMore: data.length > 0,
      })
    );
  } catch (error) {
    yield put(
      setBookSliceField({
        key: "error",
        value: "Erro ao resgatar livros, tente novamente.",
      })
    );
  } finally {
    yield put(setBookSliceField({ key: "isLoading", value: false }));
  }
}
