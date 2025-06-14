import { useAppSelector } from "@app/store/rootReducer";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { listBookByGenre } from "@app/store/slices/BookByGenreSlice";
import * as S from "./styles";
import HorizontalBooksList from "../CommomComponents/HorizontalBooksList/HorizontalBooksList";
import { ArrowLeft, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GlobalStyle } from "@app/styles/GlobalStyles";



const GENRES = [
    "Ficção",
    "Autoajuda",
    "Arquitetura",
    "Poesia",
    "Coleções literárias",
    "História",
    "Ciências sociais",
];

const BookScreen: FC = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const {booksByGenre, isLoading} = useAppSelector((state) => state.bookByGenreSlice);

    useEffect(() => {
    GENRES.forEach((genre) => {
        if (!booksByGenre[genre] && !isLoading[genre]) {
            dispatch(listBookByGenre({ genre }));
        }
    });
    }, [booksByGenre, isLoading, GENRES]);

    const handleGoBack = () => {
        navigation(-1);
    };

    return (
    <>
      <GlobalStyle />
          <S.Container>
        <S.Header>
          <S.GoBack onClick={handleGoBack}>
            <ArrowLeft size={20} />
          </S.GoBack>
          <S.HeaderTitle>Livros</S.HeaderTitle>
        </S.Header>
        <S.Body>
        {GENRES.map((genre) => (
            <>
                <h3>{genre}</h3>
                <HorizontalBooksList books={booksByGenre[genre]} isLoading={isLoading[genre]}/>
            </>
        ))}
        </S.Body>
    </S.Container>
    </>
    );
};

export default BookScreen;