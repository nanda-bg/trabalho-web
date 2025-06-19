import styled from "styled-components";

export const RadioGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const RadioInput = styled.input`
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid #ff0080;
  border-radius: 50%;
  margin-right: 0.5rem;
  position: relative;
  transition: border-color 0.2s;

  &:checked::after {
    content: "";
    display: block;
    width: 0.7rem;
    height: 0.7rem;
    background:rgb(255, 54, 154);
    border-radius: 50%;
    position: absolute;
    top: 0.15rem;
    left: 0.15rem;
  }
`;
