import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './NewPlace.css';
import Button from '../../shared/components/FormElements/Button'
import { useForm } from '../../shared/hooks/form-hook';


const NewPlace = () => {
  const[formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false
  )

 

  

  const placeSubmitHandler = e => {
    e.preventDefault();
    console.log(formState.inputs) //enviar ao backend
  };

 
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
      id="title" 
      element="input" 
      type="text" 
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Coloque um nome válido"
      onInput={inputHandler}
      />
      <Input
      id="description" 
      element="textarea"  
      label="Description"
      validators={[VALIDATOR_MINLENGTH(5)]}
      errorText="Coloque uma descrição válida (pelo menos 5 caracteres)"
      onInput={inputHandler}
      />
      <Input
      id="address" 
      element="input"  
      label="Address"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Coloque um valor válido de endereço"
      onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Adicionar lugar
      </Button>
    </form>
  )
}

export default NewPlace
