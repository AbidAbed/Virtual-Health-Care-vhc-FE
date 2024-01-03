// Form.js
import { useEffect, useReducer } from "react";
import useConfigFormState from "../Hooks/useConfigFormState";
import Input from "./Input";
import Button from "./Button";

function reducer(state, action) {
  if (action.type === "RESET" && Object.keys(state).length !== 0) {
    const newState = Object.entries(state).reduce((prev, curr) => {
      prev[curr[0]] = "";
      return prev;
    }, {});
    return { ...newState };
  }
  return { ...state, [action.type]: action.payload };
}

function Form({
  children,
  config,
  responseError,
  submitButtonText,
  onSubmit,
  submitButtonClassname,
  submitButtonIcon,
  setResponseError,
  parentValidate,
  reset,
}) {
  const configState = useConfigFormState(config);

  const [state, changeState] = useReducer(reducer, {
    ...configState,
    ["errors"]: null,
    ["resError"]: responseError,
  });

  function onElValueChange(event, type, validator) {
    changeState({ type, payload: event.target.value });

    if (validator(event.target.value) !== null) {
      changeState({ type: "errors", payload: validator(event.target.value) });
    } else changeState({ type: "errors", payload: null });

    setResponseError(null);
    changeState({ type: "resError", payload: null });
  }

  const renderedForm = config.map((el) => (
    <div
      className="relative mb-4 flex justify-center items-center grid grid-rows-1 grid-cols-2"
      key={el.stateName}
    >
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2 ">
          {el.label}
        </label>
      </div>
      {el.disabled ? (
        <div>
          <p className="text-gray-800">{el.value}</p>
        </div>
      ) : (
        <div>
          <Input
            onChange={(event) => {
              onElValueChange(event, el.stateName, el.validator);
            }}
            value={state[el.stateName]}
            className={`border border-gray-300 p-3 rounded focus:outline-none ${
              state["errors"]
                ? "border-red-500"
                : "focus:border-green-500 transition-all duration-300"
            }`}
            placeHolder={el.placeHolder}
            type={el.type}
          />
        </div>
      )}
    </div>
  ));

  function handleSubmitForm(event) {
    event.preventDefault();
    if (parentValidate) {
      const validation = config.reduce((prev, curr) => {
        if (curr.validator) {
          let validation = curr.validator(state[curr.stateName]);
          if (validation !== null && state[curr.stateName] !== "") {
            if (prev === "") return validation + ", ";
            else return prev + validation + ", ";
          } else return prev;
        } else return prev;
      }, "");
      if (validation === "") onSubmit(state);
      else changeState({ type: "errors", payload: validation });
      
    } else {
      const validation = config.reduce((prev, curr) => {
        if (curr.validator) {
          let validation = curr.validator(state[curr.stateName]);
          if (validation !== null) {
            if (prev === "") return validation + ", ";
            else return prev + validation + ", ";
          } else return prev;
        } else return prev;
      }, "");
      if (validation === "") onSubmit(state);
      else changeState({ type: "errors", payload: validation });
    }
  }

  useEffect(() => {
    changeState({ type: "resError", payload: responseError });
  }, [responseError]);

  useEffect(() => {
    if (reset) {
      changeState({ type: "RESET" });
    }
  }, [reset]);

  return (
    <form
      onSubmit={handleSubmitForm}
      className="w-100 mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300"
    >
      {renderedForm}
      {children && <div className="mb-4">{children}</div>}
      {(state["errors"] || state["resError"]) && (
        <p className="text-red-500 text-xs mt-1 whitespace-normal w-72">
          {state["errors"]}
          {state["resError"]}
        </p>
      )}
      <Button
        className={`${submitButtonClassname || "hover:bg-green-200"}`}
        onChange={handleSubmitForm}
        text={submitButtonText}
        icon={submitButtonIcon}
      />
    </form>
  );
}

export default Form;
