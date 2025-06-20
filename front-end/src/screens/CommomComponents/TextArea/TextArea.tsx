import { FC } from "react";
import * as S from "./styles";

interface TextAreaProps {
  name: string;
  placeholder: string;
  value: string;
  rows?: number;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  max?: number;
}

const TextArea: FC<TextAreaProps> = ({ name, placeholder, value, rows, handleChange, max }) => (
  <S.TextArea
    name={name}
    value={value}
    onChange={handleChange}
    placeholder={placeholder}
    rows={rows}
    maxLength={max}
  />
);

export default TextArea;
