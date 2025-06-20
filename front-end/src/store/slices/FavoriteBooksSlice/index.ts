import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";
import {
  AddBookToFavoritesPayloadAction,
  CheckIsBookFavoritePayloadAction,
  FavoriteBooksState,
  RemoveBookFromFavoritesPayloadAction,
} from "./types";

export const initialState: FavoriteBooksState = {
  favoriteBooks: [],
  isLoading: false,
  error: null,
  lastBookId: null,
  isSelectedBookFavorite: false,
  isLoadingAddOrRemove: false,
  isLoadingCheck: false,
};

const favoriteBooksSlice = createSlice({
  name: "favoriteBooks",
  initialState,
  reducers: {
    setFavoriteBooksSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<FavoriteBooksState>
    ) => setStateSliceFieldReducer<FavoriteBooksState>(state, action),
    setFavoriteBooksSlice: (
      state,
      action: PayloadAction<Partial<FavoriteBooksState>>
    ) => setStateSliceReducer<FavoriteBooksState>(state, action),
    listFavoriteBooks: () => {},
    checkIsBookFavorite: (
      _state,
      _action: CheckIsBookFavoritePayloadAction
    ) => {},
    addBookToFavorites: (
      _state,
      _action: AddBookToFavoritesPayloadAction
    ) => {},
    removeBookFromFavorites: (
      _state,
      _action: RemoveBookFromFavoritesPayloadAction
    ) => {},
    resetFavoriteBooksSlice: () => initialState,
  },
});

export const {
  setFavoriteBooksSliceField,
  setFavoriteBooksSlice,
  listFavoriteBooks,
  checkIsBookFavorite,
  addBookToFavorites,
  removeBookFromFavorites,
  resetFavoriteBooksSlice,
} = favoriteBooksSlice.actions;
export default favoriteBooksSlice;
