import * as S from "./styles";

const FormFooter = () => (
  <S.FormFooter>
    <S.SubmitButton type="submit" value="Login" />
    <S.FooterText>
      Ainda não possui uma conta? <S.Break />{" "}
      <S.Link href="/sign-up">Clique aqui.</S.Link>
    </S.FooterText>
  </S.FormFooter>
);

export default FormFooter;
