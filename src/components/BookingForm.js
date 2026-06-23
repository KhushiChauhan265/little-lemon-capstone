import { useState } from "react";

function BookingForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("17:00");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");

  const [availableTimes] = useState([
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00"
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      date,
      time,
      guests,
      occasion,
    });
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
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      >
        {availableTimes.map((availableTime) => (
          <option key={availableTime}>
            {availableTime}
          </option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min="1"
        max="10"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option>Birthday</option>
        <option>Anniversary</option>
      </select>

      <input
        type="submit"
        value="Make Your Reservation"
      />
    </form>
  );
}

export default BookingForm;