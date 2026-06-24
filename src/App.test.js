import { render, screen } from "@testing-library/react";
import BookingForm from "./components/BookingForm";
import {
  initializeTimes,
  updateTimes,
} from "./App";

test("Renders the BookingForm label", () => {
  render(
    <BookingForm
      availableTimes={[
        "17:00",
        "18:00",
        "19:00",
      ]}
      dispatch={() => {}}
    />
  );

  expect(
    screen.getByText("Choose date")
  ).toBeInTheDocument();
});

test("initializeTimes returns data", () => {
  const result = initializeTimes();

  expect(result.length).toBeGreaterThan(0);
});

test("updateTimes returns available times", () => {
  const result = updateTimes(
    ["17:00"],
    "2026-06-22"
  );

  expect(result.length).toBeGreaterThan(0);
});