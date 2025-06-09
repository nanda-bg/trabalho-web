import { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  username: string;
  userId: string;
  email: string;
  name: string;
  profilePicture?: string;
  bio?: string;
  isLoading: boolean;
  error?: string;
  followers: number;
  following: number;
}

export type UpdateProfilePayloadAction = PayloadAction<{
  email: string;
  username: string;
  name: string;
  profileImage: string;
  bio: string;
}>;

export type FetchUserInfoPayloadAction = PayloadAction<{
  uid: string;
}>;

export interface User {
  uid: string;
  email: string;
  name: string;
  username: string;
  profilePicture: string;
  bio: string;
  followers: number;
  following: number;
}
