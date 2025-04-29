"use client";

import type React from "react";

import { useState, useRef } from "react";
import * as S from "./styles";
import { ArrowLeft, Check } from "lucide-react";
import { GlobalStyle } from "@app/styles/GlobalStyles";
import UserAvatar from "../CommomComponents/UserAvatar/UserAvatar";
import { useAppSelector } from "@app/store/rootReducer";
import InputField from "../CommomComponents/InputField/InputField";
import TextArea from "../CommomComponents/TextArea/TextArea";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "@app/store/slices/UserSlice";

interface ProfileData {
  name: string;
  username: string;
  email: string;
  bio: string;
  profileImage: string;
}

export default function EditProfile() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { email, username, name, profilePicture } = useAppSelector(
    (state) => state.userSlice
  );

  const [profile, setProfile] = useState<ProfileData>({
    name: name,
    username: username,
    email: email,
    bio: "Film enthusiast and critic. I love discussing cinema and sharing my thoughts on the latest releases.",
    profileImage: profilePicture,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

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
        if ((event.target?.result)) {
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
    dispatch(updateProfile({ ...profile }));

    navigation(-1);
  };

  return (
    <S.Container>
      <GlobalStyle />
      <S.Header>
        <S.SaveButton onClick={handleGoBack}>
          <ArrowLeft size={20} />
        </S.SaveButton>
        <S.Title>Edit Profile</S.Title>
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
            <S.Label>Name</S.Label>
            <InputField
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              placeholder="Your name"
              icon={"user-round"}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Username</S.Label>
            <InputField
              type="text"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
              placeholder="Your username"
              icon={"at-sign"}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Email</S.Label>
            <InputField
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              placeholder="Your email"
              icon={"mail"}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Bio</S.Label>
            <TextArea
              name="bio"
              value={profile.bio}
              handleChange={handleInputChange}
              placeholder="Tell us about yourself"
              rows={4}
            />
          </S.InputGroup>
        </S.FormSection>
      </S.Content>

      <S.LogoSection>
        <S.LogoContainer>
          <S.LogoDot color="#FF8000" />
          <S.LogoDot color="#00CCFF" />
          <S.LogoDot color="#FF0080" />
          <S.LogoText>Letterboxd</S.LogoText>
        </S.LogoContainer>
      </S.LogoSection>
    </S.Container>
  );
}
