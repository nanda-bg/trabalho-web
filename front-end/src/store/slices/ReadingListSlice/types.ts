import { Book } from "@app/types/Book";
import { PayloadAction } from "@reduxjs/toolkit";

export interface ReadingListState {
  isLoading: boolean;
  error: string | null;
  readingListBooks: Book[];
  lastBookId: string | null;
  hasMore: boolean;
  isSelectedBookInReadingList: boolean;
}

export type ListReadingListBooksPayloadAction = PayloadAction<{
  reset?: boolean;
}>;

export type CheckIsBookInReadingListPayloadAction = PayloadAction<{
  bookId: string;
}>;

export type AddBookToReadingListPayloadAction = PayloadAction<{
  bookId: string;
}>;

export type RemoveBookFromReadingListPayloadAction = PayloadAction<{
  bookId: string;
}>;