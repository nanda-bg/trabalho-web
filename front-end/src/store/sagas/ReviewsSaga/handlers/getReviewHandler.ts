import { call, put } from "redux-saga/effects";
import axios from "axios";
import { GetReviewPayloadAction } from "@app/store/slices/ReviewsSlice/types";
import { setReviewSliceField } from "@app/store/slices/ReviewsSlice";

export function* getReviewHandler({ payload }: GetReviewPayloadAction) {
  try {
    yield put(setReviewSliceField({ key: "isLoading", value: true }));
    yield put(setReviewSliceField({ key: "error", value: null }));

    const token = localStorage.getItem("token");

    const { data } = yield call(axios.get, `/reviews/id/${payload.uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(
      setReviewSliceField({
        key: "selectedReview",
        value: data,
      })
    );
  } catch (error) {
    yield put(
      setReviewSliceField({
        key: "error",
        value: "Erro ao resgatar informações do livro, tente novamente.",
      })
    );
  } finally {
    yield put(setReviewSliceField({ key: "isLoading", value: false }));
  }
}
