// import { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  // 6
  const {
    value: enteredName,
    isValid: enteredNameIsValid, // 8
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput, // 13
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    // 8.5
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }

    console.log("Entered Name", enteredName);
    console.log("Entered Email", enteredEmail);

    resetNameInput(); // 14
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError // 15
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler} // 9
          value={enteredName}
        />
        {nameInputHasError && <p>Name cannot be empty.</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p>Email cannot be empty or invalid.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

// ---------------------------------------------------------------------
// this is the old way, before custom hook lecture 206.
// import { useEffect, useState } from "react";

// const SimpleInput = (props) => {
//   const [enteredName, setEnteredName] = useState("");
//   const [enteredNameTouched, setEnteredNameTouched] = useState(false);

//   const [enteredEmail, setEnteredEmail] = useState("");
//   const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

//   const enteredNameIsValid = enteredName.trim() !== "";
//   const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

//   const enteredEmailIsValid = enteredEmail.includes("@");
//   const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

//   // const [formIsValid, setFormIsValid] = useState(false);
//   // useEffect(() => {
//   //   if (enteredNameIsValid) {
//   //     setFormIsValid(true);
//   //   } else {
//   //     setFormIsValid(false);
//   //   }
//   // }, [enteredNameIsValid]);

//   let formIsValid = false;

//   if(enteredNameIsValid && enteredEmailIsValid) {
//     formIsValid = true;
//   }

//   const nameChangeHandler = (event) => {
//     setEnteredName(event.target.value);
//   };

//   const emailChangeHandler = (event) => {
//     setEnteredEmail(event.target.value);
//   };

//   const nameInputBlurHandler = () => {
//     setEnteredNameTouched(true);
//   };

//   const emailInputBlurHandler = () => {
//     setEnteredEmailTouched(true);
//   };

//   const formSubmissionHandler = (event) => {
//     event.preventDefault();
//     setEnteredNameTouched(true);
//     setEnteredEmailTouched(true);

//     if (!enteredNameIsValid && !enteredEmailIsValid) {
//       return;
//     }

//     console.log("Entered Name", enteredName);
//     console.log("Entered Email", enteredEmail);

//     setEnteredName("");
//     setEnteredEmail("");
//     setEnteredNameTouched(false);
//     setEnteredEmailTouched(false);
//   };

//   const nameInputClasses = nameInputIsInvalid
//     ? "form-control invalid"
//     : "form-control";

//   const emailInputClasses = emailInputIsInvalid
//     ? "form-control invalid"
//     : "form-control";

//   return (
//     <form onSubmit={formSubmissionHandler}>
//       <div className={nameInputClasses}>
//         <label htmlFor="name">Your Name</label>
//         <input
//           type="text"
//           id="name"
//           onChange={nameChangeHandler}
//           onBlur={nameInputBlurHandler}
//           value={enteredName}
//         />
//         {nameInputIsInvalid && <p>Name cannot be empty.</p>}
//       </div>
//       <div className={emailInputClasses}>
//         <label htmlFor="email">Your Email</label>
//         <input
//           type="email"
//           id="email"
//           onChange={emailChangeHandler}
//           onBlur={emailInputBlurHandler}
//           value={enteredEmail}
//         />
//         {emailInputIsInvalid && <p>Email cannot be empty or invalid.</p>}
//       </div>
//       <div className="form-actions">
//         <button disabled={!formIsValid}>Submit</button>
//       </div>
//     </form>
//   );
// };

// export default SimpleInput;

// ---------------------------------------------------------------------
// this is the old way, see mid of lecture 204.
// import { useRef, useState } from "react";

// const SimpleInput = (props) => {
//   // 1st way, useState
//   const [enteredName, setEnteredName] = useState("");

//   const nameChangeHandler = (event) => {
//     setEnteredName(event.target.value);

//     if (event.target.value.trim() !== "") {
//       setEnteredNameIsValid(true);
//     }
//   };

//   const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
//   const [enteredNameTouched, setEnteredNameTouched] = useState(false);

//   // 2nd way, useRef
//   const nameInputRef = useRef();

//   const nameInputBlurHandler = () => {
//     setEnteredNameTouched(true);

//     if (enteredName.trim() === "") {
//       setEnteredNameIsValid(false);
//     }
//   };

//   const formSubmissionHandler = (event) => {
//     event.preventDefault();

//     setEnteredNameTouched(true);

//     if (enteredName.trim() === "") {
//       setEnteredNameIsValid(false);
//       return;
//     }

//     setEnteredNameIsValid(true);

//     // 1st way, useState
//     console.log(enteredName);

//     // 2nd way, useRef
//     const enteredValue = nameInputRef.current.value;
//     console.log(enteredValue);

//     // 1st way, useState
//     setEnteredName("");

//     // 2nd way, useRef
//     // nameInputRef.current.value = ""; NOT IDEAL.
//   };

//   const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

//   const nameInputClasses = nameInputIsInvalid
//     ? "form-control invalid"
//     : "form-control";

//   return (
//     <form onSubmit={formSubmissionHandler}>
//       <div className={nameInputClasses}>
//         <label htmlFor="name">Your Name</label>
//         <input
//           type="text"
//           id="name"
//           onChange={nameChangeHandler}
//           onBlur={nameInputBlurHandler}
//           value={enteredName}
//           ref={nameInputRef}
//         />
//         {nameInputIsInvalid && <p>Name cannot be empty.</p>}
//       </div>
//       <div className="form-actions">
//         <button>Submit</button>
//       </div>
//     </form>
//   );
// };

// export default SimpleInput;
