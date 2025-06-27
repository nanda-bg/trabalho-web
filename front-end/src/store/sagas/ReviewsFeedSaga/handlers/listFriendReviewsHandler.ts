import axios, { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import { Review } from "@app/types/Review";
import {
  setReviewsFeedSlice,
  setReviewsFeedSliceField,
} from "@app/store/slices/ReviewsFeedSlice";
import { ListFriendReviewsPayloadAction } from "@app/store/slices/ReviewsFeedSlice/types";
import Cookies from "js-cookie";
import _ from "lodash";

export function* listFriendReviewsHandler({
  payload,
}: ListFriendReviewsPayloadAction) {
  try {
    const { isLoading, lastReviewId } = yield select(
      (state) => state.reviewsFeedSlice
    );

    yield put(
      setReviewsFeedSliceField({
        key: "isLoading",
        value: { ...isLoading, friendReviews: true },
      })
    );
    yield put(setReviewsFeedSliceField({ key: "error", value: null }));

    const token = Cookies.get("token");

    const { data }: AxiosResponse<Review[]> = yield call(
      axios.get,
      `/reviews/feed`,
      {
        params: {
          lastReviewId: lastReviewId.friendReviews,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { friendReviews, hasMore } = yield select((state) => state.reviewsFeedSlice);

    const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const reviews = _.uniqBy(
      [...friendReviews, ...sortedData],
      "reviewId"
    );

    const finalSortedReviews = reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    yield put(
      setReviewsFeedSlice({
        friendReviews: finalSortedReviews,
        lastReviewId: {
          ...lastReviewId,
          friendReviews: _.last(sortedData)?.reviewId || null,
        },
        hasMore: {
          ...hasMore,
          friendReviews: data.length > 0,
        },
      })
    );
  } catch (error) {
    yield put(
      setReviewsFeedSliceField({
        key: "error",
        value: "Erro ao resgatar avaliações dos amigos, tente novamente.",
      })
    );
  } finally {
    const { isLoading } = yield select((state) => state.reviewsFeedSlice);
    yield put(
      setReviewsFeedSliceField({
        key: "isLoading",
        value: { ...isLoading, friendReviews: false },
      })
    );
  }
}