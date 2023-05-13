import React from "react";
import { render, screen } from "@testing-library/react";
import { Portal } from "../Portal";

describe("Portal component", () => {
  it("Renders a new div when called", () => {
    render(<Portal>Child</Portal>);

    expect(screen.getByText("Child")).toBeInTheDocument();
    expect(screen.getByTestId("portal-test-id")).toHaveAttribute(
      "id",
      "react-portal-wrapper"
    );
  });

  it("Uses an already present wrapperId", () => {
    const wrapperId = "present-already";

    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);

    const foundId = document.getElementById(wrapperId);

    expect(foundId).toHaveAttribute("id", wrapperId);

    render(<Portal wrapperId={wrapperId}>Child Two</Portal>);

    expect(screen.getByText("Child Two")).toBeInTheDocument();

    const foundCheck = document.getElementById(wrapperId);

    expect(foundCheck).toHaveAttribute("id", wrapperId);
    expect(foundCheck).toHaveTextContent("Child Two");
  });
})
