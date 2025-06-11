"use client";

import { useAppSelector } from "@app/store/rootReducer";
import type React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@app/screens/BookDetails/components/Header/Header";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import TextArea from "../CommomComponents/TextArea/TextArea";
import { createReview, setReviewSlice } from "@app/store/slices/ReviewsSlice";
import ErrorAlert from "../Authentication/commonComponents/ErrorAlert/ErrorAlert";
import * as S from "./styles";
import { ArrowLeft } from "lucide-react";
import { getBookDetails } from "@app/store/slices/BookDetailsSlice";

const CreateReviewScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { bookId } = useParams();

  const { selectedBook: book } = useAppSelector((state) => state.bookDetailsSlice);
  const { createReviewSuccess, createReviewError } = useAppSelector(
    (state) => state.reviewSlice
  );

  const [noCommentError, setNoCommentError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getBookDetails({ uid: bookId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

  useEffect(() => {
    return () => {
      dispatch(
        setReviewSlice({
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
          <S.HeaderTitle>Avaliação</S.HeaderTitle>
        </S.Header>

        <Header bookDetails={book} />

        <S.ReviewSection>
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
