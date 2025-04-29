import styled from "styled-components";

export const TextArea = styled.textarea`
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  /* border-radius: 8px; */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 12px 16px;
  color: white;
  font-size: 16px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #ff0080;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;
