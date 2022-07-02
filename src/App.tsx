import React, { useEffect, useReducer, useRef } from "react";
import css from "./App.module.css";

function App() {
  return (
    <>
      <header className={`${css.header}`}>
        <h1>Konect test</h1>
      </header>
      <form>
        <input type="text" pattern="[0-9]" placeholder="."></input>
        <input type="text" pattern="[0-9]" placeholder="."></input>
        <input type="text" pattern="[0-9]" placeholder="."></input>
        <input type="text" pattern="[0-9]" placeholder="."></input>
        <input type="text" pattern="[0-9]" placeholder="."></input>
        <input type="text" pattern="[0-9]" placeholder="."></input>
      </form>
    </>
  );
}

export default App;
