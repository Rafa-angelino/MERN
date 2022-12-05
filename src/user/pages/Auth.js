import React, { useState, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Auth.css";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(formState.inputs);

    if (isLogin) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login</h2>
        <hr />
        <form onSubmit={onSubmitHandler}>
          {!isLogin && (
            <Input
              element="input"
              id="name"
              label="Seu nome"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Por favor, coloque um nome"
              onInput={inputHandler}
            />
          )}

          {!isLogin && <ImageUpload onInput={inputHandler} center id="image" />}
          <Input
            id="email"
            element="input"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Por favor, coloque um email válido"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Senha"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Por favor, coloque uma senha de pelo menos 6 caracteres"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLogin ? "LOGIN" : "Cadastre-se"}
          </Button>
        </form>
        <Button inverse onClick={switchHandler}>
          TROQUE PARA {isLogin ? "Cadastre-se" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
