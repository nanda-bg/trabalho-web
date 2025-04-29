import * as S from './styles';

const InputField = ({ icon, type, placeholder, value, onChange, name }) => (
  <S.InputContainer>
    <S.StyledIcon name={icon}/>
    <S.Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  </S.InputContainer>
);

export default InputField;
