import { FC } from "react";
import * as S from "./styles";
import { UserRound } from "lucide-react";

interface UserAvatarProps {
  profileImgUrl?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ profileImgUrl }) => {
  return (
    <S.UserAvatar>
      {profileImgUrl ? (
        <img src={profileImgUrl} alt="User Avatar" />
      ) : (
        <UserRound />
      )}
    </S.UserAvatar>
  );
};

export default UserAvatar;
