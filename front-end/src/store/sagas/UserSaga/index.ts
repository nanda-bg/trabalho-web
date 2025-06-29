import { takeLatest } from "redux-saga/effects";
import { fetchUserInfoHandler } from "./handlers/fetchUserInfoHandler";
import { fetchUserInfo, listFollowers, listFollowing, updateProfile } from "@app/store/slices/UserSlice";
import { updateProfileHandler } from "./handlers/updateProfileHandler";
import { listFollowersHandler } from "./handlers/listFollowersHandler";
import { listFollowingHandler } from "./handlers/listFollowingHandler";

export function* watchUserSagas() {
  yield takeLatest(fetchUserInfo.type, fetchUserInfoHandler);
  yield takeLatest(updateProfile.type, updateProfileHandler);
  yield takeLatest(listFollowers.type, listFollowersHandler);
  yield takeLatest(listFollowing.type, listFollowingHandler);
}
