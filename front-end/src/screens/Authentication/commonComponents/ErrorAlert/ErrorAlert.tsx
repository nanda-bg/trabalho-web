import { FC } from "react";
import * as S from "./styles";

interface ErrorAlertProps {
  error: string;
  size?: "sm" | "md" | "lg";
}
const ErrorAlert: FC<ErrorAlertProps> = ({ error, size}) => (
  <S.ErrorAlert>
    <S.ErrorText $size={size}>{error}</S.ErrorText>
  </S.ErrorAlert>
);

export default ErrorAlert;
