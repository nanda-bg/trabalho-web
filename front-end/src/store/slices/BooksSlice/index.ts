import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";
import { BooksState, GetBookPayloadAction } from "./types";

export const initialState: BooksState = {
  books: [],
  isLoading: false,
  error: null,
  selectedBook: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBookSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<BooksState>
    ) => setStateSliceFieldReducer<BooksState>(state, action),
    setBookSlice: (state, action: PayloadAction<Partial<BooksState>>) =>
      setStateSliceReducer<BooksState>(state, action),
    getBook: (_state, _action: GetBookPayloadAction) => {},
    listBooks: () => {},
  },
});

export const { setBookSliceField, setBookSlice, getBook, listBooks} =
  bookSlice.actions;
export default bookSlice;
