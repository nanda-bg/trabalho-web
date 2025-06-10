import { FC } from "react";
import styled from "styled-components";

export const ErrorAlert = styled.section`
  margin-bottom: 10px;
  white-space: pre-line;
`;

interface ErrorTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  $size?: "sm" | "md" | "lg";
}

export const ErrorText: FC<ErrorTextProps> = styled.p<ErrorTextProps>`
  color: red;
  font-size: ${({ $size }) =>
    $size === "lg" ? "14px" :
    $size === "md" ? "12px" :
    "10px"};
`;
