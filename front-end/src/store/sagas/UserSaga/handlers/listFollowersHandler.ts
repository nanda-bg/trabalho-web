import axios, { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { User } from "@app/types/User";
import Cookies from "js-cookie";
import { ListFollowersPayloadAction } from "@app/store/slices/UserSlice/types";
import { setUserSlice, setUserSliceField } from "@app/store/slices/UserSlice";

export function* listFollowersHandler({
  payload,
}: ListFollowersPayloadAction) {
  try {
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

    yield put(
      setUserSlice({
        followers: data.length,
      })
    );
  } catch (error) {
    yield put(
      setUserSliceField({
        key: "error",
        value: "Erro ao carregar seguidores, tente novamente.",
      })
    );
  } finally {
    yield put(
      setUserSliceField({
        key: "isLoading",
        value: false,
      })
    );
  }
}
