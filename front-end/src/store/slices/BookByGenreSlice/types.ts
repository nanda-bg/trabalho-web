import { Book } from "@app/types/Book";
import { PayloadAction } from "@reduxjs/toolkit";

export interface BookByGenreState {
  isLoading: {[genre: string]: boolean};
  error: string | null;
  booksByGenre: {[genre: string]: Book[]};
}

export type ListBookByGenrePayloadAction = PayloadAction<{
  genre: string;
}>;