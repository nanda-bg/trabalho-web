import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const SkeletonBookCard = styled.div`
  min-width: 120px;
  width: 120px;
  cursor: pointer;
`;

export const SkeletonBookCover = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  background: linear-gradient(90deg, #16162a 25%, #2a2a4a 50%, #16162a 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  margin-bottom: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SkeletonBookInfo = styled.div`
  padding: 0 4px;
`;

export const SkeletonText = styled.div`
  height: 12px;
  background: linear-gradient(90deg, #16162a 25%, #2a2a4a 50%, #16162a 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 4px;
  &:last-child {
    width: 60%;
  }
`;
