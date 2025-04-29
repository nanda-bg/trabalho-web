import styled from "styled-components";

export const Container = styled.div`
  max-width: 430px;
  margin: 0 auto;
  background-color: #1a1a2e;
  min-height: 100vh;
  position: relative;
  padding-bottom: 70px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

export const SaveButton = styled.button`
  background: none;
  border: none;
  color: #ff0080;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export const Content = styled.div`
  flex: 1;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const ProfileImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;

export const OverlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 2;

  ${ProfileImageContainer}:hover & {
    opacity: 1;
  }
`;

export const ChangePhotoText = styled.span`
  font-size: 14px;
  color: #ff0080;
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

export const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #ff0080;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const LogoSection = styled.div`
  padding: 24px 0;
  display: flex;
  justify-content: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const LogoDot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const LogoText = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-left: 4px;
`;
