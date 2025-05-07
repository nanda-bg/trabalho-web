import * as S from "./styles";
import { BookDetails } from "@app/types/BookDetails";
import { FC, useState } from "react";

interface HeaderProps {
  bookDetails: BookDetails;
}

const Header: FC<HeaderProps> = ({ bookDetails }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <S.Header>
      <S.CoverImage src={bookDetails.coverUrl} alt={bookDetails.title} />
      <S.BookInfo>
        <S.Title>{bookDetails.title}</S.Title>
        <S.Subtitle>{bookDetails.year}</S.Subtitle>

        <S.Author>Written by {bookDetails.authors.join(", ")}</S.Author>
        <S.Description expanded={isDescriptionExpanded}>
          {bookDetails.description}
        </S.Description>
        <S.ReadMoreButton onClick={toggleDescription}>
          {isDescriptionExpanded ? "Ler menos" : "Ler mais"}
        </S.ReadMoreButton>
        <S.GenreContainer>
          {bookDetails.genres.map((genre) => (
            <S.GenreTag key={genre}>{genre}</S.GenreTag>
          ))}
        </S.GenreContainer>
      </S.BookInfo>
    </S.Header>
  );
};

export default Header;
