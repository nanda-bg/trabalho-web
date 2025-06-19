import { User } from "@app/types/User";
import { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  username: User["username"];
  userId: User["uid"];
  email: User["email"];
  name: User["name"];
  profilePicture?: User["profilePicture"];
  bio?: User["bio"];
  isLoading: boolean;
  error?: string;
  followers: User["followers"];
  following: User["following"];
  type: User["type"];
}

export type UpdateProfilePayloadAction = PayloadAction<{
  email: string;
  username: string;
  name: string;
  profileImage: string;
  bio: string;
  type: "CONTRIBUIDOR" | "PADRAO" | null
}>;

export type FetchUserInfoPayloadAction = PayloadAction<{
  uid: string;
}>;
