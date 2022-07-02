import App from "./App";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe.concurrent("konnect email validator", () => {
  it("load the app", () => {
    render(<App />);
    expect(screen.getByText(/konect/i)).toBeDefined();
  });
});
