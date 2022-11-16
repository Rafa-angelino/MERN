import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './NewPlace.css';
import Button from '../../shared/components/FormElements/Button'

const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (const inputId in state.inputs) {
          if(inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
         return{
          ...state,
          inputs: {
            ...state.inputs, //current input state 
            [action.inputId]: { value: action.value, isValid: action.isValid},
            
          },
          isValid: formIsValid
         };
      default:
        return state;   
    }
}

const NewPlace = () => {

 const[formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    } ,
    isValid: false
  })

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "INPUT_CHANGE", value: value, isValid: isValid, inputId: id})
  }, []);

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
