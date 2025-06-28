import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  background-color: #1a1a2e;
  min-height: 100vh;
  position: relative;
  padding-bottom: 40px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  max-width: 900px;
  margin: 0 auto;
  gap: 16px;
`;

export const UserInfo = styled.div`
  text-align: center;
`;

export const UserName = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
`;

export const UserUsername = styled.p`
  font-size: 16px;
  color: #8892b0;
  margin: 0;
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 32px;
`;

export const StatItem = styled.div`
  text-align: center;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const StatNumber = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #fff;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #8892b0;
`;

export const FollowButton = styled.button<{ following: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) => (props.following ? "#2a2a3e" : "#ff0080")};
  color: ${(props) => (props.following ? "#ccc" : "white")};

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  gap: 8px;
  max-width: 900px;
  margin: 0 auto;
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? "#ff0080" : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => (props.active ? "white" : "#ccc")};
  transition: all 0.2s ease;
  max-width: 200px;

  &:hover {
    opacity: 0.9;
  }
`;

export const Body = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 14px 36px 14px;
  @media (min-width: 768px) {
    padding-top: 40px;
  }
`;

export const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  text-align: center;
  padding: 20px;
  font-size: 16px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

export const EmptyMessage = styled.p`
  color: #8892b0;
  font-size: 18px;
  line-height: 1.5;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  
  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 4px solid rgba(31, 29, 54, 0.3);
    border-radius: 50%;
    border-top: 4px solid #ff0080;
    animation: ${spin} 1s linear infinite;
  }
`;

export const ButtonSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid white;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;