import axios, { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import { User } from "@app/types/User";
import {
  setUserProfileSlice,
  setUserProfileSliceField,
} from "@app/store/slices/UserProfileSlice";
import { ListUserFollowingPayloadAction } from "@app/store/slices/UserProfileSlice/types";
import Cookies from "js-cookie";

export function* listUserFollowingHandler({
  payload,
}: ListUserFollowingPayloadAction) {
  try {
    ("Fetching user following..."); //apaga
    const { isLoading } = yield select((state) => state.userProfileSlice);

    const { userId } = yield select((state) => state.userSlice);

    const token = Cookies.get("token");

    const { data }: AxiosResponse<User[]> = yield call(
      axios.get,
      `/api/users/${payload.userId}/following`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const isFollowingCurrentUser = data.some(
      (follower) => follower.uid === userId
    );

    yield put(
      setUserProfileSlice({
        following: data,
        isFollowingCurrentUser: isFollowingCurrentUser,
        followingCount: data.length,
      })
    );
  } catch (error) {
    console.error("Error fetching user following:", error); //apaga
    yield put(
      setUserProfileSliceField({
        key: "error",
        value: "Erro ao carregar usuários seguidos, tente novamente.",
      })
    );
  } finally {
    const { isLoading } = yield select((state) => state.userProfileSlice);
    yield put(
      setUserProfileSliceField({
        key: "isLoading",
        value: { ...isLoading, following: false },
      })
    );
  }
}
