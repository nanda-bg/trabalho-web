import { call, put, select } from "redux-saga/effects";
import axios from "axios";
import { CreateReviewPayloadAction } from "@app/store/slices/ReviewsSlice/types";
import {
  setReviewSlice,
  setReviewSliceField,
} from "@app/store/slices/ReviewsSlice";
import Cookies from "js-cookie";

export function* createReviewHandler({ payload }: CreateReviewPayloadAction) {
  try {
    yield put(
      setReviewSlice({
        isLoading: true,
        createReviewError: null,
        createReviewSuccess: false,
      })
    );
    yield put(setReviewSliceField({ key: "createReviewError", value: null }));

    const token = Cookies.get("token");
    const userId = yield select((state) => state.userSlice.userId);

    yield call(
      axios.post,
      `/api/reviews`,
      {
        userUid: userId,
        ...payload,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(
      setReviewSliceField({
        key: "createReviewSuccess",
        value: true,
      })
    );
  } catch (error) {
    yield put(
      setReviewSliceField({
        key: "createReviewError",
        value: "Erro ao criar avaliação, tente novamente mais tarde.",
      })
    );
  } finally {
    yield put(setReviewSliceField({ key: "isLoading", value: false }));
  }
}
