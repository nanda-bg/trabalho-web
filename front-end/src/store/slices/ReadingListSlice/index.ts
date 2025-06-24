import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";
import { 
  ReadingListState, 
  ListReadingListBooksPayloadAction,
  CheckIsBookInReadingListPayloadAction,
  AddBookToReadingListPayloadAction,
  RemoveBookFromReadingListPayloadAction
} from "./types";

export const initialState: ReadingListState = {
  isLoading: false,
  error: null,
  readingListBooks: [],
  lastBookId: null,
  hasMore: true,
  isSelectedBookInReadingList: false,
};

const readingListSlice = createSlice({
  name: "readingList",
  initialState,
  reducers: {
    setReadingListSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<ReadingListState>
    ) => setStateSliceFieldReducer<ReadingListState>(state, action),
    setReadingListSlice: (
      state,
      action: PayloadAction<Partial<ReadingListState>>
    ) => setStateSliceReducer<ReadingListState>(state, action),
    listReadingListBooks: (_state, _action: ListReadingListBooksPayloadAction) => {},
    resetReadingListSlice: () => initialState,
    checkIsBookInReadingList: (_state, _action: CheckIsBookInReadingListPayloadAction) => {},
    addBookToReadingList: (_state, _action: AddBookToReadingListPayloadAction) => {},
    removeBookFromReadingList: (_state, _action: RemoveBookFromReadingListPayloadAction) => {},
  },
});

export const {
  setReadingListSliceField,
  setReadingListSlice,
  listReadingListBooks,
  resetReadingListSlice,
  checkIsBookInReadingList,
  addBookToReadingList,
  removeBookFromReadingList,
} = readingListSlice.actions;
export default readingListSlice;