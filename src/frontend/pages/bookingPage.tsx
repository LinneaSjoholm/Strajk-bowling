import React, { useState } from "react";
import BookingForm from "../components/bookingForm";
import { BookingResponse } from "../interfaces/bookingTypes";
import { useNavigate } from "react-router-dom";
import "../styles/bookingPage.css";

const BookingPage = () => {
    const navigate = useNavigate();

    const handleBookingSubmit = (bookingData: BookingResponse) => {
        console.log("Booking submitted: ", bookingData);

        navigate('/confirmation', { state: { bookingData } });
    };

    return (
        <div className="booking__page">
            <div className="booking__page--container">
            <img className="booking__page--image" src="Strajk-logo.png" alt="Strajk logo" />
            <h1 className="booking__page--title">Booking</h1>
            
            <div className="booking__page--subtitle-container">
                <hr className="booking__page--divider" />
                <p className="booking__page--subtitle">When, what & who</p>
                <hr className="booking__page--divider" />
            </div>

            <BookingForm onSubmit={handleBookingSubmit} />
            </div>
        </div>
    );
};

export default BookingPage;
