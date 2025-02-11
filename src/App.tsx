import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingPage from "./pages/bookingPage";
import ConfirmationPage from "./pages/confirmationPage";
import LoadingScreenPage from "./pages/loadingScreenPage"

const App = () => {
  return (
  <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<LoadingScreenPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;