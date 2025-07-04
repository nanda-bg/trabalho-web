import { call, put, select } from "redux-saga/effects";
import { UpdateProfilePayloadAction } from "@app/store/slices/UserSlice/types";
import { fetchUserInfo, setUserSliceField } from "@app/store/slices/UserSlice";
import axios from "axios";
import Cookies from "js-cookie";

export function* updateProfileHandler({ payload }: UpdateProfilePayloadAction) {
  try {
    yield put(setUserSliceField({ key: "isLoading", value: true }));

    const { email, name, username, profileImage, bio, type } = payload;
    const { followers, following } = yield select((state) => state.userSlice);

    const userId = yield select((state) => state.userSlice.userId);
    const token = Cookies.get("token");

    yield call(
      axios.put,
      `/api/users/id/${userId}`,
      {
        email: email,
        name: name,
        username: username,
        profilePicture: profileImage,
        bio: bio,
        followers: followers,
        following: following,
        ...(type !== null ? { userType: type } : {}),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(fetchUserInfo({ uid: userId }));
  } catch (error) {
    yield put(
      setUserSliceField({
        key: "error",
        value: "Erro ao atualizar usuário, tente novamente mais tarde.",
      })
    );
  } finally {
    yield put(setUserSliceField({ key: "isLoading", value: false }));
  }
}
