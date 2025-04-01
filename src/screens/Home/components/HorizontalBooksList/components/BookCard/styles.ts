import styled from "styled-components";

export const BookCover = styled.div`
  width: 110px;
  height: 160px;
  border-radius: 12px;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  overflow: hidden;

  cursor: pointer;
  transition: opacity 0.2s ease;

  &:active {
    opacity: 0.7;
  }
`;

export const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
