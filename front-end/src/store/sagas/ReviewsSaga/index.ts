
import { getReview, listReviewsByBook } from "@app/store/slices/ReviewsSlice";
import { takeLatest } from "redux-saga/effects";
import { getReviewHandler } from "./handlers/getReviewHandler";
import { listReviewsByReviewHandler } from "./handlers/listReviewsByBookHandler";

export function* watchReviewsSagas() {
  yield takeLatest(getReview.type, getReviewHandler);
  yield takeLatest(listReviewsByBook.type, listReviewsByReviewHandler);}
