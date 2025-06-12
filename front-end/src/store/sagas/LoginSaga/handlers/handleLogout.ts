import { resetAuthSlice } from "@app/store/slices/Auth";
import { resetBookSlice } from "@app/store/slices/BooksSlice";
import {
  resetLoginSlice,
  setLoginSliceField,
} from "@app/store/slices/LoginSlice";
import { resetReviewSlice } from "@app/store/slices/ReviewsSlice";
import { resetSignUpSlice } from "@app/store/slices/SignUpSlice";
import { resetUserSlice } from "@app/store/slices/UserSlice";
import { persistor } from "@app/store/store";
import { all, call, put } from "redux-saga/effects";

export function* handleLogout() {
  try {
    yield put(setLoginSliceField({ key: "isLoading", value: true }));
    yield put(setLoginSliceField({ key: "logoutError", value: null }));

    localStorage.removeItem("token");

    yield all([
      put(resetAuthSlice()),
      put(resetBookSlice()),
      put(resetLoginSlice()),
      put(resetReviewSlice()),
      put(resetSignUpSlice()),
      put(resetUserSlice()),
    ]);

    yield call(persistor.purge);
  } catch (error) {
    yield put(
      setLoginSliceField({
        key: "logoutError",
        value: "Erro ao fazer logout",
      })
    );
  } finally {
    yield put(setLoginSliceField({ key: "isLoading", value: false }));
  }
}
