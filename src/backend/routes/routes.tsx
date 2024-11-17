import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingPage from "../../frontend/pages/bookingPage";
import ConfirmationPage from "../../frontend/pages/confirmationPage";
import LoadingScreenPage from "../../frontend/pages/loadingScreenPage"

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoadingScreenPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
