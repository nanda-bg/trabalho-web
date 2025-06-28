import axios from "axios";
import { call, put, select } from "redux-saga/effects";
import {
  getUserProfile,
  setUserProfileSliceField,
} from "@app/store/slices/UserProfileSlice";
import { FollowUserPayloadAction } from "@app/store/slices/UserProfileSlice/types";
import Cookies from "js-cookie";
import { get } from "http";

export function* followUserHandler({ payload }: FollowUserPayloadAction) {
  try {
    const { isLoading } = yield select((state) => state.userProfileSlice);

    yield put(
      setUserProfileSliceField({
        key: "isLoading",
        value: { ...isLoading, followAction: true },
      })
    );

    const token = Cookies.get("token");

    const { data } = yield call(
      axios.post,
      `/api/users/follow/${payload.userId}`,
      { Authorization: `Bearer ${token}` },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(getUserProfile({ userId: payload.userId }));
  } catch (error) {
    yield put(
      setUserProfileSliceField({
        key: "error",
        value: "Erro ao seguir usuário, tente novamente.",
      })
    );
  } finally {
    const { isLoading } = yield select((state) => state.userProfileSlice);
    yield put(
      setUserProfileSliceField({
        key: "isLoading",
        value: { ...isLoading, followAction: false },
      })
    );
  }
}
