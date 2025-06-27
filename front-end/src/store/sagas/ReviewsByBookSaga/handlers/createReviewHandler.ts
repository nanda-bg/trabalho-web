import { call, put, select } from "redux-saga/effects";
import axios from "axios";
import { CreateReviewPayloadAction } from "@app/store/slices/ReviewsByBookSlice/types";
import {
  setReviewsByBookSlice,
  setReviewsByBookSliceField,
} from "@app/store/slices/ReviewsByBookSlice";
import Cookies from "js-cookie";

export function* createReviewHandler({ payload }: CreateReviewPayloadAction) {
  try {
    yield put(
      setReviewsByBookSlice({
        isLoading: true,
        createReviewError: null,
        createReviewSuccess: false,
      })
    );
    yield put(
      setReviewsByBookSliceField({ key: "createReviewError", value: null })
    );

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
      setReviewsByBookSliceField({
        key: "createReviewSuccess",
        value: true,
      })
    );
  } catch (error) {
    yield put(
      setReviewsByBookSliceField({
        key: "createReviewError",
        value: "Erro ao criar avaliação, tente novamente mais tarde.",
      })
    );
  } finally {
    yield put(setReviewsByBookSliceField({ key: "isLoading", value: false }));
  }
}
