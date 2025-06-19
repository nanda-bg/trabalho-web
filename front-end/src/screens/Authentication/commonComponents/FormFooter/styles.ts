import styled, { keyframes } from "styled-components";

export const FormFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const SubmitButton = styled.button`
  background-color: #e9a6a6;
  color: #1f1d36;
  padding: 10px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  width: 40%;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 36px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const FooterText = styled.p`
  color: #ffffff;
  text-decoration: none;
  font-size: 10px;
  text-align: center;
`;

export const Break = styled.br`
  display: block;
  margin-bottom: 20px;
`;

export const Link = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 10px;
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
