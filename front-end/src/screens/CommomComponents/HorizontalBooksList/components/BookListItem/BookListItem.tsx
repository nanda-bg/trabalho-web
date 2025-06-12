import { Book } from "@app/types/Book";
import * as S from "./styles";
import { Star } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";


interface BookListItemProps {
  book: Book;
}

const BookListItem: FC<BookListItemProps> = ({ book }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${book.bookId}`);
  };

  return (
    <S.BookCard key={book.bookId} onClick={handleBookClick}>
      <S.BookCardCover>
        <S.Cover
          src={book.coverUrl}
          alt={book.title}
          style={{ objectFit: "cover" }}
        />
      </S.BookCardCover>
      <S.BookCardInfo>
        <S.BookCardTitle>{book.title}</S.BookCardTitle>
        <S.BookCardAuthor>{book.authors.join(", ")}</S.BookCardAuthor>
        <S.BookCardRating>
          {book.averageRating} <Star size={10} fill="#e63946" color="#e63946" />
        </S.BookCardRating>
      </S.BookCardInfo>
    </S.BookCard>
  );
};

export default BookListItem;
