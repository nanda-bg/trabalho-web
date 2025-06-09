import { useEffect, useState } from "react";
import * as S from "./styles";
import InputField from "@app/screens/CommomComponents/InputField/InputField";
import ErrorAlert from "@app/screens/Authentication/commonComponents/ErrorAlert/ErrorAlert";
import FormFooter from "@app/screens/Authentication/commonComponents/FormFooter/FormFooter";
import { useAppSelector } from "@app/store/rootReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "@app/store/slices/SignUpSlice";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccessfull } = useAppSelector((state) => state.signUpSlice);

  const { defaultError, emailError, passwordError, isLoading } = useAppSelector(
    (state) => state.signUpSlice
  );

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(signUp(formData));
  };

  useEffect(() => {
    if (isSuccessfull) {
      navigate("/home");
    }
  }, [isSuccessfull, navigate]);

  return (
    <S.FormStyled onSubmit={handleSubmit}>
      {defaultError && <ErrorAlert error={defaultError} />}

      <InputField
        icon={"user-round"}
        type={"text"}
        onChange={handleChange}
        placeholder="Name"
        value={formData.name}
        name="name"
      />

      <InputField
        icon={"at-sign"}
        type={"text"}
        onChange={handleChange}
        placeholder="Username"
        value={formData.username}
        name="username"
      />

      <InputField
        icon={"mail"}
        type={"text"}
        onChange={handleChange}
        placeholder="E-mail"
        value={formData.email}
        name="email"
      />

      {emailError && <ErrorAlert error={emailError} />}

      <InputField
        icon={"lock"}
        type="password"
        placeholder="Senha"
        onChange={handleChange}
        value={formData.password}
        name="password"
      />

      {passwordError && <ErrorAlert error={passwordError} />}

      <FormFooter
        buttonText="Cadastrar"
        footerText="Já tem uma conta?"
        footerLink="/"
        isLoading={isLoading}
      />
    </S.FormStyled>
  );
};

export default SignUpForm;
