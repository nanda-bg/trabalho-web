import axios from "axios";
import { call, put } from "redux-saga/effects";
import { checkIsBookInReadingList, setReadingListSliceField } from "@app/store/slices/ReadingListSlice";
import { RemoveBookFromReadingListPayloadAction } from "@app/store/slices/ReadingListSlice/types";
import Cookies from "js-cookie";

export function* removeBookFromReadingListHandler({
  payload,
}: RemoveBookFromReadingListPayloadAction) {
  try {
    const token = Cookies.get("token");

    yield call(
      axios.delete,
      `/api/users/books/future-reads/${payload.bookId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(checkIsBookInReadingList({ bookId: payload.bookId }));
    
  } catch (error) {
    yield put(
      setReadingListSliceField({
        key: "error",
        value: "Erro ao remover livro da lista de leitura, tente novamente.",
      })
    );
  }
}