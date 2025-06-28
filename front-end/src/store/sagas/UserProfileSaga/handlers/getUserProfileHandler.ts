import axios from "axios";
import { call, put } from "redux-saga/effects";
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
    yield put(
      setUserProfileSliceField({
        key: "isLoading",
        value: { profile: true, reviews: false, favorites: false, followers: false, following: false, followAction: false },
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
        followersCount: data.followers || 0,
        followingCount: data.following || 0,
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
    yield put(
      setUserProfileSliceField({
        key: "isLoading",
        value: { profile: false, reviews: false, favorites: false, followers: false, following: false, followAction: false },
      })
    );
  }
}