import React from "react";
import {
  render,
  screen,
  cleanup,
  getByRole,
  waitFor,
} from "@testing-library/react";
import CollegeSaving from "../pages/Calculator/Calculator";
import UserEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

test("title", () => {
  render(<CollegeSaving />);
  const titleElement = screen.getByText(/College Savings Calculator/i);
  expect(titleElement).toBeInTheDocument();
});
test("label", () => {
  render(<CollegeSaving />);
  const titleElement = screen.getByText(/Age of child/i);
  expect(titleElement).toBeInTheDocument();
});
test("select", async () => {
  render(<CollegeSaving />);
  UserEvent.click(getByRole(screen.getByTestId("child"), "button"));
  await waitFor(() => UserEvent.click(screen.getByText(/1/i)));
  expect(screen.getByRole("heading")).toHaveTextContent(/child1/i);
});
