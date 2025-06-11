import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";
import { BooksState } from "./types";

export const initialState: BooksState = {
  books: [],
  isLoading: false,
  error: null,
  lastBookId: null,
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
    listBooks: () => {},
    resetBookSlice: () => initialState,
  },
});

export const { setBookSliceField, setBookSlice, listBooks, resetBookSlice } =
  bookSlice.actions;
export default bookSlice;
