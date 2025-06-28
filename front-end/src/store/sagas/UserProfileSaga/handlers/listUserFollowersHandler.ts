import axios, { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import { User } from "@app/types/User";
import {
  setUserProfileSlice,
  setUserProfileSliceField,
} from "@app/store/slices/UserProfileSlice";
import { ListUserFollowersPayloadAction } from "@app/store/slices/UserProfileSlice/types";
import Cookies from "js-cookie";

export function* listUserFollowersHandler({
  payload,
}: ListUserFollowersPayloadAction) {
  try {
    const { userId } = yield select((state) => state.userSlice);

    const token = Cookies.get("token");

    const { data }: AxiosResponse<User[]> = yield call(
      axios.get,
      `/api/users/${payload.userId}/followers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const isCurrentUserFollowing = data.some(
      (follower) => follower.uid === userId
    );

    yield put(
      setUserProfileSlice({
        isFollowing: isCurrentUserFollowing,
        followers: data,
        followersCount: data.length,
      })
    );
  } catch (error) {
    console.error("Error fetching user followers:", error); //apaga
    yield put(
      setUserProfileSliceField({
        key: "error",
        value: "Erro ao carregar seguidores, tente novamente.",
      })
    );
  } finally {
    const { isLoading } = yield select((state) => state.userProfileSlice);
    yield put(
      setUserProfileSliceField({
        key: "isLoading",
        value: { ...isLoading, followers: false },
      })
    );
  }
}
