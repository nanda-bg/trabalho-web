import * as S from "./styles";
import { Star } from "lucide-react";
import { Book } from "@app/types/Book";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface BookListItemProps {
  book: Book;
}

const BookListItem: FC<BookListItemProps> = ({ book }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <S.BookCard key={book.id} onClick={handleBookClick}>
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
          {book.rating || 5} <Star size={10} fill="#e63946" color="#e63946" />
        </S.BookCardRating>
      </S.BookCardInfo>
    </S.BookCard>
  );
};

export default BookListItem;
