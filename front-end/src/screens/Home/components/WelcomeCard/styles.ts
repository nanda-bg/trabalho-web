import styled, { keyframes } from "styled-components";

export const SubText = styled.p`
  color: #9999a9;
  font-size: 14px;
`;

export const HeroSection = styled.section`
  background-color: #16162a;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
`;

export const GreetingText = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const LoadingGreetingText = styled.div`
  width: 150px;
  height: 32px;
  border-radius: 4px;
  background: linear-gradient(90deg, #16162a 25%, #2a2a4a 50%, #16162a 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  margin-bottom: 8px;
`;

export const LoadingSubText = styled.div`
  width: 200px;
  height: 18px;
  border-radius: 4px;
  background: linear-gradient(90deg, #16162a 25%, #2a2a4a 50%, #16162a 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;
