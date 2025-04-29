import { FC, HTMLAttributes } from "react";
import styled from "styled-components";

interface NavItemContainerProps extends HTMLAttributes<HTMLDivElement> {
  isActive: boolean;
}

export const NavItemContainer: FC<NavItemContainerProps> = styled.div<NavItemContainerProps>`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ isActive }) => (isActive ? "#ff9bb3" : "transparent")};
  color: ${({ isActive }) => (isActive ? "#1e1a2e" : "#9e9aa7")};
  font-weight: ${({ isActive }) => (isActive ? "600" : "400")};
  border-radius: ${({ isActive }) => (isActive ? "0 20px 20px 0" : "0")};
  margin-right: ${({ isActive }) => (isActive ? "16px" : "0")};

  &:hover {
    color: ${({ isActive }) => (isActive ? "#1e1a2e" : "#fff")};
    background-color: ${({ isActive }) =>
      isActive ? "#ff9bb3" : "rgba(255, 255, 255, 0.05)"};
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const Label = styled.span`
  font-size: 16px;
`;
