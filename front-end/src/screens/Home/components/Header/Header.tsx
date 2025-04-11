import { FC } from "react";
import * as S from "./styles";
import { Menu } from "lucide-react";
import UserAvatar from "@app/screens/CommomComponents/UserAvatar/UserAvatar";

interface HeaderProps {
  profileImgUrl?: string;
}

const Header: FC<HeaderProps> = ({ profileImgUrl }) => {
  return (
    <S.Header>
      <S.MenuButton aria-label="Open Menu">
        <Menu size={24} />
      </S.MenuButton>
      <UserAvatar profileImgUrl={profileImgUrl} />
    </S.Header>
  );
};

export default Header;
