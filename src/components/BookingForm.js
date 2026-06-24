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

  const isFormValid =
    date !== "" &&
    guests >= 1 &&
    guests <= 10;

  const handleSubmit = (e) => {
    e.preventDefault();

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
    >
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
      />

      <label htmlFor="res-time">
        Choose time
      </label>

      <select
        id="res-time"
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
      />

      <label htmlFor="occasion">
        Occasion
      </label>

      <select
        id="occasion"
        aria-label="Occasion"
        value={occasion}
        onChange={(e) =>
          setOccasion(e.target.value)
        }
      >
        <option>Birthday</option>
        <option>Anniversary</option>
      </select>

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