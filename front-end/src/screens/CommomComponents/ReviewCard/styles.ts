import styled, { css } from "styled-components";

export const ReviewCard = styled.div`
  background-color: #16162a;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const BookCover = styled.img`
  border-radius: 12px;
  max-width: 90px;
  max-height: 120px;
  align-self: center;
`;

export const NoCover = styled.img`
  border-radius: 12px;
  width: 90px;
  height: 120px;
  align-self: center;
  background-color:rgb(202, 202, 204);
`

export const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BookTitle = styled.h5`
  font-size: 14px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
`;

export const SpoilerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  z-index: 2;
  justify-content: center;
`;

export const SpoilerAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background-color: rgba(255, 77, 77, 0.1);
  border-radius: 8px;
  border-left: 3px solid #ff4d4d;
  font-size: 12px;
  color: #ff4d4d;
`;

export const SpoilerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-start;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ReviewContent = styled.p<{ spoiler?: boolean }>`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ spoiler }) =>
    spoiler &&
    css`
      opacity: 0.2;
      filter: blur(4px);
      user-select: none;
      pointer-events: none;
    `}
`;

export const Star = styled.div<{ filled: boolean; half?: boolean }>`
  width: 12px;
  height: 12px;
  position: relative;

  &:before {
    content: "★";
    position: absolute;
    color: ${(props) => (props.filled ? "#ff0080" : "#8E95A9")};
    font-size: 12px;
  }

  ${(props) =>
    props.half &&
    `
    &:after {
      content: '★';
      position: absolute;
      color: #ff0080;
      font-size: 12px;
      width: 50%;
      overflow: hidden;
    }
  `}
`;
