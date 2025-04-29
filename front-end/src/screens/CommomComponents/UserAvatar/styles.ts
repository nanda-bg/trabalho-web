import { FC, HTMLAttributes } from "react";
import styled from "styled-components";

interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  diameter: number
}

export const UserAvatar: FC<UserAvatarProps> = styled.div<UserAvatarProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(126, 126, 126);
  width: ${({diameter}) => diameter}px;
  height: ${({diameter}) => diameter}px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
  }
`;
