import { setReviewSliceField } from "@app/store/slices/ReviewsSlice";
import { ListReviewsByBookPayloadAction } from "@app/store/slices/ReviewsSlice/types";
import axios from "axios";
import Cookies from "js-cookie";
import { call, put } from "redux-saga/effects";

export function* listReviewsByReviewHandler({
  payload,
}: ListReviewsByBookPayloadAction) {
  try {
    yield put(setReviewSliceField({ key: "isLoading", value: true }));
    yield put(setReviewSliceField({ key: "error", value: null }));

    const token = Cookies.get("token");

    const { data } = yield call(axios.get, `/reviews/book/${payload.bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    for (const review of data) {
      if (review.date) {
        review.date = new Date(review.date.seconds * 1000).toISOString();
      }
    }

    yield put(
      setReviewSliceField({
        key: "reviews",
        value: data,
      })
    );
  } catch (error) {
    yield put(
      setReviewSliceField({
        key: "error",
        value: "Erro ao resgatar livros, tente novamente.",
      })
    );
  } finally {
    yield put(setReviewSliceField({ key: "isLoading", value: false }));
  }
}
