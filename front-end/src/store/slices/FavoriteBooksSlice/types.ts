import { Book } from "@app/types/Book";

export interface FavoriteBooksState {
  favoriteBooks: Book[];
  isLoading: boolean;
  error: string | null;
  lastBookId: string | null;
}
