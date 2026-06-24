import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";

describe("BookingForm Validation and Submission", () => {
  const availableTimes = ["17:00", "18:00"];
  const mockDispatch = jest.fn();
  const mockSubmitForm = jest.fn();

  beforeEach(() => {
    mockDispatch.mockClear();
    mockSubmitForm.mockClear();
  });

  test("Checks HTML5 validation attributes are applied correctly", () => {
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    const dateInput = screen.getByLabelText(/choose date/i);
    expect(dateInput).toHaveAttribute("required");
    expect(dateInput).toHaveAttribute("type", "date");

    const timeSelect = screen.getByLabelText(/choose time/i);
    expect(timeSelect).toHaveAttribute("required");

    const guestsInput = screen.getByLabelText(/number of guests/i);
    expect(guestsInput).toHaveAttribute("required");
    expect(guestsInput).toHaveAttribute("min", "1");
    expect(guestsInput).toHaveAttribute("max", "10");
    expect(guestsInput).toHaveAttribute("type", "number");

    const occasionSelect = screen.getByLabelText(/occasion/i);
    expect(occasionSelect).toHaveAttribute("required");
  });

  test("Validates successful form submission", () => {
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, { target: { value: "2026-10-10" } });

    const guestsInput = screen.getByLabelText(/number of guests/i);
    fireEvent.change(guestsInput, { target: { value: "5" } });

    const submitButton = screen.getByRole("button", { name: /make your reservation/i });
    
    // The button should be enabled since we have filled the required valid fields
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(mockSubmitForm).toHaveBeenCalledTimes(1);
    expect(mockSubmitForm).toHaveBeenCalledWith({
      date: "2026-10-10",
      time: "17:00",
      guests: 5,
      occasion: "Birthday",
    });
  });

  test("Submit button is disabled when form is invalid (e.g. empty date)", () => {
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    const submitButton = screen.getByRole("button", { name: /make your reservation/i });
    
    // Initially the date is empty, so form is invalid
    expect(submitButton).toBeDisabled();
  });

  test("Submit button is disabled and error shown for invalid guests count", () => {
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    // Set a valid date first
    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, { target: { value: "2026-10-10" } });

    // Set invalid guests (less than 1)
    const guestsInput = screen.getByLabelText(/number of guests/i);
    fireEvent.change(guestsInput, { target: { value: "0" } });
    fireEvent.blur(guestsInput); // Trigger touch state

    const submitButton = screen.getByRole("button", { name: /make your reservation/i });
    expect(submitButton).toBeDisabled();

    // Check for validation error message
    const errorMessage = screen.getByText(/please enter a number between 1 and 10/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
