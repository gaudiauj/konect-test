import React from "react";
import css from "./NumberInput.module.css";

type props = {
  onChange: (value: string) => void;
  value: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const NumberInput = ({ onChange, value, onClick }: props) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    onChange(value);
  }

  return (
    <input
      className={`${css.input}`}
      onChange={handleChange}
      type="text"
      pattern="[0-9]"
      placeholder="•"
      value={value}
      onClick={onClick}
      required
    />
  );
};

export default NumberInput;
