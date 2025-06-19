import { Book } from "@app/types/Book";
import { User } from "@app/types/User";

export interface Review {
  reviewId: string;
  userUid: string;
  bookId: string;
  rating: number;
  reviewText: string;
  date: string;
  likeCount: number;
  spoiler: boolean;
  user: User;
  book: Book;
}
