import { listReviews } from "@app/store/slices/ReviewsSlice";
import { takeLatest } from "redux-saga/effects";
import { listReviewsHandler } from "./handlers/listReviewsHandler";

export function* watchReviewsSagas() {
  yield takeLatest(listReviews.type, listReviewsHandler);
}
