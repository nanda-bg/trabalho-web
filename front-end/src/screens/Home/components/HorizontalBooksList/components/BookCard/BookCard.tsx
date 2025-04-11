import { FC } from "react";
import * as S from "./styles";
import { Book } from "@app/types/Book";

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  return (
    <S.BookCover>
      <S.Cover
        src={book.coverUrl}
        alt={book.title}
      />
    </S.BookCover>
  );
};

export default BookCard;
