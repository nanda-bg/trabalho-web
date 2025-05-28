import { Book } from "@app/types/Book";
import { User } from "@app/types/User";

export type Review = {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: User;
    book: Book;
    has_spoiler?: boolean;
  };