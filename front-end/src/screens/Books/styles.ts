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

export const Body = styled.main`
    max-width: 900px;
    margin: 0 auto;
    padding: 24px 14px 36px 14px;
    @media (min-width: 768px) {
    padding-top: 40px;
    }
`;
