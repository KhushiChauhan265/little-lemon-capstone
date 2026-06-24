import { render, screen } from "@testing-library/react";
import BookingForm from "./components/BookingForm";
import {
  initializeTimes,
  updateTimes,
} from "./App";

describe("Booking Form and API Functions", () => {
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

  test("initializeTimes returns the correct expected data", () => {
    // Mock the global fetchAPI
    const mockFetchAPI = jest.fn(() => ["17:00", "18:00", "19:00"]);
    window.fetchAPI = mockFetchAPI;

    const result = initializeTimes();

    expect(mockFetchAPI).toHaveBeenCalledTimes(1);
    expect(result).toEqual(["17:00", "18:00", "19:00"]);
    expect(result.length).toBeGreaterThan(0);
  });

  test("updateTimes returns the same state or fetched times depending on action", () => {
    const mockFetchAPI = jest.fn(() => ["17:00", "17:30"]);
    window.fetchAPI = mockFetchAPI;

    const initialState = ["17:00", "18:00"];
    const actionDate = "2026-06-25";

    const result = updateTimes(initialState, actionDate);

    expect(mockFetchAPI).toHaveBeenCalledTimes(1);
    expect(result).toEqual(["17:00", "17:30"]);
    expect(result.length).toBeGreaterThan(0);
  });
});