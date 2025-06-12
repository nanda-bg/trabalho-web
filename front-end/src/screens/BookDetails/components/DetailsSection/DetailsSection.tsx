import { Book } from "@app/types/Book";
import * as S from "./styles";
import { type FC } from "react";

interface DetailsSectionProps {
  selectedBook: Book;
}

const DetailsSection: FC<DetailsSectionProps> = ({ selectedBook }) => {
  return (
    <S.DetailsSection>
      <p>
        <strong>Autor(es):</strong> {selectedBook.authors.join(", ")}
      </p>
      <p>
        <strong>Publicado em:</strong> {selectedBook.publicationYear}
      </p>
      <p>
        <strong>Páginas:</strong> {selectedBook.pagesCount}
      </p>
      <p>
        <strong>Gênero:</strong> {selectedBook.genre}
      </p>
    </S.DetailsSection>
  );
};

export default DetailsSection;
