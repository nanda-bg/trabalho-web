import axios from "axios";
import { call, put, select } from "redux-saga/effects";
import {
  setReadingListSlice,
  setReadingListSliceField,
} from "@app/store/slices/ReadingListSlice";
import { ListReadingListBooksPayloadAction } from "@app/store/slices/ReadingListSlice/types";
import Cookies from "js-cookie";
import _ from "lodash";

export function* listReadingListBooksHandler({
  payload,
}: ListReadingListBooksPayloadAction) {
  try {
    yield put(setReadingListSliceField({ key: "isLoading", value: true }));
    yield put(setReadingListSliceField({ key: "error", value: null }));

    const { readingListBooks, lastBookId } = yield select(
      (state) => state.readingListSlice
    );

    const token = Cookies.get("token");

    const { data } = yield call(axios.get, `/api/users/books/future-reads`, {
      params: {
        lastItemId: lastBookId,
        pageSize: 20,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const books = data.map((item) => item.book);

    yield put(
      setReadingListSlice({
        lastBookId: _.last(data)?.userBookListId,
        readingListBooks: _.uniqBy([...readingListBooks, ...books], "bookId"),
      })
    );
  } catch (error) {
    yield put(
      setReadingListSliceField({
        key: "error",
        value: "Erro ao resgatar lista de leitura, tente novamente.",
      })
    );
  } finally {
    yield put(setReadingListSliceField({ key: "isLoading", value: false }));
  }
}
