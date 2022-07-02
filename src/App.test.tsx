import App from "./App";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe.concurrent("konnect email validator", () => {
  it("load the app", () => {
    render(<App />);
    expect(screen.getByText(/konect/i)).toBeDefined();
  });

  it("should have 6 different input for numbers", () => {
    render(<App />);
    expect(screen.getAllByPlaceholderText("•")).toHaveLength(6);
  });

  it("only accept single digit in a input", () => {
    render(<App />);
    const numbersInput: HTMLInputElement[] =
      screen.getAllByPlaceholderText("•");
    fireEvent.change(numbersInput[0], { target: { value: "azerty" } });
    expect(numbersInput[0].value).toBe("");
    fireEvent.change(numbersInput[0], { target: { value: "23" } });
    expect(numbersInput[0].value).toBe("3");
  });

  it("should focus the next input when we enter a digit", () => {
    render(<App />);
    const numbersInput: HTMLInputElement[] =
      screen.getAllByPlaceholderText("•");
    fireEvent.change(numbersInput[0], { target: { value: "1" } });
    expect(numbersInput[1]).toHaveFocus();
  });
});
