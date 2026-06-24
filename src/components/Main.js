import { Routes, Route } from "react-router-dom";

import Homepage from "./Homepage";
import BookingPage from "./BookingPage";
import ConfirmedBooking from "./ConfirmedBooking";

function Main({ availableTimes, dispatch }) {
  return (
    <main>
      <Routes>

        <Route
          path="/"
          element={<Homepage />}
        />

        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
            />
          }
        />

        <Route
          path="/confirmed"
          element={<ConfirmedBooking />}
        />

      </Routes>
    </main>
  );
}

export default Main;