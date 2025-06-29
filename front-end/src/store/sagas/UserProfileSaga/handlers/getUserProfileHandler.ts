import axios from "axios";
import { call, put, select } from "redux-saga/effects";
import {
  listUserFollowers,
  listUserFollowing,
  setUserProfileSlice,
  setUserProfileSliceField,
} from "@app/store/slices/UserProfileSlice";
import { GetUserProfilePayloadAction } from "@app/store/slices/UserProfileSlice/types";
import Cookies from "js-cookie";

export function* getUserProfileHandler({
  payload,
}: GetUserProfilePayloadAction) {
  try {
    const { isLoading } = yield select((state) => state.userProfileSlice);
    yield put(
      setUserProfileSliceField({
        key: "isLoading",
        value: { ...isLoading, profile: true },
      })
    );
    yield put(setUserProfileSliceField({ key: "error", value: null }));

    const token = Cookies.get("token");

    const { data } = yield call(axios.get, `/api/users/id/${payload.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(
      setUserProfileSlice({
        selectedUser: data,
      })
    );

    yield put(listUserFollowers({ userId: payload.userId }));
    yield put(listUserFollowing({ userId: payload.userId }));
  } catch (error) {
    yield put(
      setUserProfileSliceField({
        key: "error",
        value: "Erro ao carregar perfil do usuário, tente novamente.",
      })
    );
  } finally {
    const { isLoading } = yield select((state) => state.userProfileSlice);
    yield put(
      setUserProfileSliceField({
        key: "isLoading",
        value: { ...isLoading, profile: false },
      })
    );
  }
}
