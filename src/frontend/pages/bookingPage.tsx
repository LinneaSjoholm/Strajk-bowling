import React, { useState } from "react";
import BookingForm from "../components/bookingForm";
import { BookingResponse } from "../interfaces/bookingTypes";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
    const navigate = useNavigate();

    const handleBookingSubmit = (bookingData: BookingResponse) => {
        console.log("Booking submitted: ", bookingData);

        navigate('/confirmation', { state: { bookingData } });
    };

    return (
        <div className="booking-page">
            <h1>Booking</h1>
            <BookingForm onSubmit={handleBookingSubmit} />
        </div>
    );
};

export default BookingPage;
