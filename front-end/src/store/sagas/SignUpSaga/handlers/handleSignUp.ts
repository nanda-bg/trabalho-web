import { call, put } from "redux-saga/effects";
import {
  setSignUpSlice,
  setSignUpSliceField,
} from "@app/store/slices/SignUpSlice";
import { SignUpPayloadAction } from "@app/store/slices/SignUpSlice/types";
import axios from "axios";

function isEmailValide(email) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return false;
  }

  return true;
}

function isPasswordValide(password) {
  if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
    return false;
  }

  return true;
}

export function* handleSignUp({ payload }: SignUpPayloadAction) {
  try {
    yield put(setSignUpSliceField({ key: "isLoading", value: true }));

    yield put(
      setSignUpSlice({
        emailError: null,
        passwordError: null,
        defaultError: null,
        usernameError: null,
      })
    );

    const { email, password, name, username } = payload;

    const errors = {
      emailError: null,
      passwordError: null,
    };

    if (!email || !password || !name || !username) {
      yield put(
        setSignUpSliceField({
          key: "defaultError",
          value: "Preencha todos os campos.",
        })
      );
      return;
    }

    if (!isEmailValide(email)) {
      errors.emailError = "Por favor, insira um endereço de e-mail válido.";
    }

    if (!isPasswordValide(password)) {
      errors.passwordError = `A senha precisa ter:\n• No mínimo 8 caracteres\n• Um número\n• Uma letra maiúscula`;
    }

    if (errors.emailError || errors.passwordError) {
      if (errors.emailError) {
        yield put(
          setSignUpSliceField({
            key: "emailError",
            value: errors.emailError,
          })
        );
      }

      if (errors.passwordError) {
        yield put(
          setSignUpSliceField({
            key: "passwordError",
            value: errors.passwordError,
          })
        );
      }

      return;
    }

    yield call(axios.post, "/api/auth/register", {
      email,
      password,
      name,
      username,
    });

    yield put(setSignUpSliceField({ key: "isSuccessfull", value: true }));
  } catch (error) {
    if (error.response.data === "Usuário já cadastrado com esse email!") {
      yield put(
        setSignUpSliceField({
          key: "emailError",
          value: "Email já cadastrado.",
        })
      );

      return;
    }

    if (error.response.data === "Username já cadastrado!") {
      yield put(
        setSignUpSliceField({
          key: "usernameError",
          value: "Este nome de usuário já está em uso.",
        })
      );

      return;
    }

    yield put(
      setSignUpSliceField({
        key: "defaultError",
        value: "Erro ao cadastrar usuário, tente novamente mais tarde.",
      })
    );
  } finally {
    yield put(setSignUpSliceField({ key: "isLoading", value: false }));
  }
}
