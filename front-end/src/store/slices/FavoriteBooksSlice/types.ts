import { Book } from "@app/types/Book";
import { PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteBooksState {
  favoriteBooks: Book[];
  isLoading: boolean;
  error: string | null;
  lastBookId: string | null;
  isSelectedBookFavorite: boolean;
  isLoadingAddOrRemove: boolean;
  isLoadingCheck: boolean;
}

export type CheckIsBookFavoritePayloadAction = PayloadAction<{
  bookId: string;
}>;

export type AddBookToFavoritesPayloadAction = PayloadAction<{
  bookId: string;
}>;

export type RemoveBookFromFavoritesPayloadAction = PayloadAction<{
  bookId: string;
}>;