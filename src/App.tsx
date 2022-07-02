import React, { useEffect, useReducer, useRef } from "react";
import css from "./App.module.css";
import NumberInput from "./component/numberInput/NumberInput";

type State = {
  numbers: string[];
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
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
            key={index}
            onChange={(value) => onNumberChange(value, index)}
            value={number}
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
      };
    case "paste":
      return state;
    default:
      throw new Error();
  }
}

export default App;
