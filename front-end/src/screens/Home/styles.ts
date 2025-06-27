import styled from "styled-components";

export const AppContainer = styled.div`
  margin: 0 auto;
  background-color: #1a1a2e;
  min-height: 100vh;
  position: relative;
  padding-bottom: 40px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const MainContent = styled.main`
  padding: 0 16px;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;

  &:not(:first-child) {
    margin: 56px 0 24px 0;
  }
`;

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 800px;
  justify-self: center;
`;
