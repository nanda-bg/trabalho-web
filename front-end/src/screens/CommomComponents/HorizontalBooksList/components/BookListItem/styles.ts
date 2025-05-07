import styled from "styled-components";

export const BookCard = styled.div`
  min-width: 120px;
  width: 120px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
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

export const BookCardInfo = styled.div`
  padding: 0 4px;
`;

export const BookCardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BookCardAuthor = styled.p`
  font-size: 12px;
  color: #ccc;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BookCardRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #ccc;
`;
