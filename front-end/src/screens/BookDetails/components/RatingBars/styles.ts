import styled from "styled-components";

export const RatingSection = styled.div`
  margin-top: 32px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 16px;
`;

export const RatingTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 16px 0;
`;

export const RatingValue = styled.div`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
`;

export const RatingStars = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 16px;
`;

export const Star = styled.div<{ filled: boolean; half?: boolean }>`
  width: 24px;
  height: 24px;
  position: relative;

  &:before {
    content: "★";
    position: absolute;
    color: ${(props) => (props.filled ? "#FF8700" : "#8E95A9")};
    font-size: 24px;
  }

  ${(props) =>
    props.half &&
    `
    &:after {
      content: '★';
      position: absolute;
      color: #FF8700;
      font-size: 24px;
      width: 50%;
      overflow: hidden;
    }
  `}
`;

export const RatingGraph = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RatingBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RatingBarValue = styled.span`
  width: 16px;
  text-align: center;
  font-size: 14px;
  color: #8e95a9;
`;

export const RatingBarGraph = styled.div`
  flex: 1;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
`;

export const RatingBarFill = styled.div<{ width: number; value: number }>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${(props) => {
    if (props.value >= 4) return "#FF8700";
    if (props.value >= 3) return "#FFD700";
    return "#8E95A9";
  }};
  border-radius: 3px;
`;