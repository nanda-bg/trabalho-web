import * as S from "./styles";
import Sidebar from "../SideBar/SideBar";
import { FC } from "react";

interface PrimaryHeaderProps {
  title?: string;
  activeScreen: "Books" | "Favorites" | "Home";
}

const PrimaryHeader: FC<PrimaryHeaderProps> = ({ title, activeScreen }) => {
  return (
    <S.Header>
      <Sidebar activeScreen={activeScreen} />
      {title && <S.HeaderTitle>{title}</S.HeaderTitle>}
    </S.Header>
  );
};

export default PrimaryHeader;
