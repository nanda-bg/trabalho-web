import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
`;

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

export const GoBack = styled.button`
  background: none;
  border: none;
  color: #ff0080;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export const Container = styled.div`
  max-width: 430px;
  margin: 0 auto;
  background-color: #1a1a2e;
  min-height: 100vh;
  position: relative;
  padding-bottom: 70px;
  gap: 24px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ReviewSection = styled.div`
  padding: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 20px 0;
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
