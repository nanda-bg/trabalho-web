import { setUserSlice, setUserSliceField } from "@app/store/slices/UserSlice";
import { mockedUser } from "@app/utils/mocks/MockedUser";
import { put } from "redux-saga/effects";

export function* fetchUserInfoHandler() {
  try {
    yield put(setUserSliceField({ key: "isLoading", value: true }));

    yield put(
      setUserSlice({
        userId: mockedUser.userId,
        email: mockedUser.email,
        username: mockedUser.username,
        name: mockedUser.name,
        profilePicture: mockedUser.profilePicture,
        bio: mockedUser.bio
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
