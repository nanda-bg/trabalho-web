import * as S from "./styles";

const FormFooter = () => (
  <S.FormFooter>
    <S.SubmitButton type="submit" value="Cadastrar" />
    <S.FooterText>
      Já possui uma conta? <S.Break />
      <S.Link href="/">Clique aqui.</S.Link>
    </S.FooterText>
  </S.FormFooter>
);

export default FormFooter;
