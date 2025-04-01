import * as S from './styles';

const InputField = ({ icon, type, placeholder, value, onChange }) => (
  <S.InputContainer>
    <S.StyledIcon name={icon}/>
    <S.Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </S.InputContainer>
);

export default InputField;
