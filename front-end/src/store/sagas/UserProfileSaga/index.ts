import { takeLatest } from "redux-saga/effects";
import { getUserProfileHandler } from "./handlers/getUserProfileHandler";
import { listUserReviewsHandler } from "./handlers/listUserReviewsHandler";
import { listUserFollowersHandler } from "./handlers/listUserFollowersHandler";
import { listUserFollowingHandler } from "./handlers/listUserFollowingHandler";
import { followUserHandler } from "./handlers/followUserHandler";
import {
  getUserProfile,
  listUserReviews,
  listUserFollowers,
  listUserFollowing,
  followUser,
} from "@app/store/slices/UserProfileSlice";

export function* watchUserProfileSagas() {
  yield takeLatest(getUserProfile.type, getUserProfileHandler);
  yield takeLatest(listUserReviews.type, listUserReviewsHandler);
  yield takeLatest(listUserFollowers.type, listUserFollowersHandler);
  yield takeLatest(listUserFollowing.type, listUserFollowingHandler);
  yield takeLatest(followUser.type, followUserHandler);
}