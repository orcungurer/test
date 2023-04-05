import useInput from "../hooks/use-input";

const isEmail = value => value.includes("@"); // alternative

const BasicForm = (props) => {
  // 2, name
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  // 2, surname
  const {
    value: enteredSurname,
    isValid: enteredSurnameIsValid,
    hasError: surnameHasError,
    valueChangeHandler: surnameChangeHandler,
    inputBlurHandler: surnameBlurHandler,
    reset: resetSurnameInput,
  } = useInput((value) => value.trim() !== "");

  // 2, email
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  // 3, check overall form validity
  let formIsValid = false;

  if (enteredNameIsValid && enteredSurnameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // 4, form handler
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // 5
    // if (!enteredNameIsValid && !enteredSurnameIsValid && !enteredEmailIsValid) {
    if (!formIsValid) {
      return;
    }

    console.log("Submitted!");
    console.log(enteredName, enteredSurname, enteredEmail);

    // 6
    resetNameInput();
    resetSurnameInput();
    resetEmailInput();
  };

  // 7
  const nameInputClasses = nameHasError
    ? "form-control invalid"
    : "form-control";
  
  const surnameInputClasses = surnameHasError
    ? "form-control invalid"
    : "form-control";
  
  const emailInputClasses = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={nameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={nameChangeHandler} // 1
            onBlur={nameBlurHandler} // 1
            value={enteredName} // 1
          />
          {nameHasError && <p>Enter a valid name.</p>}
        </div>
        <div className={surnameInputClasses}>
          <label htmlFor="surname">Last Name</label>
          <input
            type="text"
            id="surname"
            onChange={surnameChangeHandler}
            onBlur={surnameBlurHandler}
            value={enteredSurname}
          />
          {surnameHasError && <p>Enter a valid surname.</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailHasError && <p>Enter a valid email.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
