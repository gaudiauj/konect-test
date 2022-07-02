import React, { useEffect, useReducer, useRef, useState } from "react";
import css from "./App.module.css";
import NumberInput from "./component/numberInput/NumberInput";
import { validateNumbers } from "./validateNumbers";
import reducer, { initialState } from "./reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const inputRefArray: React.RefObject<HTMLInputElement>[] = state.numbers.map(
    () => useRef(null)
  );

  useEffect(() => {
    const nexInput = inputRefArray[state.currentFocus];
    nexInput?.current?.focus();
  }, [state.currentFocus]);

  const checkNumbers = async () => {
    if (state.numbers.every((number) => !!number)) {
      try {
        setLoading(true);
        //validateNumbers is a async function that simulate a backend work on validation
        const data = await validateNumbers(state.numbers.join(""));
        if (data.code !== "200") {
          return setError("Oups le code que tu as saisi est incorrect");
        }
        setError("");
        window.location.href =
          "http://blogdecarole432.b.l.pic.centerblog.net/tk4d7e63.gif";
      } catch (e) {
        return setError("Oups le code que tu as saisi est incorrect");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    checkNumbers();
  }, [state.numbers]);

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
        onSubmit={checkNumbers}
        onPaste={(e) => {
          e.preventDefault();
          dispatch({ type: "paste", value: e.clipboardData.getData("Text") });
        }}
      >
        <fieldset>
          {state.numbers.map((number, index) => (
            <NumberInput
              ref={inputRefArray[index]}
              key={index}
              onChange={(value) => onNumberChange(value, index)}
              value={number}
              disabled={state.currentFocus !== index}
            />
          ))}
        </fieldset>
        {error && <p className={css.error}>{error}</p>}
        {loading && <p> vérification ... </p>}
      </form>
    </>
  );
}

export default App;
