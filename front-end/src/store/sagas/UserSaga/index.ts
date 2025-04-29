import { takeLatest } from "redux-saga/effects";
import { fetchUserInfoHandler } from "./handlers/fetchUserInfoHandler";
import { fetchUserInfo, updateProfile } from "@app/store/slices/UserSlice";
import { updateProfileHandler } from "./handlers/updateProfileHandler";

export function* watchUserSagas() {
  yield takeLatest(fetchUserInfo.type, fetchUserInfoHandler);
  yield takeLatest(updateProfile.type, updateProfileHandler)
}
