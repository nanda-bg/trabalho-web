import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";
import { BookByGenreState, ListBookByGenrePayloadAction } from "./types";

export const initialState: BookByGenreState = {
  isLoading: {},
  error: null,
  booksByGenre: {},
  lastBookIdByGenre: {},
  hasMore: {},
};

const bookByGenreSlice = createSlice({
  name: "bookByGenre",
  initialState,
  reducers: {
    setBookByGenreSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<BookByGenreState>
    ) => setStateSliceFieldReducer<BookByGenreState>(state, action),
    setBookByGenreSlice: (
      state,
      action: PayloadAction<Partial<BookByGenreState>>
    ) => setStateSliceReducer<BookByGenreState>(state, action),
    listBookByGenre: (_state, _action: ListBookByGenrePayloadAction) => {},
    resetBookByGenreSlice: () => initialState,
  },
});

export const {
  setBookByGenreSliceField,
  setBookByGenreSlice,
  listBookByGenre,
  resetBookByGenreSlice,
} = bookByGenreSlice.actions;
export default bookByGenreSlice;
