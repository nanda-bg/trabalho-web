import { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  error?: string;
}

export type GetTokenPayloadAction = PayloadAction<{
  email: string;
  password: string;
}>;
