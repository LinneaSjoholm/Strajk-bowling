import React from 'react';
import { BookingResponse } from '../interfaces/bookingTypes';

interface ConfirmationProps {
    booking: BookingResponse;
}

const Confirmation = ({ booking }: ConfirmationProps) => {
    return (
        <div className="booking__confirmation">
            <h1>See you soon!</h1>
            <h3>Booking Details</h3>
            <p>When {booking.when}</p>
            <p>Who {booking.people}</p>
            <p>Lanes {booking.lanes}</p>
            <p>Booking number {booking.id}</p>
            <p>Price: {booking.price}</p>
        </div>
    );
}

export default Confirmation;