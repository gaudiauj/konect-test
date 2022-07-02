import React from "react";
import css from "./NumberInput.module.css";

type props = {
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const NumberInput = React.forwardRef(
  (
    { onChange, value, disabled = false, onClick }: props,
    ref: React.Ref<HTMLInputElement>
  ) => {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const value = event.target.value;
      const lastChar = value[value.length - 1];
      if (/^[0-9]?$/.test(lastChar)) {
        onChange(lastChar);
      }
    }

    return (
      <input
        ref={ref}
        className={`${css.input}`}
        onChange={handleChange}
        type="text"
        pattern="[0-9]"
        placeholder="•"
        value={value}
        onClick={onClick}
        required
        disabled={disabled}
      />
    );
  }
);

export default NumberInput;
