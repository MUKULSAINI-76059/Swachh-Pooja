import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import Login from "@/pages/Login";
import { getApiErrorMessage } from "@/lib/api";

describe("Auth and API flow", () => {
  it("login page back link should route to home", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const backLink = screen.getByRole("link", { name: /back to home/i });
    expect(backLink).toHaveAttribute("href", "/");
  });

  it("maps duplicate email error to user-friendly message", () => {
    const message = getApiErrorMessage("E11000 duplicate key", "fallback");
    expect(message).toBe("This email is already registered. Please login instead.");
  });
});
