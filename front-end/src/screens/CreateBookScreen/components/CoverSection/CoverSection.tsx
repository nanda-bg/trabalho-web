import { FC, useRef } from "react";
import * as S from "./styles";
import { BookData } from "../../CreateBookScreen";

interface CoverSectionProps {
  setBook: (value: any) => void;
  book: BookData;
}

const CoverSection: FC<CoverSectionProps> = ({ setBook, book }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBook((prev) => ({
            ...prev,
            coverUrl: event.target.result as string,
          }));
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <S.BookCoverSection>
      <S.BookCoverContainer onClick={handleImageClick}>
        <S.BookCardCover>
          <S.Cover
            src={
              book.coverUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"
            }
            alt={book.title}
            style={{ objectFit: "cover" }}
          />
        </S.BookCardCover>
      </S.BookCoverContainer>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: "none" }}
      />
    </S.BookCoverSection>
  );
};

export default CoverSection;
