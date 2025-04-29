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
}

export type UpdateProfilePayloadAction = PayloadAction<{
  email: string;
  username: string;
  name: string;
  profileImage: string;
  bio: string;
}>;
