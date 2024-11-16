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
                <p>{formattedDateTime}</p>
            </fieldset>

            <fieldset className="fieldset__confirmation">
                <legend>Who</legend>
                <p>{booking.people}</p>
            </fieldset>

            <fieldset className="fieldset__confirmation">
                <legend>Lanes</legend>
                <p>{booking.lanes}</p>
            </fieldset>

            <fieldset className="fieldset__confirmation">
                <legend>Booking number</legend>
                <p>{booking.id}</p>
            </fieldset>

            <fieldset className="fieldset__total">
                <legend>Total</legend>
                <p>{booking.price}</p>
            </fieldset>
        </div>
    );
}

export default Confirmation;