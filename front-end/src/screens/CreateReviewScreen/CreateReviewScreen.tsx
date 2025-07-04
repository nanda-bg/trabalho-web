"use client";

import { useAppSelector } from "@app/store/rootReducer";
import type React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "@app/screens/BookDetails/components/Header/Header";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import TextArea from "../CommomComponents/TextArea/TextArea";
import {
  createReview,
  setReviewsByBookSlice,
} from "@app/store/slices/ReviewsByBookSlice";
import ErrorAlert from "../Authentication/commonComponents/ErrorAlert/ErrorAlert";
import * as S from "./styles";
import { getBookDetails } from "@app/store/slices/BookDetailsSlice";
import SecondaryHeader from "../CommomComponents/SecondaryHeader/SecondaryHeader";
import LoadingAnimation from "../CommomComponents/LoadingAnimation/LoadingAnimation";

const CreateReviewScreen = () => {
  const dispatch = useDispatch();

  const { bookId } = useParams();

  const { selectedBook: book, isLoading } = useAppSelector(
    (state) => state.bookDetailsSlice
  );
  const { createReviewSuccess, createReviewError } = useAppSelector(
    (state) => state.reviewsByBookSlice
  );

  const [noCommentError, setNoCommentError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getBookDetails({ uid: bookId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

  useEffect(() => {
    return () => {
      dispatch(
        setReviewsByBookSlice({
          createReviewSuccess: false,
          createReviewError: null,
        })
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [hasSpoilers, setHasSpoilers] = useState<boolean>(false);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setNoCommentError(null);

    if (!comment) {
      setNoCommentError("Por favor, escreva um comentário.");
      return;
    }

    dispatch(
      createReview({
        bookId: book.bookId,
        rating,
        reviewText: comment,
        spoiler: hasSpoilers,
      })
    );

    setRating(0);
    setComment("");
    setHasSpoilers(false);
  };

  if (isLoading) {
    return (
      <>
        <GlobalStyle />
        <S.Container>
          <LoadingAnimation active={isLoading} />
          <SecondaryHeader title="Criar avaliação" />
        </S.Container>
      </>
    );
  }

  if (!book) {
    return (
      <>
        <GlobalStyle />
        <S.Container>
          <SecondaryHeader title="Criar avaliação" />
          <S.NoBookMessage>
            Livro indisponível ou não encontrado, por favor verifique o ID do
            livro ou tente novamente mais tarde.
          </S.NoBookMessage>
        </S.Container>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <S.Container>
        <SecondaryHeader title="Criar avaliação" />

        <S.ReviewSection>
          <Header bookDetails={book} />
          <S.SectionTitle>Deixe sua avaliação</S.SectionTitle>
          <S.ReviewForm onSubmit={handleSubmit}>
            <S.RatingContainer>
              <S.StarRating>
                {[1, 2, 3, 4, 5].map((star) => (
                  <S.StarButton
                    key={star}
                    type="button"
                    active={star <= rating}
                    onClick={() => handleRatingChange(star)}
                  >
                    ★
                  </S.StarButton>
                ))}
              </S.StarRating>
            </S.RatingContainer>

            <S.CommentContainer>
              <S.CommentLabel>Seu comentário</S.CommentLabel>
              <TextArea
                value={comment}
                handleChange={(e) => setComment(e.target.value)}
                placeholder="Compartilhe sua opinião sobre o livro..."
                name={"comment"}
                rows={5}
              />
              {noCommentError && (
                <ErrorAlert error={noCommentError} size="md" />
              )}
            </S.CommentContainer>

            <S.SpoilerContainer>
              <S.SpoilerCheckbox
                type="checkbox"
                id="spoiler-checkbox"
                checked={hasSpoilers}
                onChange={() => setHasSpoilers(!hasSpoilers)}
              />
              <S.SpoilerLabel htmlFor="spoiler-checkbox">
                Essa avaliação contém spoilers
              </S.SpoilerLabel>
            </S.SpoilerContainer>

            {createReviewSuccess && (
              <S.SuccessMessage>
                Avaliação enviada com sucesso! Obrigado por compartilhar sua
                opinião.
              </S.SuccessMessage>
            )}

            <S.SubmitButton type="submit">Postar</S.SubmitButton>
            {createReviewError && (
              <S.ErrorContainer>
                <ErrorAlert error={createReviewError} size="lg" />
              </S.ErrorContainer>
            )}
          </S.ReviewForm>
        </S.ReviewSection>
      </S.Container>
    </>
  );
};

export default CreateReviewScreen;
