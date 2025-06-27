import { setReviewsByBookSliceField } from "@app/store/slices/ReviewsByBookSlice";
import { ListReviewsByBookPayloadAction } from "@app/store/slices/ReviewsByBookSlice/types";
import axios from "axios";
import Cookies from "js-cookie";
import { call, put } from "redux-saga/effects";

export function* listReviewsByBookHandler({
  payload,
}: ListReviewsByBookPayloadAction) {
  try {
    yield put(setReviewsByBookSliceField({ key: "isLoading", value: true }));
    yield put(setReviewsByBookSliceField({ key: "error", value: null }));

    const token = Cookies.get("token");

    const { data } = yield call(axios.get, `/api/reviews/book/${payload.bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(
      setReviewsByBookSliceField({
        key: "reviewsByBook",
        value: data,
      })
    );
  } catch (error) {
    yield put(
      setReviewsByBookSliceField({
        key: "error",
        value: "Erro ao resgatar livros, tente novamente.",
      })
    );
  } finally {
    yield put(setReviewsByBookSliceField({ key: "isLoading", value: false }));
  }
}
