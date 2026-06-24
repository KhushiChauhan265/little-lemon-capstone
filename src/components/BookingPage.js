import BookingForm from "./BookingForm";

function BookingPage({ availableTimes, dispatch }) {
  return (
    <>
      <h1>Reserve a Table</h1>

      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
      />
    </>
  );
}

export default BookingPage;