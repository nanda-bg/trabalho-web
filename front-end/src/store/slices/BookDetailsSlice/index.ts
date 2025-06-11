import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";
import { BookDetailsState, GetBookDetailsPayloadAction } from "./types";

export const initialState: BookDetailsState = {
  selectedBook: null,
  isLoading: false,
  error: null,
};

const bookDetailsSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBookDetailsSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<BookDetailsState>
    ) => setStateSliceFieldReducer<BookDetailsState>(state, action),
    setBookDetailsSlice: (
      state,
      action: PayloadAction<Partial<BookDetailsState>>
    ) => setStateSliceReducer<BookDetailsState>(state, action),
    getBookDetails: (_state, _action: GetBookDetailsPayloadAction) => {},
    resetBookDetailsSlice: () => initialState,
  },
});

export const {
  setBookDetailsSliceField,
  setBookDetailsSlice,
  getBookDetails,
  resetBookDetailsSlice,
} = bookDetailsSlice.actions;
export default bookDetailsSlice;
