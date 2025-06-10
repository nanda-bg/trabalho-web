import { setBookSliceField } from "@app/store/slices/BooksSlice";
import axios from "axios";
import { call, put, select } from "redux-saga/effects";

export function* listBooksHandler() {
  try {
    yield put(setBookSliceField({ key: "isLoading", value: true }));
    yield put(setBookSliceField({ key: "error", value: null }));

    const token = localStorage.getItem("token");

    const { data } = yield call(axios.get, `/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(
      setBookSliceField({
        key: "books",
        value: data,
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
