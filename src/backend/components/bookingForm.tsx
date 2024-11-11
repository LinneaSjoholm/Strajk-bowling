import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingResponse } from "../interfaces/bookingTypes";
import calculatePrice from "../components/calculatePrice"
import generateBookingId from "./bookingId";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ onSubmit }: { onSubmit: (bookingData: BookingResponse) => void }) => {
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [lanes, setLanes] = useState(0);
    const [people, setPeople] = useState(0);
    const [shoes, setShoes] = useState<number[]>([]);

    const navigate = useNavigate();

    const handleSubmit = () => {
        if(!date || !time || lanes <= 0 || people <= 0 || shoes.length !== people) {
            alert('Please fill out all fields correctly');
            return;
        }

        const when = new Date(`${date} ${time}`);

        const bookingData: BookingResponse = {
            when: when.toISOString(),
            lanes,
            people,
            shoes,
            id: generateBookingId(),
            price: calculatePrice(lanes, people, shoes)
        };

        onSubmit(bookingData);
        navigate('/confirmation', { state: { bookingData } });
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
            value={lanes}
            onChange={(e) => setLanes(parseInt(e.target.value))}
        />

        <label htmlFor="people">People</label>
        <input
            type="number"
            value={people}
            onChange={(e) => setPeople(parseInt(e.target.value))}
        />

        {Array.from({ length: people }).map((_, index) => (
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
    )
};

export default BookingForm;