import { mockedPopularBooks } from "@app/utils/mocks/MockedPopularBooks";
import BookCard from "./components/BookCard/BookCard";
import * as S from "./styles";

const HorizontalBooksList = () => {
  return (
    <S.HorizontalScroll>
      {mockedPopularBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </S.HorizontalScroll>
  );
};

export default HorizontalBooksList;
