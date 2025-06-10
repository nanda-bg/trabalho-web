import { call, put } from "redux-saga/effects";
import axios from "axios";
import { GetBookPayloadAction } from "@app/store/slices/BooksSlice/types";
import { setBookSliceField } from "@app/store/slices/BooksSlice";

export function* getBookHandler({ payload }: GetBookPayloadAction) {
  try {
    yield put(setBookSliceField({ key: "isLoading", value: true }));
    yield put(setBookSliceField({ key: "error", value: null }));

    const token = localStorage.getItem("token");

    const { data } = yield call(axios.get, `/books/id/${payload.uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(
      setBookSliceField({
        key: "selectedBook",
        value: data,
      })
    );
  } catch (error) {
    yield put(
      setBookSliceField({
        key: "error",
        value: "Erro ao resgatar informações do livro, tente novamente.",
      })
    );
  } finally {
    yield put(setBookSliceField({ key: "isLoading", value: false }));
  }
}
