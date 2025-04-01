import * as S from "./styles";

const ErrorAlert = ({ error }) => (
  <S.ErrorAlert>
    <S.ErrorText>{error}</S.ErrorText>
  </S.ErrorAlert>
);

export default ErrorAlert;
