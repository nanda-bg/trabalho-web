import styled from "styled-components";

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

export const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

export const BookTitle = styled.h5`
  font-size: 14px;
  font-weight: 600;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const RatingText = styled.span`
  font-size: 12px;
  color: #ff4d4d;
  font-weight: 600;
`;

export const ReviewContent = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;

  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
