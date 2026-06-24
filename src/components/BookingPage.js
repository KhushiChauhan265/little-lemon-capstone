import BookingForm from "./BookingForm";

function BookingPage({
  availableTimes,
  dispatch,
  submitForm,
}) {
  return (
    <section aria-labelledby="booking-heading">
      <h1 id="booking-heading">Reserve a Table</h1>

      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
      />
    </section>
  );
}

export default BookingPage;