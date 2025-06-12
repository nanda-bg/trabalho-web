import BookListItem from "./components/BookListItem/BookListItem";
import * as S from "./styles";
import { FC, useCallback, useEffect, useRef } from "react";
import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import { Book } from "@app/types/Book";

interface HorizontalBooksListProps {
  books: Book[];
  onEndReached?: () => void;
  isLoading?: boolean;
}

const HorizontalBooksList: FC<HorizontalBooksListProps> = ({
  books,
  onEndReached,
  isLoading = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollLeft + clientWidth >= scrollWidth) {
      if (onEndReached) {
        onEndReached();
      }
    }
  }, [onEndReached]);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => element.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return (
    <S.HorizontalScroll ref={scrollRef}>
      {books.map((book) => (
        <BookListItem key={book.bookId} book={book} />
      ))}
      {isLoading && <LoadingAnimation />}
    </S.HorizontalScroll>
  );
};

export default HorizontalBooksList;
