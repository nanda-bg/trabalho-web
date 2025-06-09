import { call, put, select } from "redux-saga/effects";
import { UpdateProfilePayloadAction } from "@app/store/slices/UserSlice/types";
import { fetchUserInfo, setUserSliceField } from "@app/store/slices/UserSlice";
import axios from "axios";

export function* updateProfileHandler({ payload }: UpdateProfilePayloadAction) {
  try {
    yield put(setUserSliceField({ key: "isLoading", value: true }));

    const { email, name, username, profileImage, bio } = payload;
    const userId = yield select((state) => state.userSlice.userId);
    const token = yield select((state) => state.authSlice.token);

    yield call(
      axios.put,
      `/users/id/${userId}`,
      {
        email: email,
        name: name,
        username: username,
        profilePicture: profileImage,
        bio: bio,
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
