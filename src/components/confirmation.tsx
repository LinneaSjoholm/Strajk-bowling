import React from "react";
import { BookingResponse } from "../interfaces/bookingTypes";
import { formatDateTime } from "../services/dateTimeValidation";

interface ConfirmationProps {
    booking: BookingResponse;
}

const Confirmation = ({ booking }: ConfirmationProps) => {
    // Hantera fall där "when" saknas eller är ogiltigt
    const formattedDateTime = booking.when ? formatDateTime(booking.when) : "Unknown date";

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
                <p className="confirmation__context">{booking.people ?? "Unknown"} pers</p>
            </fieldset>

            <fieldset className="fieldset__confirmation">
                <legend>Lanes</legend>
                <p className="confirmation__context">{booking.lanes ?? "Unknown"}</p>
            </fieldset>

            {booking.id && (
                <fieldset className="fieldset__confirmation">
                    <legend>Booking number</legend>
                    <p className="confirmation__context">{booking.id}</p>
                </fieldset>
            )}

            <div className="total__container">
                <p className="total"><strong>total</strong></p>
                <p className="price">{booking.price ? `${booking.price} sek` : "Price unavailable"}</p>
            </div>
        </div>
    );
}

export default Confirmation;
