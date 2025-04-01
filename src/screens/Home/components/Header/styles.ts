import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  color: #9999a9;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: rgb(175, 174, 174);
  }
`;
