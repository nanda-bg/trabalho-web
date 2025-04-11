import { useState } from "react";
import * as S from "./styles";
import {
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import FormFooter from "../FormFooter/FormFooter";
import InputField from "@app/screens/Authentication/commonComponents/InputField/InputField";
import ErrorAlert from "@app/screens/Authentication/commonComponents/ErrorAlert/ErrorAlert";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [defaultError, setDefaultError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetErrors = () => {
    setDefaultError(null);
    setUsernameError(null);
    setEmailError(null);
    setPasswordError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    resetErrors();

    if (!formData.email || !formData.password || !formData.username) {
      setDefaultError("Preencha todos os campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setEmailError("Por favor, insira um endereço de e-mail válido.");
      return;
    }

    if (
      formData.password.length < 8 ||
      !/\d/.test(formData.password) ||
      !/[A-Z]/.test(formData.password)
    ) {
      setPasswordError(
        `A senha precisa ter:\n• No mínimo 8 caracteres\n• Um número\n• Uma letra maiúscula`
      );
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      console.log("Usuário cadastrado com sucesso:", user.uid);

      navigate("/");
    } catch (error) {
      setDefaultError("Ocorreu um erro ao cadastrar.");
      console.error("Erro ao adicionar documento: ", error);
    }
  };

  return (
    <S.FormStyled onSubmit={handleSubmit}>
      {defaultError && <ErrorAlert error={defaultError} />}

      <InputField
        icon={"user-round"}
        type={"text"}
        onChange={handleChange}
        placeholder="Username"
        value={formData.username}
      />

      {usernameError && <ErrorAlert error={usernameError} />}

      <InputField
        icon={"mail"}
        type={"text"}
        onChange={handleChange}
        placeholder="E-mail"
        value={formData.email}
      />

      {emailError && <ErrorAlert error={emailError} />}

      <InputField
        icon={"lock"}
        type="password"
        placeholder="Senha"
        onChange={handleChange}
        value={formData.password}
      />

      {passwordError && <ErrorAlert error={passwordError} />}

      <FormFooter />
    </S.FormStyled>
  );
};

export default SignUpForm;
