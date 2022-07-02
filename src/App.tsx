import React, { useEffect, useReducer, useRef } from "react";
import css from "./App.module.css";
import NumberInput from "./component/numberInput/NumberInput";

type State = {
  numbers: string[];
  currentFocus: number;
};

type ChangeValueAction = {
  type: "changeValue";
  value: string;
  indexToChange: number;
};

type CopyAction = {
  type: "paste";
  value: string;
};

type Action = ChangeValueAction | CopyAction;

const initialState = {
  numbers: ["", "", "", "", "", ""],
  currentFocus: 0,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRefArray: React.RefObject<HTMLInputElement>[] = state.numbers.map(
    () => useRef(null)
  );

  useEffect(() => {
    const nexInput = inputRefArray[state.currentFocus];
    nexInput?.current?.focus();
  }, [state.currentFocus]);

  function onNumberChange(value: string, index: number) {
    dispatch({ type: "changeValue", value, indexToChange: index });
  }
  function handleKeyDown(evt: React.KeyboardEvent<HTMLFormElement>) {
    if (evt.code === "Backspace") {
      dispatch({
        type: "changeValue",
        value: "",
        indexToChange: state.numbers[state.currentFocus]
          ? state.currentFocus
          : state.currentFocus - 1,
      });
    }
  }
  return (
    <>
      <header className={`${css.header}`}>
        <h1>Konect test</h1>
      </header>
      <form
        className={`${css.form}`}
        onKeyDown={handleKeyDown}
        onPaste={(e) => {
          e.preventDefault();
          dispatch({ type: "paste", value: e.clipboardData.getData("Text") });
        }}
      >
        {state.numbers.map((number, index) => (
          <NumberInput
            ref={inputRefArray[index]}
            key={index}
            onChange={(value) => onNumberChange(value, index)}
            value={number}
            disabled={state.currentFocus !== index}
          />
        ))}
      </form>
    </>
  );
}

function reducer(state: State, action: Action) {
  const getNextFocus = () => {
    const numbersLength = state.numbers.length;
    const currentFocus = state.currentFocus;
    const value = action.value;

    if (currentFocus === 0 && !value) {
      return 0;
    }
    if (currentFocus === numbersLength - 1 && !!value) {
      return currentFocus;
    }
    if (!value && !state.numbers[state.currentFocus]) {
      return currentFocus - 1;
    }
    if (!value && currentFocus === numbersLength - 1) {
      return currentFocus;
    }
    if (!!value) {
      return currentFocus + 1;
    }
    return currentFocus - 1;
  };
  switch (action.type) {
    case "changeValue":
      const newNumbers = [...state.numbers];
      newNumbers[action.indexToChange] = action.value;

      return {
        ...state,
        numbers: newNumbers,
        currentFocus: getNextFocus(),
      };
    case "paste":
      const copyValue = action.value;
      const copiedNumbers = [...state.numbers];
      for (var i = 0; i < copiedNumbers.length; i++) {
        copiedNumbers[i] = copyValue[i] || "";
      }
      return {
        ...state,
        numbers: copiedNumbers,
        currentFocus: Math.min(copiedNumbers.length, copyValue.length),
      };
    default:
      throw new Error();
  }
}

export default App;
