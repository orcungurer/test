import { useState } from "react";

const useInput = (validateValue) => { // 2
  const [enteredValue, setEnteredValue] = useState(""); // 1
  const [isTouched, setIsTouched] = useState(false); // 1

  const valueIsValid = validateValue(enteredValue); // 1
  const hasError = !valueIsValid && isTouched; // 1

  // 4
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  // 4
  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  // 11
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  // 3, 5
  return {
    value: enteredValue,
    isValid: valueIsValid, // 7
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset // 12
  };
};

export default useInput;