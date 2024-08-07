import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import "@testing-library/jest-dom";
import { expect, test, describe } from "@jest/globals";
import userEvent from "@testing-library/user-event";

describe("Home Page", () => {
  test("should have welcome text", () => {
    const { container } = render(<Home />);
    const myElement = screen.getByText(
      "Plan your next trip using our state of the art AI travel advisor"
    );
    expect(container).toMatchSnapshot();
    expect(myElement).toBeInTheDocument();
  });

  test("should have button to take to activity explorer page", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const myButtonElement = screen.getByText("Discover your next adventure");
    expect(myButtonElement).toBeInTheDocument();
    expect(myButtonElement).toHaveAttribute("href", "/explorer?type=activity");
  });
});
