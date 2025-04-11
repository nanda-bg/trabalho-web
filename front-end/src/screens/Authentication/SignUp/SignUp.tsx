import * as S from "./styles";
import Form from "./components/Form/Form";

export default function SignUp() {
  return (
    <S.ContainerFluid>
      <S.Row>
        <S.ContainerForm>
          <S.Logo>LETTERBOX</S.Logo>

          <S.Title>Cadastre-se</S.Title>

          <Form />
        </S.ContainerForm>
      </S.Row>
    </S.ContainerFluid>
  );
}
