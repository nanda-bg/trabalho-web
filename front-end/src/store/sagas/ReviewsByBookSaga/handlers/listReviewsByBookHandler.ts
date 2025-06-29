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

    const ordenatedReviews = data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateB.getTime() - dateA.getTime();
    });

    yield put(
      setReviewsByBookSliceField({
        key: "reviewsByBook",
        value: ordenatedReviews,
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
