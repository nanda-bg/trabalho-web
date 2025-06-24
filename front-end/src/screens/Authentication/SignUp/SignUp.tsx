import * as S from "./styles";
import Form from "./components/Form/Form";

export default function SignUp() {
  return (
    <S.Container>
      <S.Row>
        <S.FormContainer>
          <S.Logo>LITLOG</S.Logo>

          <S.Title>Cadastre-se</S.Title>

          <Form />
        </S.FormContainer>
      </S.Row>
    </S.Container>
  );
}
