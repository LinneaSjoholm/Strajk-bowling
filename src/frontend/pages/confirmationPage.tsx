import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confirmation from "../components/confirmation";
import { BookingResponse } from "../interfaces/bookingTypes";

interface LocationState {
    bookingData: BookingResponse;
}

const ConfirmationPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const booking = (location.state as LocationState)?.bookingData;

    const handleGoBack = () => {
        navigate('/booking');
    };

    return (
        <div className="confirmation__page">
            <h1>See you soon!</h1>
            {booking ? (
                    <Confirmation booking={booking} />
            ) : (
                <p>We couldn’t find your booking right now. Please check if the booking was completed or try again later.</p>
            )}
            
            <button onClick={handleGoBack}>Sweet, let's go!</button>
        </div>
    );
};

export default ConfirmationPage;