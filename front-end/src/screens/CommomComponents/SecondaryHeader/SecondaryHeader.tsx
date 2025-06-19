import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FC } from "react";

interface SecondaryHeaderProps {
  title: string;
}

const SecondaryHeader: FC<SecondaryHeaderProps> = ({ title }) => {
  const navigation = useNavigate();

  const handleGoBack = () => {
    navigation(-1);
  };

  return (
    <S.Header>
      <S.GoBack onClick={handleGoBack}>
        <ArrowLeft size={20} />
      </S.GoBack>
      <S.HeaderTitle>{title}</S.HeaderTitle>
    </S.Header>
  );
};

export default SecondaryHeader;
