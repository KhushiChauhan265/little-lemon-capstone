import { render, screen } from "@testing-library/react";
import BookingForm from "./components/BookingForm";

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

  const labelElement =
    screen.getByText("Choose date");

  expect(labelElement).toBeInTheDocument();
});