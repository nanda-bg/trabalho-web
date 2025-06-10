import { setUserSlice, setUserSliceField } from "@app/store/slices/UserSlice";
import { FetchUserInfoPayloadAction } from "@app/store/slices/UserSlice/types";
import axios from "axios";
import { call, put } from "redux-saga/effects";

export function* fetchUserInfoHandler({ payload }: FetchUserInfoPayloadAction) {
  try {
    yield put(setUserSliceField({ key: "isLoading", value: true }));

    const token = localStorage.getItem("token");

    const { data } = yield call(axios.get, `/users/id/${payload.uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(
      setUserSlice({
        userId: data.uid,
        email: data.email,
        username: data.username,
        name: data.name,
        profilePicture: data.profilePicture,
        bio: data.bio,
        followers: data.followers,
        following: data.following,
      })
    );
  } catch (error) {
    yield put(
      setUserSliceField({
        key: "error",
        value: "Erro ao resgatar informações do usuário, tente novamente.",
      })
    );
  } finally {
    yield put(setUserSliceField({ key: "isLoading", value: false }));
  }
}
