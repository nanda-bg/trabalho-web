import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
`;

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

export const GoBack = styled.button`
  background: none;
  border: none;
  color: #ff0080;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export const Container = styled.div`
  max-width: 430px;
  margin: 0 auto;
  background-color: #1a1a2e;
  min-height: 100vh;
  position: relative;
  padding-bottom: 70px;

  @media (max-width: 768px) {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const BookInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
`;

export const ActionButton = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.$primary ? "#ff0080" : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => (props.$primary ? "white" : "#ccc")};
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px;
  background: none;
  border: none;
  color: ${(props) => (props.active ? "white" : "#999")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-bottom: ${(props) => (props.active ? "2px solid #ff0080" : "none")};
  cursor: pointer;
`;

export const TabContent = styled.div`
  padding: 16px;
`;

export const SeeAllLink = styled.a`
  color: #ff0080;
  font-size: 14px;
  text-decoration: none;
`;

export const RecommendedSection = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const RecommendedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const RecommendedTitle = styled.h2`
  font-size: 18px;
  margin: 0;
`;

export const RecommendedGrid = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 16px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 6px;
  }
`;

export const BookCard = styled.div`
  min-width: 120px;
  width: 120px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;
