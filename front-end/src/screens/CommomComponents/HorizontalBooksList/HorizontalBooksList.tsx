import BookListItem from "./components/BookListItem/BookListItem";
import * as S from "./styles";
import { Book } from "@app/types/Book";
import { FC } from "react";

interface HorizontalBooksListProps {
  books: Book[];
}

const HorizontalBooksList: FC<HorizontalBooksListProps> = ({books}) => {
  return (
    <S.HorizontalScroll>
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </S.HorizontalScroll>
  );
};

export default HorizontalBooksList;
