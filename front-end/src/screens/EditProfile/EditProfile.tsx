import type React from "react";

import { useState, useRef, useEffect } from "react";
import * as S from "./styles";
import { ArrowLeft, Check } from "lucide-react";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import UserAvatar from "../CommomComponents/UserAvatar/UserAvatar";
import { useAppSelector } from "@app/store/rootReducer";
import InputField from "../CommomComponents/InputField/InputField";
import TextArea from "../CommomComponents/TextArea/TextArea";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserSliceField, updateProfile } from "@app/store/slices/UserSlice";
import { listReviewsByUser } from "@app/store/slices/ReviewsByUserSlice";
import Loading from "./components/LoadingAnimation/LoadingAnimation";
import UserTypeRatio from "./components/UserTypeRatio/UserTypeRatio";
import ErrorAlert from "../Authentication/commonComponents/ErrorAlert/ErrorAlert";

interface ProfileData {
  name: string;
  username: string;
  email: string;
  bio: string;
  profileImage: string;
  type: "CONTRIBUIDOR" | "PADRAO" | null;
}

export default function EditProfile() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const {
    email,
    username,
    name,
    profilePicture,
    bio,
    userId,
    type,
    isLoading,
    error,
  } = useAppSelector((state) => state.userSlice);

  const { reviewsByUser, isLoading: isLoadingUserReviews } = useAppSelector(
    (state) => state.reviewsByUserlice
  );

  const [profile, setProfile] = useState<ProfileData>({
    name: name,
    username: username,
    email: email,
    bio: bio,
    profileImage: profilePicture,
    type: type,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!userId) return;

    dispatch(listReviewsByUser({ userId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    dispatch(setUserSliceField({ key: "error", value: null }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfile((prev) => ({
            ...prev,
            profileImage: event.target.result as string,
          }));
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleGoBack = () => {
    navigation(-1);
  };

  const handleSave = () => {
    dispatch(
      updateProfile({
        ...profile,
      })
    );
  };

  return (
    <S.Container>
      <GlobalStyle />
      <Loading active={isLoading || isLoadingUserReviews} />
      <S.Header>
        <S.SaveButton onClick={handleGoBack}>
          <ArrowLeft size={20} />
        </S.SaveButton>
        <S.Title>Editar Perfil</S.Title>
        <S.SaveButton onClick={handleSave}>
          <Check size={20} />
        </S.SaveButton>
      </S.Header>

      <S.Content>
        <S.ProfileImageSection>
          <S.ProfileImageContainer onClick={handleImageClick}>
            <UserAvatar profileImgUrl={profile.profileImage} size="lg" />
          </S.ProfileImageContainer>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </S.ProfileImageSection>

        <S.FormSection>
          <S.InputGroup>
            <S.Label>Nome</S.Label>
            <InputField
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              placeholder="Seu nome"
              icon={"user-round"}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Nome de usuário</S.Label>
            <InputField
              type="text"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
              placeholder="Seu nome de usuário"
              icon={"at-sign"}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>E-mail</S.Label>
            <InputField
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              placeholder="Seu e-mail"
              icon={"mail"}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Biografia</S.Label>
            <TextArea
              name="bio"
              value={profile.bio}
              handleChange={handleInputChange}
              placeholder="Toda história começa com uma boa introdução. Escreva a sua aqui."
              rows={4}
            />
          </S.InputGroup>

          {reviewsByUser?.length > 5 && (
            <S.InputGroup>
              <S.Label>Tipo de perfil</S.Label>
              <UserTypeRatio
                value={
                  profile.type === "CONTRIBUIDOR" ? "CONTRIBUIDOR" : "PADRAO"
                }
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    type:
                      e.target.value === "CONTRIBUIDOR"
                        ? "CONTRIBUIDOR"
                        : "PADRAO",
                  }))
                }
              />
            </S.InputGroup>
          )}
        </S.FormSection>
        {error && (
          <S.ErrorContainer>
            <ErrorAlert error={error} size="lg" />
          </S.ErrorContainer>
        )}
      </S.Content>

      <S.LogoSection>
        <S.LogoContainer>
          <S.LogoDot color="#9C4A8B" />
          <S.LogoDot color="#EB62AB" />
          <S.LogoDot color="#E9A6A6" />
          <S.LogoText>LitLog</S.LogoText>
        </S.LogoContainer>
      </S.LogoSection>
    </S.Container>
  );
}
