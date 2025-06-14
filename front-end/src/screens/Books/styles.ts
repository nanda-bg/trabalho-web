import styled from "styled-components";

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

export const Wrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    background: #181840;
    color: #fff;
    font-family: 'Inter', 'Roboto', Arial, sans-serif;
`;

export const Body = styled.main`
    max-width: 900px;
    margin: 0 auto;
    padding: 24px 14px 36px 14px;
    @media (min-width: 768px) {
    padding-top: 40px;
    }
`;

export const Title = styled.h1`
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 28px;
    letter-spacing: 1.2px;
  color: #e3fcec;
`;

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
