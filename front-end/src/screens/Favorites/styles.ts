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

export const GenreFilter = styled.div`
  display: flex;
  gap: 10px;
  padding: 16px;
  overflow-x: auto;
  justify-content: center;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  margin-bottom: 20px;
`;

export const GenreButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? "#ff0080" : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => (props.active ? "white" : "#ccc")};
  transition: all 0.2s ease;
  max-width: 150px;

  &:hover {
    opacity: 0.9;
  }
`;

export const StatsSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  margin-bottom: 20px;
  gap: 32px;
`;

export const StatCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  width: 45%;
  max-width: 300px;
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ff4081;
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #b3b3b3;
`;

export const BookGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(31, 29, 54, 0.3);
  border-radius: 50%;
  border-top: 3px solid #1f1d36;
  animation: ${spin} 1s linear infinite;
`;
