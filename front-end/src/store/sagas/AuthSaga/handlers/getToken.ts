import { setAuthSlice } from "@app/store/slices/Auth";
import axios from "axios";
import Cookies from "js-cookie";
import { call, put } from "redux-saga/effects";

export function* getToken(email: string, password: string) {
  try {
    const response = yield call(
      axios.post,
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2AJWdGjTKoCd4OB_dODSosbtfZ3w4aUs",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    Cookies.set("token", response.data.idToken, {
      secure: true,
      sameSite: "strict"
    });

    yield put(setAuthSlice({ isAuthenticated: true }));
    return response.data.idToken;
  } catch (error) {
    yield put(
      setAuthSlice({
        isAuthenticated: false,
        error: "Erro ao autenticar usuário, tente novamente mais tarde.",
      })
    );
  }
}
