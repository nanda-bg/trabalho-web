import {
  createReview,
  getReview,
  listReviewsByBook,
} from "@app/store/slices/ReviewsByBookSlice";
import { takeLatest } from "redux-saga/effects";
import { getReviewHandler } from "./handlers/getReviewHandler";
import { listReviewsByBookHandler } from "./handlers/listReviewsByBookHandler";
import { createReviewHandler } from "./handlers/createReviewHandler";

export function* watchReviewsByBookSagas() {
  yield takeLatest(getReview.type, getReviewHandler);
  yield takeLatest(listReviewsByBook.type, listReviewsByBookHandler);
  yield takeLatest(createReview.type, createReviewHandler);
}
