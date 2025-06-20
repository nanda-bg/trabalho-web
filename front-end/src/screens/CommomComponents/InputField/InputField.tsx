import { FC } from "react";
import * as S from "./styles";
import { IconName } from "lucide-react/dynamic";

interface InputFieldProps {
  icon: IconName;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  max?: number;
}

const InputField: FC<InputFieldProps> = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  name,
  max,
}) => (
  <S.InputContainer>
    <S.StyledIcon name={icon} />
    <S.Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      max={max}
    />
  </S.InputContainer>
);

export default InputField;
