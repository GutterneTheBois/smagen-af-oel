/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Modal } from "../src/client-components";

it("modal shows the children and a close button", async () => {
	// Arrange
	console.log("Cookie: " + document.cookie);

	// expect(document.cookie).toBeNull();
	render(<Modal />);
	expect(screen.getByRole("heading")).toHaveTextContent("Bekræft alder");

	// Act
	fireEvent.click(screen.getByText("Confirm"));

	// Assert
	console.log("Cookie: " + document.cookie);
	expect(render(<Modal />)).toBeNull();
	// expect(cookies().has("age-cookie")).toBe(true);
	expect(document.cookie).toBe("age-cookie=I%20am%20old%20enough");
});
