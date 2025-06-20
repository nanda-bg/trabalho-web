import { call, put } from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";
import {
  setCreateBookSlice,
  setCreateBookSliceField,
} from "@app/store/slices/CreateBookSlice";
import { CreateBookPayloadAction } from "@app/store/slices/CreateBookSlice/types";

export function* createBookHandler({ payload }: CreateBookPayloadAction) {
  try {
    yield put(
      setCreateBookSlice({
        isLoading: true,
        error: null,
        success: false,
      })
    );

    const token = Cookies.get("token");

    const { data } = yield call(
      axios.post,
      `/books`,
      {
        ...payload,
        genres: [payload.genre]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Book created successfully:", data);

    yield put(
      setCreateBookSliceField({
        key: "success",
        value: true,
      })
    );
  } catch (error) {
    yield put(
      setCreateBookSliceField({
        key: "error",
        value: "Erro ao criar livro, tente novamente mais tarde.",
      })
    );
  } finally {
    yield put(setCreateBookSliceField({ key: "isLoading", value: false }));
  }
}
