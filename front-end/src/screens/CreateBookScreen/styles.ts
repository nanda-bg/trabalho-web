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

export const Content = styled.div`
  max-width: 700px;
  margin: 16px auto;
  position: relative;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

export const SubmitButton = styled.button`
  background-color: #e9a6a6;
  color: #1f1d36;
  padding: 10px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 36px;
  min-width: 100px;
  justify-self: center;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const GeneralErrorContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SuccessMessage = styled.text`
  font-size: 14px;
  text-align: center;
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
