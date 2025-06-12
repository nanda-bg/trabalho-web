import { Book } from "@app/types/Book";
import { PayloadAction } from "@reduxjs/toolkit";

export interface BookDetailsState {
  isLoading: boolean;
  error: string | null;
  selectedBook: Book | null;
}

export type GetBookDetailsPayloadAction = PayloadAction<{
  uid: string;
}>;