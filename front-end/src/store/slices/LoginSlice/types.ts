import { PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  isLoading: boolean;
  loginError?: string;
  logoutError?: string;
}

export type LoginPayloadAction = PayloadAction<{
  email: string;
  password: string;
}>;
