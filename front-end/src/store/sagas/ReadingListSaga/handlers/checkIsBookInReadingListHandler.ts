import axios, { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { setReadingListSliceField } from "@app/store/slices/ReadingListSlice";
import { CheckIsBookInReadingListPayloadAction } from "@app/store/slices/ReadingListSlice/types";
import Cookies from "js-cookie";

export function* checkIsBookInReadingListHandler({
  payload,
}: CheckIsBookInReadingListPayloadAction) {
  try {
    const token = Cookies.get("token");

    const { data } = yield call(
      axios.get,
      `/api/users/books/future-reads/${payload.bookId}/exists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(
      setReadingListSliceField({
        key: "isSelectedBookInReadingList",
        value: data.inFutureReads,
      })
    );
  } catch (error) {
    yield put(
      setReadingListSliceField({
        key: "isSelectedBookInReadingList",
        value: false,
      })
    );
  }
}