import styled from "styled-components";

export const ReviewsSection = styled.div`
  padding: 16px;
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

export const SeeAllContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SeeAll = styled.button`
  color: #ff0080;
  font-size: 14px;
  text-decoration: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const NoReviewsMessage = styled.div`
  color: #ffffff;
  font-size: 14px;
  text-align: center;
`;