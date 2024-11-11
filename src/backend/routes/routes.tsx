import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingForm from "../components/bookingForm";
import ConfirmationPage from "../pages/confirmationPage";
import LoadingScreenPage from "../pages/loadingScreenPage"

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoadingScreenPage />} />
                <Route path="/booking" element={<BookingForm onSubmit={(bookingData) => console.log(bookingData)} />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
