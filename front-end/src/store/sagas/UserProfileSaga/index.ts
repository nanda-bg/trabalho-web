import { takeEvery } from "redux-saga/effects";
import { getUserProfileHandler } from "./handlers/getUserProfileHandler";
import { listUserReviewsHandler } from "./handlers/listUserReviewsHandler";
import { listUserFavoritesHandler } from "./handlers/listUserFavoritesHandler";
import { listUserFollowersHandler } from "./handlers/listUserFollowersHandler";
import { listUserFollowingHandler } from "./handlers/listUserFollowingHandler";
import { followUserHandler } from "./handlers/followUserHandler";
import {
  getUserProfile,
  listUserReviews,
  listUserFavorites,
  listUserFollowers,
  listUserFollowing,
  followUser,
} from "@app/store/slices/UserProfileSlice";

export function* watchUserProfileSagas() {
  yield takeEvery(getUserProfile.type, getUserProfileHandler);
  yield takeEvery(listUserReviews.type, listUserReviewsHandler);
  yield takeEvery(listUserFavorites.type, listUserFavoritesHandler);
  yield takeEvery(listUserFollowers.type, listUserFollowersHandler);
  yield takeEvery(listUserFollowing.type, listUserFollowingHandler);
  yield takeEvery(followUser.type, followUserHandler);
}