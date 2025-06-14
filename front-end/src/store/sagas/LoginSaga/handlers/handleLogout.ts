import { resetAuthSlice } from "@app/store/slices/Auth";
import { resetBookByGenreSlice } from "@app/store/slices/BookByGenreSlice";
import { resetBookDetailsSlice } from "@app/store/slices/BookDetailsSlice";
import { resetBookSlice } from "@app/store/slices/BooksSlice";
import {
  resetLoginSlice,
  setLoginSliceField,
} from "@app/store/slices/LoginSlice";
import { resetReviewSlice } from "@app/store/slices/ReviewsSlice";
import { resetSignUpSlice } from "@app/store/slices/SignUpSlice";
import { resetUserSlice } from "@app/store/slices/UserSlice";
import { persistor } from "@app/store/store";
import Cookies from "js-cookie";
import { all, call, put } from "redux-saga/effects";

export function* handleLogout() {
  try {
    yield put(setLoginSliceField({ key: "isLoading", value: true }));
    yield put(setLoginSliceField({ key: "logoutError", value: null }));

    Cookies.remove("token", { secure: true, sameSite: "strict" });

    yield all([
      put(resetAuthSlice()),
      put(resetBookSlice()),
      put(resetLoginSlice()),
      put(resetReviewSlice()),
      put(resetSignUpSlice()),
      put(resetUserSlice()),
      put(resetBookByGenreSlice()),
      put(resetBookDetailsSlice()),
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
