import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  background-color: #1a1a2e;
  min-height: 100vh;
  position: relative;
  padding-bottom: 40px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const NoBookMessage = styled.div`
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  margin-top: 24px;
`;

export const DetailsContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
  align-items: center;
  justify-content: center;
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
  max-width: 250px;

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
