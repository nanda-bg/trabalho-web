import type { Book } from "@app/store/slices/BooksSlice/types";
import * as S from "./styles";
import { type FC} from "react";

interface HeaderProps {
  bookDetails: Book;
}

const Header: FC<HeaderProps> = ({ bookDetails }) => {
  return (
    <S.Header>
      <S.CoverImage src={bookDetails.coverUrl} alt={bookDetails.title} />
      <S.BookInfo>
        <S.Title>{bookDetails.title}</S.Title>
        <S.Subtitle>{bookDetails.publicationYear}</S.Subtitle>

        <S.Author>{bookDetails.authors.join(", ")}</S.Author>
        <S.Description>
          {bookDetails.description}
        </S.Description>

        <S.GenreContainer>
            <S.GenreTag key={bookDetails.genre}>{bookDetails.genre}</S.GenreTag>
        </S.GenreContainer>
      </S.BookInfo>
    </S.Header>
  );
};

export default Header;
