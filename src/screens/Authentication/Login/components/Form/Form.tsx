import { useState } from "react";
import * as S from "./styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import FormFooter from "../FormFooter/FormFooter";
import { auth } from "@app/config/firebaseConfig";
import InputField from "@app/screens/Authentication/commonComponents/InputField/InputField";
import ErrorAlert from "@app/screens/Authentication/commonComponents/ErrorAlert/ErrorAlert";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setError("E-mail ou senha inválidos");
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <S.FormStyled onSubmit={handleSubmit}>
      {error && <ErrorAlert error={error} />}

      <InputField
        icon={"mail"}
        type={"text"}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        value={email}
      />

      <InputField
        icon={"lock"}
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <FormFooter />
    </S.FormStyled>
  );
};

export default LoginForm;
