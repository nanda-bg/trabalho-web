import { PayloadAction } from "@reduxjs/toolkit";

export interface SignUpState {
  isLoading: boolean;
  emailError?: string;
  passwordError?: string;
  defaultError?: string;
  isSuccessfull?: boolean;
}

export type SignUpPayloadAction = PayloadAction<{
  email: string;
  password: string;
  username: string;
  name: string;
}>;
