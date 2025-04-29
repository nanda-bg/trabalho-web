import { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import InputField from "@app/screens/CommomComponents/InputField/InputField";
import ErrorAlert from "@app/screens/Authentication/commonComponents/ErrorAlert/ErrorAlert";
import FormFooter from "@app/screens/Authentication/commonComponents/FormFooter/FormFooter";
import { useAppSelector } from "@app/store/rootReducer";
import { useDispatch } from "react-redux";
import { login } from "@app/store/slices/LoginSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginError, isLoading } = useAppSelector(
    (state) => state.loginSlice
  );

  const { userId } = useAppSelector(
    (state) => state.userSlice
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (userId) {
      navigate("/home");
    }
  }, [userId, navigate]);

  return (
    <S.FormStyled onSubmit={handleSubmit}>
      {loginError && <ErrorAlert error={loginError} />}

      <InputField
        icon={"mail"}
        type={"text"}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        value={email}
        name="email"
      />

      <InputField
        icon={"lock"}
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
      />

      <FormFooter
        buttonText="Login"
        footerLink="/sign-up"
        footerText="Ainda não possui uma conta?"
        isLoading={isLoading}
      />
    </S.FormStyled>
  );
};

export default LoginForm;
