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

  const [isDateTouched, setIsDateTouched] = useState(false);
  const [isGuestsTouched, setIsGuestsTouched] = useState(false);

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
      noValidate
      aria-label="Table Booking Form"
    >
      <div className="form-field">
        <label htmlFor="res-date">
          Choose date
        </label>
        <input
          type="date"
          id="res-date"
          required
          value={date}
          aria-label="Choose date"
          aria-invalid={!isDateValid && isDateTouched}
          aria-describedby={!isDateValid && isDateTouched ? "date-error" : undefined}
          onChange={(e) => {
            setDate(e.target.value);
            if (dispatch) {
              dispatch(e.target.value);
            }
          }}
          onBlur={() => setIsDateTouched(true)}
          style={{ borderColor: !isDateValid && isDateTouched ? "#e74c3c" : "" }}
        />
        {!isDateValid && isDateTouched && (
          <span id="date-error" className="error-message" role="alert">
            Please select a valid date.
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="res-time">
          Choose time
        </label>
        <select
          id="res-time"
          required
          value={time}
          aria-label="Choose time"
          aria-invalid={!isTimeValid}
          aria-describedby={!isTimeValid ? "time-error" : undefined}
          onChange={(e) => setTime(e.target.value)}
        >
          {availableTimes &&
            availableTimes.map((availableTime) => (
              <option key={availableTime} value={availableTime}>
                {availableTime}
              </option>
            ))}
        </select>
        {!isTimeValid && (
          <span id="time-error" className="error-message" role="alert">
            Please select a valid time.
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="res-guests">
          Number of guests
        </label>
        <input
          type="number"
          id="res-guests"
          min="1"
          max="10"
          required
          aria-label="Number of guests"
          aria-invalid={!isGuestsValid && isGuestsTouched}
          aria-describedby={!isGuestsValid && isGuestsTouched ? "guests-error" : undefined}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          onBlur={() => setIsGuestsTouched(true)}
          style={{ borderColor: !isGuestsValid && isGuestsTouched ? "#e74c3c" : "" }}
        />
        {!isGuestsValid && isGuestsTouched && (
          <span id="guests-error" className="error-message" role="alert">
            Please enter a number between 1 and 10.
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="res-occasion">
          Occasion
        </label>
        <select
          id="res-occasion"
          required
          aria-label="Occasion"
          aria-invalid={!isOccasionValid}
          aria-describedby={!isOccasionValid ? "occasion-error" : undefined}
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
        {!isOccasionValid && (
          <span id="occasion-error" className="error-message" role="alert">
            Please select a valid occasion.
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        aria-label="Make Your Reservation"
      >
        Make Your Reservation
      </button>
    </form>
  );
}

export default BookingForm;