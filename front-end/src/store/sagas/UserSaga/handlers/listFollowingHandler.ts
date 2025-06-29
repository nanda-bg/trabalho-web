import axios, { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { User } from "@app/types/User";
import Cookies from "js-cookie";
import { ListFollowingPayloadAction } from "@app/store/slices/UserSlice/types";
import { setUserSlice, setUserSliceField } from "@app/store/slices/UserSlice";

export function* listFollowingHandler({
  payload,
}: ListFollowingPayloadAction) {
  try {
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

    yield put(
      setUserSlice({
        following: data.length,
      })
    );
  } catch (error) {
    yield put(
      setUserSliceField({
        key: "error",
        value: "Erro ao carregar usuários seguidos, tente novamente.",
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
