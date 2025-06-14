import { call, put } from "redux-saga/effects";
import axios from "axios";
import {
  setBookDetailsSlice,
  setBookDetailsSliceField,
} from "@app/store/slices/BookDetailsSlice";
import { GetBookDetailsPayloadAction } from "@app/store/slices/BookDetailsSlice/types";
import Cookies from "js-cookie";

export function* getBookDetailsHandler({
  payload,
}: GetBookDetailsPayloadAction) {
  try {
    yield put(setBookDetailsSlice({ isLoading: true, error: null }));

    const token = Cookies.get("token");

    const { data } = yield call(axios.get, `/books/id/${payload.uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(
      setBookDetailsSliceField({
        key: "selectedBook",
        value: data,
      })
    );
  } catch (error) {
    yield put(
      setBookDetailsSliceField({
        key: "error",
        value: "Erro ao resgatar informações do livro, tente novamente.",
      })
    );
  } finally {
    yield put(setBookDetailsSliceField({ key: "isLoading", value: false }));
  }
}
