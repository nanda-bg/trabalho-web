import * as S from "./styles";
import UserAvatar from "@app/screens/CommomComponents/UserAvatar/UserAvatar";
import { useAppSelector } from "@app/store/rootReducer";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const navigate = useNavigate();
  const { username, name, profilePicture, followers, following } =
    useAppSelector((state) => state.userSlice);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <S.ProfileContainer>
      <S.Avatar>
        <UserAvatar size="lg" profileImgUrl={profilePicture} />
      </S.Avatar>
      <S.Username>{name}</S.Username>
      <S.Handle>@{username}</S.Handle>

      <S.StatsContainer>
        <S.StatItem>
          <S.StatValue>{followers || 0}</S.StatValue>
          <S.StatLabel>Seguidores</S.StatLabel>
        </S.StatItem>
        <S.StatItem>
          <S.StatValue>{following || 0}</S.StatValue>
          <S.StatLabel>Seguindo</S.StatLabel>
        </S.StatItem>
      </S.StatsContainer>

      <S.EditButton onClick={handleEditProfile}>Editar perfil</S.EditButton>
    </S.ProfileContainer>
  );
};

export default ProfileSection;
