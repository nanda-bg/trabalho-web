import { setAuthSlice } from "@app/store/slices/Auth";
import { setLoginSliceField } from "@app/store/slices/LoginSlice";
import { persistor } from "@app/store/store";
import { put } from "redux-saga/effects";

export function* handleLogout() {
  try {
    yield put(setLoginSliceField({ key: "isLoading", value: true }));
    yield put(setLoginSliceField({ key: "logoutError", value: null }));

    localStorage.removeItem("token");

    yield put(
      setAuthSlice({
        isAuthenticated: false,
      })
    );

    yield persistor.purge();
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
