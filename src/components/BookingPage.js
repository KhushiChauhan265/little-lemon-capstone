import BookingForm from "./BookingForm";

function BookingPage({
  availableTimes,
  dispatch,
  submitForm,
}) {
  return (
    <>
      <h1>Reserve a Table</h1>

      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
      />
    </>
  );
}

export default BookingPage;