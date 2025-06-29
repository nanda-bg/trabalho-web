import { takeLatest } from "redux-saga/effects";
import { listMyReviewsHandler } from "./handlers/./listMyReviewsHandler";
import { listFriendReviewsHandler } from "./handlers/listFriendReviewsHandler";
import { listMyReviews, listFriendReviews } from "@app/store/slices/ReviewsFeedSlice";

export function* watchReviewsFeedSagas() {
  yield takeLatest(listMyReviews.type, listMyReviewsHandler);
  yield takeLatest(listFriendReviews.type, listFriendReviewsHandler);
}