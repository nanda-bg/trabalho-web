import { call, put } from "redux-saga/effects";
import { setLoginSliceField } from "@app/store/slices/LoginSlice";
import { LoginPayloadAction } from "@app/store/slices/LoginSlice/types";
import { fetchUserInfo } from "@app/store/slices/UserSlice";
import { getToken } from "../../AuthSaga/handlers/getToken";
import axios from "axios";
import Cookies from "js-cookie";

export function* handleLogin({ payload }: LoginPayloadAction) {
  try {
    yield put(setLoginSliceField({ key: "isLoading", value: true }));
    yield put(setLoginSliceField({ key: "loginError", value: null }));

    yield call(getToken, payload.email, payload.password);

    const token = Cookies.get("token");

    const response = yield call(axios.post, "/auth/verify-token", {
      token: token,
    });

    yield put(fetchUserInfo({ uid: response.data.uid }));
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
