import { takeEvery } from "redux-saga/effects";
import { listBooksByGenreHandler } from "./handlers/listBooksByGenreHandler";
import { listBookByGenre } from "@app/store/slices/BookByGenreSlice";

export function* watchBooksByGenreSagas() {
  yield takeEvery(listBookByGenre.type, listBooksByGenreHandler);
}
