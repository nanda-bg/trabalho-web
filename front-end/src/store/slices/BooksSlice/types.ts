import { Book } from "@app/types/Book";

export interface BooksState {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  lastBookId: string | null;
  hasMore: boolean;
}
