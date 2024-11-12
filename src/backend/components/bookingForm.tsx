import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingResponse, BookingRequest } from "../interfaces/bookingTypes";
import calculatePrice from "../components/calculatePrice"
import generateBookingId from "./bookingId";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import validateBooking from "../services/validation";

const BookingForm = ({ onSubmit }: { onSubmit: (bookingData: BookingResponse) => void }) => {
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [lanes, setLanes] = useState<number | undefined>(undefined);
    const [people, setPeople] = useState<number | undefined>(undefined);
    const [shoes, setShoes] = useState<number[]>([]);

    const navigate = useNavigate();

    const handleSubmit = () => {
        const bookingData: BookingRequest = {
            when: `${date}T${time}`,
            lanes: lanes!,
            people: people!,
            shoes,
        };

        const validationError = validateBooking(bookingData);
        if (validationError) {
            alert(validationError);
            return;
        }

        const finalBookingData: BookingResponse = {
            ...bookingData,
            id: generateBookingId(),
            price: calculatePrice(lanes!, people!, shoes),
            active: true
        };

        onSubmit(finalBookingData);
        navigate('/confirmation', { state: { bookingData: finalBookingData } });
    };

    return (
        <div className="booking-form">
            <label htmlFor="date">Date</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <label htmlFor="time">Time</label>
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />

            <label htmlFor="lanes">Lanes</label>
            <input
                type="number"
                value={lanes ?? ''}
                onChange={(e) => {
                    const laneValue = parseInt(e.target.value);
                    setLanes(laneValue > 0 ? laneValue : undefined);
                }}
            />

            <label htmlFor="people">People</label>
            <input
                type="number"
                value={people ?? ''}
                max={lanes ? lanes * 4 : 4} // Dynamisk maxgräns beroende på antal banor
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (lanes && value > lanes * 4) {
                        alert(`Max ${lanes * 4} people allowed for ${lanes} lanes.`);
                    } else {
                        setPeople(value > 0 ? value : undefined);
                    }
                }}
            />

            {Array.from({ length: people || 0 }).map((_, index) => (
                <input
                    key={index}
                    type="number"
                    placeholder={`Shoe size for person ${index + 1}`}
                    onChange={(e) => {
                        const updatedShoes = [...shoes];
                        updatedShoes[index] = Number(e.target.value);
                        setShoes(updatedShoes);
                    }}
                />
            ))}

            <button onClick={handleSubmit}>STRIIIIIIKE!</button>
        </div>
    );
};

export default BookingForm;