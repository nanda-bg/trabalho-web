import UserAvatar from "@app/screens/CommomComponents/UserAvatar/UserAvatar";
import * as S from "./styles";
import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { User } from "@app/types/User";

interface HeaderProps {
  user: User;
  createdAt: string;
}

const Header: FC<HeaderProps> = ({ user, createdAt }) => {
  const navigate = useNavigate();

  const formattedCreatedAt = useMemo(() => {
    const creationTime = new Date(createdAt);
    const now = new Date();

    const nowUTC = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

    const diffInMinutes = differenceInMinutes(nowUTC, creationTime);
    const diffInHours = differenceInHours(nowUTC, creationTime);
    const diffInDays = differenceInDays(nowUTC, creationTime);
    const diffInWeeks = differenceInWeeks(nowUTC, creationTime);
    const diffInMonths = differenceInMonths(nowUTC, creationTime);

    if (diffInMinutes < 1) {
      return "Agora";
    } else if (diffInHours < 1) {
      return `${diffInMinutes} minutos`;
    } else if (diffInDays < 1) {
      return `${diffInHours} horas`;
    } else if (diffInWeeks < 1) {
      return `${diffInDays} dias`;
    } else if (diffInMonths < 1) {
      return `${diffInWeeks} semanas`;
    } else {
      return format(creationTime, "dd/MM/yyyy", { locale: ptBR });
    }
  }, [createdAt]);

  const handleUserClick = () => {
    navigate(`/user/${user.uid}`);
  };

  return (
    <S.ReviewHeader>
      <S.ClickableUserInfo onClick={handleUserClick}>
        <UserAvatar profileImgUrl={user.profilePicture} />
        <S.ReviewUserInfo>
          <S.ReviewUserName>{user.username}</S.ReviewUserName>
          <S.ReviewTime>{formattedCreatedAt}</S.ReviewTime>
        </S.ReviewUserInfo>
      </S.ClickableUserInfo>
    </S.ReviewHeader>
  );
};

export default Header;
