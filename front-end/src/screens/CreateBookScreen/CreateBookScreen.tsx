import { useState, useEffect } from "react";
import * as S from "./styles";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import { useAppSelector } from "@app/store/rootReducer";
import InputField from "../CommomComponents/InputField/InputField";
import TextArea from "../CommomComponents/TextArea/TextArea";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "./components/LoadingAnimation/LoadingAnimation";
import PrimaryHeader from "../CommomComponents/PrimaryHeader/PrimaryHeader";
import ErrorAlert from "../Authentication/commonComponents/ErrorAlert/ErrorAlert";
import AuthorsGroup from "./components/AuthorsGroup/AuthorsGroup";
import { createBook } from "@app/store/slices/CreateBookSlice";
import Guide from "./components/Guide/Guide";
import CoverSection from "./components/CoverSection/CoverSection";

export interface BookData {
  title: string;
  description: string;
  authors: string[];
  coverUrl: string;
  publicationYear: number;
  genre: string;
  pagesCount: number;
}

export default function CreateBookScreen() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { type } = useAppSelector((state) => state.userSlice);
  const { isLoading, error, success } = useAppSelector(
    (state) => state.createBookSlice
  );

  useEffect(() => {
    if (type !== "CONTRIBUIDOR") {
      navigation("/home");
    }
  });

  const [book, setBook] = useState<BookData>({
    title: "",
    description: "",
    authors: [""],
    coverUrl: "",
    publicationYear: new Date().getFullYear(),
    genre: "",
    pagesCount: 1,
  });

  const [inputErrors, setInputErrors] = useState({
    title: "",
    description: "",
    authors: [""],
    coverUrl: "",
    publicationYear: "",
    genre: "",
    pagesCount: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const currentYear = new Date().getFullYear();
    const errors = {
      title: "",
      description: "",
      authors: Array(book.authors.length).fill(""),
      coverUrl: "",
      publicationYear: "",
      genre: "",
      pagesCount: "",
    };

    if (!book.title.trim()) {
      errors.title = "O título é obrigatório.";
    }

    if (!book.description.trim()) {
      errors.description = "A descrição é obrigatória.";
    }

    if (!book.authors.every((author) => author.trim())) {
      errors.authors = book.authors.map((author) =>
        !author.trim() ? "O nome do autor é obrigatório" : ""
      );
    }

    if (!book.coverUrl.trim()) {
      errors.coverUrl = "A imagem da capa é obrigatória.";
    }

    if (
      !book.publicationYear ||
      isNaN(book.publicationYear) ||
      book.publicationYear <= 0
    ) {
      errors.publicationYear =
        "O ano de publicação deve ser um número positivo.";
    } else if (book.publicationYear > currentYear) {
      errors.publicationYear = `O ano de publicação não pode ser maior que ${currentYear}.`;
    }

    if (!book.genre.trim()) {
      errors.genre = "O gênero é obrigatório.";
    }

    if (
      !book.pagesCount ||
      isNaN(Number(book.pagesCount)) ||
      Number(book.pagesCount) <= 0
    ) {
      errors.pagesCount = "O número de páginas deve ser maior que zero.";
    }

    setInputErrors(errors);

    const hasNoErrors =
      !errors.title &&
      !errors.description &&
      errors.authors.every((a) => !a) &&
      !errors.coverUrl &&
      !errors.publicationYear &&
      !errors.genre &&
      !errors.pagesCount;

    if (hasNoErrors) {
      dispatch(createBook(book));
    }
  };

  return (
    <S.Container>
      <GlobalStyle />
      <Loading active={isLoading} />
      <PrimaryHeader activeScreen="CreateBook" title="Criar livro" />

      <S.Content>
        <Guide />

        <CoverSection book={book} setBook={setBook}/>

        <S.FormSection>
          <S.InputGroup>
            <S.Label>Título</S.Label>
            <InputField
              type="text"
              name="title"
              value={book.title}
              onChange={handleInputChange}
              placeholder="Título do livro"
              icon={"book-type"}
            />
            {inputErrors.title && (
              <ErrorAlert error={inputErrors.title} size="md" />
            )}
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Autores</S.Label>
            <AuthorsGroup
              authors={book.authors}
              setBook={setBook}
              errors={inputErrors.authors}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Ano de publicação</S.Label>
            <InputField
              type="text"
              name="publicationYear"
              value={book.publicationYear}
              onChange={handleInputChange}
              placeholder="Ano de publicação do livro"
              icon={"calendar-days"}
            />
            {inputErrors.publicationYear && (
              <ErrorAlert error={inputErrors.publicationYear} size="md" />
            )}
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Gênero</S.Label>
            <InputField
              type="text"
              name="genre"
              value={book.genre}
              onChange={handleInputChange}
              placeholder="Gênero do livro"
              icon={"library-big"}
            />
            {inputErrors.genre && (
              <ErrorAlert error={inputErrors.genre} size="md" />
            )}
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Número de páginas</S.Label>
            <InputField
              type="text"
              name="pagesCount"
              value={book.pagesCount}
              onChange={handleInputChange}
              placeholder="Número de páginas do livro"
              icon={"book-open-text"}
            />
            {inputErrors.pagesCount && (
              <ErrorAlert error={inputErrors.pagesCount} size="md" />
            )}
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Descrição</S.Label>
            <TextArea
              name="description"
              value={book.description}
              handleChange={handleInputChange}
              placeholder="Descrição do livro"
              rows={5}
              max={1000}
            />
            {inputErrors.description && (
              <ErrorAlert error={inputErrors.description} size="md" />
            )}
          </S.InputGroup>
        </S.FormSection>
      </S.Content>

      <S.SubmitButton onClick={handleSave} disabled={isLoading}>
        {isLoading ? <S.LoadingSpinner /> : "Criar"}
      </S.SubmitButton>

      {error && (
        <S.GeneralErrorContainer>
          <ErrorAlert error={error} size="lg" />
        </S.GeneralErrorContainer>
      )}

      {success && (
        <S.SuccessMessage>Livro criado com sucesso!</S.SuccessMessage>
      )}
    </S.Container>
  );
}
