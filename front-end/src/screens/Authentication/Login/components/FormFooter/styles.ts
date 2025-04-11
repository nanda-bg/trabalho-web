import styled from "styled-components";

export const FormFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const SubmitButton = styled.input`
  background-color: #e9a6a6;
  color: #1f1d36;
  padding: 10px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  width: 40%;
  font-weight: bold;
  font-size: 14px;
`;

export const CreateAccountContainer = styled.div`
  text-align: center;
  background-color: red;
  height: 40px;
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
