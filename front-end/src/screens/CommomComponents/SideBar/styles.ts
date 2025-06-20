import styled from "styled-components";

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ isOpen }) => (isOpen ? "240px" : "0")};
  height: 100vh;
  background-color:rgb(25, 21, 37);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  transition: width 0.3s ease;
  overflow: hidden;

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  }
`;

export const MenuToggle = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseIcon = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  z-index: 101;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 0;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #9e9aa7;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: auto;
  bottom: 0;

  &:hover {
    color: #fff;
  }

  svg {
    margin-right: 12px;
  }
`;