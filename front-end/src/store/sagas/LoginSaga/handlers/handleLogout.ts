import { auth } from "@app/config/firebaseConfig";
import { setLoginSliceField } from "@app/store/slices/LoginSlice";
import { setUserSlice } from "@app/store/slices/UserSlice";
import { call, put } from "redux-saga/effects";

function signOut() {
  auth.signOut();
}

export function* handleLogout() {
  try {
    yield put(setLoginSliceField({ key: "isLoading", value: true }));
    yield put(setLoginSliceField({ key: "logoutError", value: null }));

    yield call(signOut);

    yield put(
      setUserSlice({
        userId: null,
        email: null,
        username: null,
      })
    );
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
