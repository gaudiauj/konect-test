import React, { useEffect, useReducer, useRef } from "react";
import css from "./App.module.css";
import NumberInput from "./component/numberInput/NumberInput";

function App() {
  return (
    <>
      <header className={`${css.header}`}>
        <h1>Konect test</h1>
      </header>
      <form className={`${css.form}`}>
        <NumberInput onChange={(value) => {}} value={""} />
        <NumberInput onChange={(value) => {}} value={""} />
        <NumberInput onChange={(value) => {}} value={""} />
        <NumberInput onChange={(value) => {}} value={""} />
        <NumberInput onChange={(value) => {}} value={""} />
        <NumberInput onChange={(value) => {}} value={""} />
      </form>
    </>
  );
}

export default App;
