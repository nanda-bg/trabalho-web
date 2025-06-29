import { listFollowers, listFollowing, setUserSlice, setUserSliceField } from "@app/store/slices/UserSlice";
import { FetchUserInfoPayloadAction } from "@app/store/slices/UserSlice/types";
import axios from "axios";
import Cookies from "js-cookie";
import { call, put } from "redux-saga/effects";

export function* fetchUserInfoHandler({ payload }: FetchUserInfoPayloadAction) {
  try {
    yield put(setUserSliceField({ key: "isLoading", value: true }));

    const token = Cookies.get("token");

    const { data } = yield call(axios.get, `/api/users/id/${payload.uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(listFollowers({ userId: data.uid }));
    yield put(listFollowing({ userId: data.uid }));

    yield put(
      setUserSlice({
        userId: data.uid,
        email: data.email,
        username: data.username,
        name: data.name,
        profilePicture: data.profilePicture,
        bio: data.bio,
        type: data.userType,
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
