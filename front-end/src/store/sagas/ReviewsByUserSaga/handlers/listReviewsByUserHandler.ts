import {
  setReviewsByUserlice,
  setReviewsByUserliceField,
} from "@app/store/slices/ReviewsByUserSlice";
import { ListReviewsByUserPayloadAction } from "@app/store/slices/ReviewsByUserSlice/types";
import axios from "axios";
import Cookies from "js-cookie";
import { call, put } from "redux-saga/effects";

export function* listReviewsByUserHandler({
  payload,
}: ListReviewsByUserPayloadAction) {
  try {
    yield put(setReviewsByUserlice({ isLoading: true, error: null }));

    const token = Cookies.get("token");

    const { data } = yield call(axios.get, `/reviews/user/${payload.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(
      setReviewsByUserliceField({
        key: "reviewsByUser",
        value: data,
      })
    );
  } catch (error) {
    yield put(
      setReviewsByUserliceField({
        key: "error",
        value: "Erro ao resgatar avaliações, tente novamente.",
      })
    );
  } finally {
    yield put(setReviewsByUserliceField({ key: "isLoading", value: false }));
  }
}
