import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/bookingPage.css";
import Menu from "../components/menu";
import { getMinDate, getMinTime } from "../services/dateTimeValidation";
import validateBooking from "../services/validateBooking";

const BookingPage = () => {
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [lanes, setLanes] = useState<number | undefined>(undefined);
    const [people, setPeople] = useState<number | undefined>(undefined);
    const [shoes, setShoes] = useState<number[]>([]);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        // Samla ihop bokningsdata
        const bookingData = {
            lanes: lanes!,
            people: people!,
            shoes: shoes.filter(size => size !== null) as number[],
            when: `${date}T${time}`,
        };

        // Validera bokningsdata
        const validationError = validateBooking(bookingData);
        if (validationError) {
            setError(validationError);
            return;
        }

        // Navigera till bekräftelsesidan
        navigate('/confirmation', { state: bookingData });

        console.log('Booking data to be sent:', bookingData);

        try {
            // Skicka bokningsdata till API:t
            const response = await fetch('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '738c6b9d-24cf-47c3-b688-f4f4c5747662',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) throw new Error('Booking failed');

            const bookingResponse = await response.json();
            console.log('API Response:', bookingResponse);

            navigate('/confirmation', { state: bookingResponse });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            if (lanes && value > lanes * 4) {  
                setError("Cannot have more than 4 people per lane.");
            } else {
                setPeople(value);
                setError('');
            }
        } else {
            setPeople(undefined);
        }
    };
    
    const handleLanesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setLanes(value);
            setError('');
        } else {
            setLanes(undefined);
        }
    };
    

    return (
        <div className="booking__page">
            <Menu />
            <div className="booking__page--container">
                <img className="booking__page--image" src="Strajk-logo.png" alt="Strajk logo" />
                <h1 className="booking__page--title">Booking</h1>

                <div className="booking__page--subtitle-container">
                    <hr className="booking__page--divider" />
                    <p className="booking__page--subtitle">When, what & who</p>
                    <hr className="booking__page--divider" />
                </div>

                <form className="booking-form" onSubmit={handleSubmit}>
                    <div className="date-time-container">
                        <fieldset className="input-container--date-time">
                            <legend>Date</legend>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => {
                                    const newDate = e.target.value;
                                    setDate(newDate);
                                }}
                                min={getMinDate()}
                                required
                            />
                        </fieldset>

                        <fieldset className="input-container--date-time">
                            <legend>Time</legend>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => {
                                    const newTime = e.target.value;
                                    setTime(newTime);
                                }}
                                min={getMinTime(date)}
                                required
                            />
                        </fieldset>
                    </div>

                    <fieldset className="input-container">
                        <legend>Number of lanes</legend>
                        <input
                            type="number"
                            value={lanes ?? ''}
                            onChange={handleLanesChange}
                            required
                        />
                    </fieldset>

                    <fieldset className="input-container">
                        <legend>Number of people</legend>
                        <input
                            type="number"
                            value={people ?? ''}
                            onChange={handlePeopleChange}
                            required
                        />
                    </fieldset>

                    <div className="shoe-sizes-container">
                        {Array.from({ length: people || 0 }).map((_, index) => (
                            <fieldset key={index}>
                                <legend>Shoe size for person {index + 1}</legend>
                                <input
                                    type="number"
                                    value={shoes[index] || ''}
                                    onChange={(e) => {
                                        const updatedShoes = [...shoes];
                                        updatedShoes[index] = Number(e.target.value);
                                        setShoes(updatedShoes);
                                    }}
                                    required
                                />
                            </fieldset>
                        ))}
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button 
                    type="submit"
                    >STRIIIIIIKE!</button>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;
