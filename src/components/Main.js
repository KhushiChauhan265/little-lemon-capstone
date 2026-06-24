import { Routes, Route, useNavigate } from "react-router-dom";

import Homepage from "./Homepage";
import BookingPage from "./BookingPage";
import ConfirmedBooking from "./ConfirmedBooking";

function Main({ availableTimes, dispatch }) {
  const navigate = useNavigate();

  const submitForm = (formData) => {
    const success = window.submitAPI
      ? window.submitAPI(formData)
      : true;

    if (success) {
      navigate("/confirmed");
    }

    return success;
  };

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
              submitForm={submitForm}
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