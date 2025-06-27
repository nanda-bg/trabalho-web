import { call, put } from "redux-saga/effects";
import axios from "axios";
import { GetReviewPayloadAction } from "@app/store/slices/ReviewsByBookSlice/types";
import { setReviewsByBookSliceField } from "@app/store/slices/ReviewsByBookSlice";
import Cookies from "js-cookie";

export function* getReviewHandler({ payload }: GetReviewPayloadAction) {
  try {
    yield put(setReviewsByBookSliceField({ key: "isLoading", value: true }));
    yield put(setReviewsByBookSliceField({ key: "error", value: null }));

    const token = Cookies.get("token");

    const { data } = yield call(axios.get, `/api/reviews/id/${payload.uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(
      setReviewsByBookSliceField({
        key: "selectedReview",
        value: data,
      })
    );
  } catch (error) {
    yield put(
      setReviewsByBookSliceField({
        key: "error",
        value: "Erro ao resgatar informações do livro, tente novamente.",
      })
    );
  } finally {
    yield put(setReviewsByBookSliceField({ key: "isLoading", value: false }));
  }
}
