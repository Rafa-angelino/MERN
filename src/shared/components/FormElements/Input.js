import React, { useReducer, useEffect } from "react";
import "./Input.css";
import { validate } from "../../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
      case "TOUCH":
        return {
            ...state,
            isTouched: true
        }
    default:
      return state;
  }
};

const Input = ({
  label,
  id,
  element,
  type,
  placeholder,
  rows,
  validators,
  errorText,
  onInput,
  initialValue,
  initialValid
}) => {

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || "",
    isTouched: false,
    isValid: initialValid || false,
  });

  const { value, isValid } = inputState

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = (e) => {
    dispatch({ type: "CHANGE", val: e.target.value, validators: validators });
  };

  const touchHandler = () => {
    dispatch ({ type: 'TOUCH'})
  }

  const formType =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea 
      id={id} 
      rows={rows || 3}
      onChange={changeHandler}
      value={inputState.value} 
      onBlur={touchHandler} />
    );

  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched &&
        "form-control--invalid"} `}
    >
      <label htmlFor={id}>{label}</label>
      {formType}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
