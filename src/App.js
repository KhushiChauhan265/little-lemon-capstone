import "./App.css";
import { useReducer } from "react";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";

export function initializeTimes() {
  return window.fetchAPI
    ? window.fetchAPI(new Date())
    : ["17:00", "18:00", "19:00", "20:00", "21:00"];
}

export function updateTimes(state, date) {
  return window.fetchAPI
    ? window.fetchAPI(new Date(date))
    : state;
}

function App() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  return (
    <div className="container">
      <Header />
      <Nav />
      <Main
        availableTimes={availableTimes}
        dispatch={dispatch}
      />
      <Footer />
    </div>
  );
}

export default App;