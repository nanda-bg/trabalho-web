import * as S from "./styles";

export default function UserTypeRatio({ value, onChange }) {
  return (
    <S.RadioGroup>
      <S.RadioLabel>
        <S.RadioInput
          type="radio"
          name="userRole"
          value="PADRAO"
          checked={value === "PADRAO"}
          onChange={onChange}
        />
        Leitor
      </S.RadioLabel>
      <S.RadioLabel>
        <S.RadioInput
          type="radio"
          name="userRole"
          value="CONTRIBUIDOR"
          checked={value === "CONTRIBUIDOR"}
          onChange={onChange}
        />
        Contribuidor
      </S.RadioLabel>
    </S.RadioGroup>
  );
}
