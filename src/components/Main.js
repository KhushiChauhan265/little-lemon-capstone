import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import BookingPage from "./BookingPage";
import Special from "./Special";
function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </main>
  );
}

export default Main;