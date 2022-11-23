import React, { useState, useContext } from "react";

import "./Auth.css";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

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
        },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };
  return (
    <Card className="authentication">
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
  );
};

export default Auth;
