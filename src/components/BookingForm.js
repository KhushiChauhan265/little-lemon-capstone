import { useState } from "react";

function BookingForm({
  availableTimes,
  dispatch,
  submitForm,
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("17:00");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");

  // Touched states for validation feedback
  const [isDateTouched, setIsDateTouched] = useState(false);
  const [isGuestsTouched, setIsGuestsTouched] = useState(false);

  // Validation logic
  const isDateValid = date !== "";
  const isGuestsValid = guests >= 1 && guests <= 10;
  const isTimeValid = time !== "";
  const isOccasionValid = occasion !== "";

  const isFormValid =
    isDateValid &&
    isTimeValid &&
    isGuestsValid &&
    isOccasionValid;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    const formData = {
      date,
      time,
      guests,
      occasion,
    };

    if (submitForm) {
      submitForm(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        maxWidth: "300px",
        gap: "20px",
      }}
      noValidate
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="res-date">
          Choose date
        </label>
        <input
          type="date"
          id="res-date"
          required
          value={date}
          aria-label="Choose date"
          onChange={(e) => {
            setDate(e.target.value);
            if (dispatch) {
              dispatch(e.target.value);
            }
          }}
          onBlur={() => setIsDateTouched(true)}
          style={{ borderColor: !isDateValid && isDateTouched ? "red" : "initial" }}
        />
        {!isDateValid && isDateTouched && (
          <span style={{ color: "red", fontSize: "12px" }}>
            Please select a valid date.
          </span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="res-time">
          Choose time
        </label>
        <select
          id="res-time"
          required
          value={time}
          aria-label="Choose time"
          onChange={(e) =>
            setTime(e.target.value)
          }
        >
          {availableTimes &&
            availableTimes.map((availableTime) => (
              <option
                key={availableTime}
                value={availableTime}
              >
                {availableTime}
              </option>
            ))}
        </select>
        {!isTimeValid && (
          <span style={{ color: "red", fontSize: "12px" }}>
            Please select a valid time.
          </span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="guests">
          Number of guests
        </label>
        <input
          type="number"
          id="guests"
          min="1"
          max="10"
          required
          aria-label="Number of guests"
          value={guests}
          onChange={(e) =>
            setGuests(Number(e.target.value))
          }
          onBlur={() => setIsGuestsTouched(true)}
          style={{ borderColor: !isGuestsValid && isGuestsTouched ? "red" : "initial" }}
        />
        {!isGuestsValid && isGuestsTouched && (
          <span style={{ color: "red", fontSize: "12px" }}>
            Please enter a number between 1 and 10.
          </span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="occasion">
          Occasion
        </label>
        <select
          id="occasion"
          required
          aria-label="Occasion"
          value={occasion}
          onChange={(e) =>
            setOccasion(e.target.value)
          }
        >
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
        {!isOccasionValid && (
          <span style={{ color: "red", fontSize: "12px" }}>
            Please select a valid occasion.
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        aria-label="On Click"
      >
        Make Your Reservation
      </button>
    </form>
  );
}

export default BookingForm;