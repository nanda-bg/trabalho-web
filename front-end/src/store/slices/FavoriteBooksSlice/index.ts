import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";
import { FavoriteBooksState } from "./types";

export const initialState: FavoriteBooksState = {
  favoriteBooks: [],
  isLoading: false,
  error: null,
  lastBookId: null,
};

const favoriteBooksSlice = createSlice({
  name: "favoriteBooks",
  initialState,
  reducers: {
    setFavoriteBooksSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<FavoriteBooksState>
    ) => setStateSliceFieldReducer<FavoriteBooksState>(state, action),
    setFavoriteBooksSlice: (state, action: PayloadAction<Partial<FavoriteBooksState>>) =>
      setStateSliceReducer<FavoriteBooksState>(state, action),
    listFavoriteBooks: () => {},
    resetFavoriteBooksSlice: () => initialState,
  },
});

export const { setFavoriteBooksSliceField, setFavoriteBooksSlice, listFavoriteBooks, resetFavoriteBooksSlice } =
  favoriteBooksSlice.actions;
export default favoriteBooksSlice;
