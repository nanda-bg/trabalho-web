import * as S from "./styles";

const TextArea = ({ name, placeholder, value, rows, handleChange }) => (
  <S.TextArea
    name={name}
    value={value}
    onChange={handleChange}
    placeholder={placeholder}
    rows={rows}
  />
);

export default TextArea;
