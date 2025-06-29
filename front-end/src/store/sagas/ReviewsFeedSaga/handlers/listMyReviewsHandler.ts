import axios, { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import { Review } from "@app/types/Review";
import {
  setReviewsFeedSlice,
  setReviewsFeedSliceField,
} from "@app/store/slices/ReviewsFeedSlice";
import { ListMyReviewsPayloadAction } from "@app/store/slices/ReviewsFeedSlice/types";
import Cookies from "js-cookie";
import _ from "lodash";

export function* listMyReviewsHandler({
  payload,
}: ListMyReviewsPayloadAction) {
  try {
    const { isLoading, lastReviewId } = yield select(
      (state) => state.reviewsFeedSlice
    );

    yield put(
      setReviewsFeedSliceField({
        key: "isLoading",
        value: { ...isLoading, myReviews: true },
      })
    );
    yield put(setReviewsFeedSliceField({ key: "error", value: null }));

    const token = Cookies.get("token");

    const { data }: AxiosResponse<Review[]> = yield call(
      axios.get,
      `/api/reviews/user/${payload.userId}`,
      {
        params: {
          lastReviewId: lastReviewId.myReviews,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { myReviews, hasMore } = yield select((state) => state.reviewsFeedSlice);

    const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const reviews = _.uniqBy(
      [...myReviews, ...sortedData],
      "reviewId"
    );

    const finalSortedReviews = reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    yield put(
      setReviewsFeedSlice({
        myReviews: finalSortedReviews,
        lastReviewId: {
          ...lastReviewId,
          myReviews: _.last(sortedData)?.reviewId || null,
        },
        hasMore: {
          ...hasMore,
          myReviews: data.length > 0,
        },
      })
    );
  } catch (error) {
    yield put(
      setReviewsFeedSliceField({
        key: "error",
        value: "Erro ao resgatar suas avaliações, tente novamente.",
      })
    );
  } finally {
    const { isLoading } = yield select((state) => state.reviewsFeedSlice);
    yield put(
      setReviewsFeedSliceField({
        key: "isLoading",
        value: { ...isLoading, myReviews: false },
      })
    );
  }
}