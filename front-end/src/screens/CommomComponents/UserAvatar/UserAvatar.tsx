import { FC, useMemo } from "react";
import * as S from "./styles";
import { UserRound } from "lucide-react";

interface UserAvatarProps {
  profileImgUrl?: string;
  size?: "sm" | "md" | "lg"
}

const UserAvatar: FC<UserAvatarProps> = ({ profileImgUrl, size }) => {
  const diameter = useMemo(() => {
    if (size === "md") return 48;

    if (size === "lg") return 72;

    return 24
  }, [size])

  return (
    <S.UserAvatar diameter={diameter}>
      {profileImgUrl ? (
        <img src={profileImgUrl} alt="User Avatar" />
      ) : (
        <UserRound />
      )}
    </S.UserAvatar>
  );
};

export default UserAvatar;
