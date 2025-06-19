import { listReviewsByUser } from "@app/store/slices/ReviewsByUserSlice";
import { takeLatest } from "redux-saga/effects";
import { listReviewsByUserHandler } from "./handlers/listReviewsByUserHandler";

export function* watchReviewsByUserSagas() {
  yield takeLatest(listReviewsByUser.type, listReviewsByUserHandler);
}
