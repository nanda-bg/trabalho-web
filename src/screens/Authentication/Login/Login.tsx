import * as S from "./styles";
import LoginForm from "./components/Form/Form";

export default function Login() {
  return (
    <S.ContainerFluid>
      <S.Row>
        <S.ContainerForm>
          <S.Logo>LETTERBOX</S.Logo>

          <S.Title>Entrar</S.Title>

          <LoginForm />
        </S.ContainerForm>
      </S.Row>
    </S.ContainerFluid>
  );
}
