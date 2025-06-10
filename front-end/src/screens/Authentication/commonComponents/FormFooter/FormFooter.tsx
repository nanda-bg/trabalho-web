import { FC } from "react";
import * as S from "./styles";

interface FormFooterProps {
  buttonText: string;
  footerText: string;
  footerLink: string;
  isLoading?: boolean;
}

const FormFooter: FC<FormFooterProps> = ({
  isLoading = false,
  buttonText,
  footerText,
  footerLink,
}) => {
  return (
    <S.FormFooter>
      <S.SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? <S.LoadingSpinner /> : buttonText}
      </S.SubmitButton>

      <S.FooterText>
        {footerText} <S.Break />
        <S.Link href={footerLink}>Clique aqui.</S.Link>
      </S.FooterText>
    </S.FormFooter>
  );
};

export default FormFooter;
