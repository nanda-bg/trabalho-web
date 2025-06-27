import { takeEvery } from "redux-saga/effects";
import { listMyReviewsHandler } from "./handlers/./listMyReviewsHandler";
import { listFriendReviewsHandler } from "./handlers/listFriendReviewsHandler";
import { listMyReviews, listFriendReviews } from "@app/store/slices/ReviewsFeedSlice";

export function* watchReviewsFeedSagas() {
  yield takeEvery(listMyReviews.type, listMyReviewsHandler);
  yield takeEvery(listFriendReviews.type, listFriendReviewsHandler);
}