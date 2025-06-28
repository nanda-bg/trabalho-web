import axios, { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import { Book } from "@app/types/Book";
import {
  setUserProfileSlice,
  setUserProfileSliceField,
} from "@app/store/slices/UserProfileSlice";
import { ListUserFavoritesPayloadAction } from "@app/store/slices/UserProfileSlice/types";
import Cookies from "js-cookie";
import _ from "lodash";

export function* listUserFavoritesHandler({
  payload,
}: ListUserFavoritesPayloadAction) {
  try {
    const { isLoading, lastFavoriteId } = yield select(
      (state) => state.userProfileSlice
    );

    yield put(
      setUserProfileSliceField({
        key: "isLoading",
        value: { ...isLoading, favorites: true },
      })
    );

    const token = Cookies.get("token");

    const { data }: AxiosResponse<Book[]> = yield call(
      axios.get,
      `/api/users/books/favorites`,
      {
        params: {
          userId: payload.userId,
          lastBookId: lastFavoriteId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { userFavorites, hasMore } = yield select((state) => state.userProfileSlice);

    const books = _.uniqBy(
      [...userFavorites, ...data],
      "bookId"
    );

    yield put(
      setUserProfileSlice({
        userFavorites: books,
        lastFavoriteId: _.last(data)?.bookId || null,
        hasMore: {
          ...hasMore,
          favorites: data.length > 0,
        },
      })
    );
  } catch (error) {
    yield put(
      setUserProfileSliceField({
        key: "error",
        value: "Erro ao carregar favoritos do usuário, tente novamente.",
      })
    );
  } finally {
    const { isLoading } = yield select((state) => state.userProfileSlice);
    yield put(
      setUserProfileSliceField({
        key: "isLoading",
        value: { ...isLoading, favorites: false },
      })
    );
  }
}