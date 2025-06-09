import { Book } from "@app/store/slices/BooksSlice/types";
import BookListItem from "./components/BookListItem/BookListItem";
import * as S from "./styles";
import { FC } from "react";

interface HorizontalBooksListProps {
  books: Book[];
}

const HorizontalBooksList: FC<HorizontalBooksListProps> = ({ books }) => {
  return (
    <S.HorizontalScroll>
      {books.map((book) => (
        <BookListItem key={book.bookId} book={book} />
      ))}
    </S.HorizontalScroll>
  );
};

export default HorizontalBooksList;
