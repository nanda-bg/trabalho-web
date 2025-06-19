import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  background-color: #1a1a2e;
  min-height: 100vh;
  position: relative;
  padding-bottom: 40px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const ReviewSection = styled.div`
  max-width: 700px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 16px 0 20px 0;
  color: #ffffff;
`;

export const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StarRating = styled.div`
  display: flex;
  gap: 8px;
`;

interface StarButtonProps {
  active: boolean;
}

export const StarButton = styled.button<StarButtonProps>`
  background: none;
  border: none;
  font-size: 32px;
  color: ${(props) => (props.active ? "#ff0080" : "#444")};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #ff0080;
  }
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CommentLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
`;

export const SpoilerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SpoilerCheckbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #444;
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #ff0080;
    border-color: #ff0080;
  }

  &:checked::after {
    content: "✓";
    position: absolute;
    color: white;
    font-size: 14px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const SpoilerLabel = styled.label`
  font-size: 14px;
  color: #d8d8d8;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  background-color: #ff0080;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 8px;

  &:hover {
    background-color: #d63553;
  }
`;

export const SuccessMessage = styled.text`
  font-size: 14px;
  text-align: center;
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
