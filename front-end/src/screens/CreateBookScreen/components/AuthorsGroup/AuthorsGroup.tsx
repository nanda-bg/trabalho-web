import { FC } from "react";
import * as S from "./styles";
import { Plus, Trash2 } from "lucide-react";
import ErrorAlert from "@app/screens/Authentication/commonComponents/ErrorAlert/ErrorAlert";
import InputField from "@app/screens/CommomComponents/InputField/InputField";

interface AuthorsGroupProps {
  authors: string[];
  setBook: (value: any) => void;
  errors?: string[];
}

const AuthorsGroup: FC<AuthorsGroupProps> = ({ authors, setBook, errors }) => {
  const handleAddAuthor = () => {
    setBook((prev) => ({
      ...prev,
      authors: [...prev.authors, ""],
    }));
  };

  const handleRemoveAuthor = (index: number) => {
    if (authors.length <= 1) return;
    setBook((prev) => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index),
    }));
  };

  const handleAuthorChange = (index: number, value: string) => {
    setBook((prev) => ({
      ...prev,
      authors: prev.authors.map((author, i) => (i === index ? value : author)),
    }));
  };

  return (
    <>
      {authors.map((author, index) => (
        <S.AuthorsInputGroup>
          <S.AuthorsInputRow key={index}>
            <S.InputWrapper>
              <InputField
                type="text"
                value={author}
                onChange={(e) => handleAuthorChange(index, e.target.value)}
                placeholder="Nome do autor"
                icon={"book-a"}
                name={`author-${index}`}
              />
            </S.InputWrapper>

            {index === 0 && (
              <S.AuthorsButton onClick={handleAddAuthor}>
                <Plus color="white" size={16} />
              </S.AuthorsButton>
            )}

            {index > 0 && (
              <S.AuthorsButton onClick={() => handleRemoveAuthor(index)}>
                <Trash2 color="red" size={16} />
              </S.AuthorsButton>
            )}
          </S.AuthorsInputRow>
          {errors[index] && <ErrorAlert error={errors[index]} />}
        </S.AuthorsInputGroup>
      ))}
    </>
  );
};

export default AuthorsGroup;
