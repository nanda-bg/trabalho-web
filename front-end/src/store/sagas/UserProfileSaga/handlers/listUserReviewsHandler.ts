import axios, { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import { Review } from "@app/types/Review";
import {
  setUserProfileSlice,
  setUserProfileSliceField,
} from "@app/store/slices/UserProfileSlice";
import { ListUserReviewsPayloadAction } from "@app/store/slices/UserProfileSlice/types";
import Cookies from "js-cookie";
import _ from "lodash";

export function* listUserReviewsHandler({
  payload,
}: ListUserReviewsPayloadAction) {
  try {
    const { isLoading, lastReviewId } = yield select(
      (state) => state.userProfileSlice
    );

    yield put(
      setUserProfileSliceField({
        key: "isLoading",
        value: { ...isLoading, reviews: true },
      })
    );

    const token = Cookies.get("token");

    const { data }: AxiosResponse<Review[]> = yield call(
      axios.get,
      `/api/reviews/user/${payload.userId}`,
      {
        params: {
          lastReviewId: lastReviewId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { userReviews, hasMore } = yield select((state) => state.userProfileSlice);

    const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const reviews = _.uniqBy(
      [...userReviews, ...sortedData],
      "reviewId"
    );

    const finalSortedReviews = reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    yield put(
      setUserProfileSlice({
        userReviews: finalSortedReviews,
        lastReviewId: _.last(sortedData)?.reviewId || null,
        hasMore: {
          ...hasMore,
          reviews: data.length > 0,
        },
      })
    );
  } catch (error) {
    yield put(
      setUserProfileSliceField({
        key: "error",
        value: "Erro ao carregar avaliações do usuário, tente novamente.",
      })
    );
  } finally {
    const { isLoading } = yield select((state) => state.userProfileSlice);
    yield put(
      setUserProfileSliceField({
        key: "isLoading",
        value: { ...isLoading, reviews: false },
      })
    );
  }
}