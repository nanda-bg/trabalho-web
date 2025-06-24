import * as S from "./styles";
import LoginForm from "./components/Form/Form";

export default function Login() {
  return (
    <S.Container>
      <S.Row>
        <S.FormContainer>
          <S.Logo>LITLOG</S.Logo>

          <S.Title>Entrar</S.Title>

          <LoginForm />
        </S.FormContainer>
      </S.Row>
    </S.Container>
  );
}
