import styled from "styled-components";

export const BookCoverSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const BookCoverContainer = styled.div`
  min-width: 120px;
  width: 120px;
  cursor: pointer;
  transition: transform 0.2s ease;
`;

export const BookCardCover = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
