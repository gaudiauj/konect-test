import App from "./App";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

//clipboardData is not supported on jestDom so we mock the value
window.clipboardData = {
  getData: vi.fn(() => "123"),
};

describe("konnect email validator", () => {
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

  it("should focus the next input when we enter a digit", async () => {
    render(<App />);
    const numbersInput: HTMLInputElement[] =
      screen.getAllByPlaceholderText("•");
    userEvent.type(numbersInput[0], "2");
    await waitFor(() => {
      expect(numbersInput[1]).toHaveFocus();
    });
  });

  it("should remove last digit and focus the input on hiting the backspace", async () => {
    render(<App />);
    const numbersInput: HTMLInputElement[] =
      screen.getAllByPlaceholderText("•");
    userEvent.type(numbersInput[0], "1");
    await waitFor(() => {
      expect(numbersInput[0].value).toBe("1");
    });
    userEvent.keyboard("2");
    await waitFor(() => {
      expect(numbersInput[1].value).toBe("2");
    });
    userEvent.keyboard("{backspace}");
    await waitFor(() => {
      expect(numbersInput[1].value).toBe("");
      expect(numbersInput[0].value).toBe("1");
    });
  });

  it("should be possible to paste digit", async () => {
    render(<App />);
    const numbersInput: HTMLInputElement[] =
      screen.getAllByPlaceholderText("•");
    fireEvent.paste(numbersInput[0], "123");
    await waitFor(() => {
      expect(numbersInput[0].value).toBe("1");
      expect(numbersInput[1].value).toBe("2");
      expect(numbersInput[2].value).toBe("3");
      expect(numbersInput[3]).toHaveFocus();
    });
  });

  it("should show an error if the code is wrong", async () => {
    render(<App />);
    const numbersInput: HTMLInputElement[] =
      screen.getAllByPlaceholderText("•");
    fireEvent.paste(numbersInput[0], "123");
    await waitFor(() => {
      expect(numbersInput[0].value).toBe("1");
      expect(numbersInput[1].value).toBe("2");
      expect(numbersInput[2].value).toBe("3");
    });
    userEvent.keyboard("4");
    await waitFor(() => {
      expect(numbersInput[3].value).toBe("4");
    });
    userEvent.keyboard("5");
    await waitFor(() => {
      expect(numbersInput[4].value).toBe("5");
    });
    userEvent.keyboard("5");
    await waitFor(() => {
      expect(numbersInput[5].value).toBe("5");
    });
    const errorMessage = await screen.findByText(/oups/i);
    expect(errorMessage).toBeDefined();
  });
});
