import * as S from "./styles";
import Sidebar from "../SideBar/SideBar";
import { FC } from "react";
import { ActiveScreen } from "@app/types/Screens";

interface PrimaryHeaderProps {
  title?: string;
  activeScreen: ActiveScreen;
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
