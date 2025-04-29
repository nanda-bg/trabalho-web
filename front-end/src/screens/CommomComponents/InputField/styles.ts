import styled from "styled-components";
import { DynamicIcon } from "lucide-react/dynamic";

// export const InputContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 10px;
//   border: 1px solid #ccc;
//   border-radius: 20px;
//   height: 30px;
//   align-items: center;
//   padding: 0 10px;
// `;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  height: 30px;
  align-items: center;
  padding: 0 10px;
  transition: border-color 0.2s ease-in-out;

  &:focus-within {
    border-color: #ff0080;
  }
`;

export const StyledIcon = styled(DynamicIcon)`
  height: 16px;
  width: 16px;
  color: rgb(163, 162, 173);
`;

export const Input = styled.input`
  flex: 1;
  background-color: transparent;
  border: none;
  outline: none;
  caret-color: #ffffff;
  color: #ffffff;

  &::placeholder {
    color: rgb(163, 162, 173);
  }

  &:focus {
    outline: none;
    box-shadow: none;
    border: none;
  }

  &:focus-visible {
    outline: none;
  }
`;
