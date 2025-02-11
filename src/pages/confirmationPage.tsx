import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confirmation from "../components/confirmation";
import { BookingResponse } from "../interfaces/bookingTypes";
import "../styles/confirmationPage.css";
import Menu from "../components/menu";

interface LocationState {
    bookingData: BookingResponse;
}

const ConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = (location.state as LocationState)?.bookingData || null;

    const handleGoBack = () => {
        navigate('/booking');
    };

    if (!booking) {
        return (
            <div className="confirmation__page">
                <Menu />
                <div className="confirmation__container-error">
                    <p>We couldn’t find your booking right now :(<br /> 
                    Please check if the booking was completed or <br />
                    try again later.</p>
                    <button onClick={handleGoBack}>Go back to booking</button>
                </div>
            </div>
        );
    }

    return (
        <div className="confirmation__page">
            <Menu />
            <div className="confirmation__container">
                <img className="booking__page--image" src="Strajk-logo.png" alt="Strajk logo" />
                <h1 className="confirmation__title">See you soon!</h1>
                <Confirmation booking={booking} />
                <button onClick={handleGoBack} className="confirmation__button">Sweet, let's go!</button>
            </div>
        </div>
    );
};

export default ConfirmationPage;
