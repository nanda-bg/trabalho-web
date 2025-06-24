import { takeLatest } from "redux-saga/effects";
import { listReadingListBooksHandler } from "./handlers/listReadingListBooksHandler";
import { checkIsBookInReadingListHandler } from "./handlers/checkIsBookInReadingListHandler";
import { addBookToReadingListHandler } from "./handlers/addBookToReadingListHandler";
import { removeBookFromReadingListHandler } from "./handlers/removeBookFromReadingListHandler";
import { 
  listReadingListBooks,
  checkIsBookInReadingList,
  addBookToReadingList,
  removeBookFromReadingList
} from "@app/store/slices/ReadingListSlice";

export function* watchReadingListSagas() {
  yield takeLatest(listReadingListBooks.type, listReadingListBooksHandler);
  yield takeLatest(checkIsBookInReadingList.type, checkIsBookInReadingListHandler);
  yield takeLatest(addBookToReadingList.type, addBookToReadingListHandler);
  yield takeLatest(removeBookFromReadingList.type, removeBookFromReadingListHandler);
}