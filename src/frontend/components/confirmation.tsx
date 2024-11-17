import React from 'react';
import { BookingResponse } from '../interfaces/bookingTypes';
import { formatDateTime } from "../../backend/services/dateTimeValidation"

interface ConfirmationProps {
    booking: BookingResponse;
}

const Confirmation = ({ booking }: ConfirmationProps) => {
    const formattedDateTime = formatDateTime(booking.when);

     return (
        <div className="confirmation__page">
            <div className="booking__page--subtitle-container">
                <hr className="booking__page--divider" />
                <p className="booking__page--subtitle">Booking details</p>
                <hr className="booking__page--divider" />
            </div>

            <fieldset className="fieldset__confirmation">
                <legend>When</legend>
                <p className="confirmation__context">{formattedDateTime}</p>
            </fieldset>

            <fieldset className="fieldset__confirmation">
                <legend>Who</legend>
                <p className="confirmation__context">{booking.people} pers</p>
            </fieldset>

            <fieldset className="fieldset__confirmation">
                <legend>Lanes</legend>
                <p className="confirmation__context">{booking.lanes}</p>
            </fieldset>

            <fieldset className="fieldset__confirmation">
                <legend>Booking number</legend>
                <p className="confirmation__context">{booking.id}</p>
            </fieldset>

            <div className="total__container">
                <p className="total"><strong>total</strong></p>
                <p className="price">{booking.price}sek</p>
            </div>

        </div>

    );
}

export default Confirmation;