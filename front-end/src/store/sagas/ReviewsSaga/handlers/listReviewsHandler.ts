import { setReviewsSliceField } from "@app/store/slices/ReviewsSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { call, put } from "redux-saga/effects";

export function* listReviewsHandler() {
  try {
    yield put(setReviewsSliceField({ key: "isLoading", value: true }));
    yield put(setReviewsSliceField({ key: "error", value: null }));

    const token = Cookies.get("token");

    const { data } = yield call(axios.get, `/api/reviews/paginated`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(
      setReviewsSliceField({
        key: "reviews",
        value: data,
      })
    );
  } catch (error) {
    yield put(
      setReviewsSliceField({
        key: "error",
        value: "Erro ao resgatar ultimas avaliações, tente novamente.",
      })
    );
  } finally {
    yield put(setReviewsSliceField({ key: "isLoading", value: false }));
  }
}
