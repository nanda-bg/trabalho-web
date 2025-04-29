import { put } from "redux-saga/effects";
import { setLoginSliceField } from "@app/store/slices/LoginSlice";
import { LoginPayloadAction } from "@app/store/slices/LoginSlice/types";
import { fetchUserInfo } from "@app/store/slices/UserSlice";

export function* handleLogin({ payload }: LoginPayloadAction) {
  try {
    yield put(setLoginSliceField({ key: "isLoading", value: true }));
    yield put(setLoginSliceField({ key: "loginError", value: null }));

    yield put(fetchUserInfo());
  } catch (error) {
    yield put(
      setLoginSliceField({
        key: "loginError",
        value: "E-mail ou senha inválidos",
      })
    );
  } finally {
    yield put(setLoginSliceField({ key: "isLoading", value: false }));
  }
}
