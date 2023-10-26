/**
 * @jest-environment jsdom
 */
"use server";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Modal } from "../src/client-components";
import { cookies } from "next/headers";

it("modal shows the children and a close button", async () => {
  // Arrange
  // expect(cookies().has("age-cookie")).toBe(false);
  render(<Modal />);
  expect(screen.getByRole("dialog")).toHaveTextContent("Are you 18 or older?");

  // Act
  fireEvent.click(screen.getByText("Confirm"));

  // Assert
  expect(render(<Modal />)).toBeNull();
  expect(cookies().has("age-cookie")).toBe(true);
  expect(cookies().get("age-cookie")?.value).toBe("I am old enough");
});
