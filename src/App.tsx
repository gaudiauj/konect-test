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
  return (
    <>
      <header className={`${css.header}`}>
        <h1>Konect test</h1>
      </header>
      <form className={`${css.form}`}>
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
  switch (action.type) {
    case "changeValue":
      const newNumbers = [...state.numbers];
      newNumbers[action.indexToChange] = action.value;

      return {
        ...state,
        numbers: newNumbers,
        currentFocus: state.currentFocus + 1,
      };
    case "paste":
      return state;
    default:
      throw new Error();
  }
}

export default App;
