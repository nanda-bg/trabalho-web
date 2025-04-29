import { put } from "redux-saga/effects";
import { UpdateProfilePayloadAction } from "@app/store/slices/UserSlice/types";
import { setUserSlice, setUserSliceField } from "@app/store/slices/UserSlice";
import { mockedUser } from "@app/utils/mocks/MockedUser";

export function* updateProfileHandler({ payload }: UpdateProfilePayloadAction) {
  try {
    yield put(setUserSliceField({ key: "isLoading", value: true }));

    const { email, name, username, profileImage, bio } = payload;

    yield put(
      setUserSlice({
        userId: mockedUser.userId,
        email: email,
        username: username,
        name: name,
        profilePicture: profileImage,
        bio: bio,
      })
    );
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
