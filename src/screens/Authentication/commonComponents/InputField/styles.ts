import styled from "styled-components";
import { DynamicIcon } from 'lucide-react/dynamic';


export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  height: 30px;
  align-items: center;
  padding: 0 10px;
`;

export const StyledIcon = styled(DynamicIcon)`
  height: 16px;
  width: 16px;
  color: rgb(163, 162, 173);
`;

export const Input = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  caret-color: #FFFFFF;
  color: #FFFFFF;


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