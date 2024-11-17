import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingResponse, BookingRequest } from "../interfaces/bookingTypes";
import calculatePrice from "../../backend/services/calculatePrice";
import generateBookingId from "../../backend/services/bookingId";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import validateBooking from "../../backend/services/validation";
import { isFutureDateTime, getMinDate, getMinTime } from "../../backend/services/dateTimeValidation";

const BookingForm = ({ onSubmit }: { onSubmit: (bookingData: BookingResponse) => void }) => {
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [lanes, setLanes] = useState<number | undefined>(undefined);
    const [people, setPeople] = useState<number | undefined>(undefined);
    const [shoes, setShoes] = useState<number[]>([]);
    const [errors, setErrors] = useState({
        date: '',
        time: '',
        lanes: '',
        people: '',
        shoes: '',
        dateTime: ''
    });

    const navigate = useNavigate();

    const handleSubmit = () => {
        let validationErrors = {
            date: '',
            time: '',
            lanes: '',
            people: '',
            shoes: '',
            dateTime: ''
        };

        if (!date || !time) {
            if (!date && !time) {
                validationErrors.dateTime = "Please fill in both the date and the time.";
            }
            if (!date) {
                validationErrors.date = "Please fill in the date.";
            }
            if (!time) {
                validationErrors.time = "Please fill in the time.";
            }
        }

        if (lanes === undefined) {
            validationErrors.lanes = "Please fill in the number of lanes.";
        }

        if (people === undefined) {
            validationErrors.people = "Please fill in the number of people.";
        }

        if (people !== undefined && shoes.length !== people) {
            validationErrors.shoes = "Please fill in the shoe sizes for all people.";
        }

        setErrors(validationErrors);

        if (Object.values(validationErrors).some((error) => error !== '')) {
            return;
        }

        const combinedDateTime = `${date}T${time}`;

        if (isNaN(new Date(combinedDateTime).getTime())) {
        alert("Invalid date or time format");
        return;
        }

        const bookingData: BookingRequest = {
            when: combinedDateTime,
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
        <div className="booking__form">
            <div className="booking-form">
                <div className="date-time-container">
                    <fieldset className="input-container--date-time">
                        <legend>Date</legend>
                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                                if (e.target.value) {
                                    setErrors((prevErrors) => ({ ...prevErrors, date: '' }));
                                }
                            }}
                            min={getMinDate()}
                            required
                        />
                    </fieldset>

                    <fieldset className="input-container--date-time">
                        <legend>Time</legend>
                        <input
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => {
                                setTime(e.target.value);
                                if (e.target.value) {
                                    setErrors((prevErrors) => ({ ...prevErrors, time: '' }));
                                }
                            }}
                            min={getMinTime()}
                            required
                        />
                    </fieldset>
                    
                    {(errors.date || errors.time) && (
                        <div className="error__container__below">
                            <p className="error__message">
                                {errors.date && errors.time ? "Please fill in both date and time." :
                                 errors.date || errors.time}
                            </p>
                        </div>
                    )}
                </div>

                <fieldset className="input-container">
                    <legend>Number of lanes</legend>
                    <input
                        id="lanes"
                        type="number"
                        value={lanes ?? ''}
                        onChange={(e) => {
                            const laneValue = parseInt(e.target.value);
                            setLanes(laneValue > 0 ? laneValue : undefined);
                        }}
                        required
                    />
                </fieldset>
                {errors.lanes && (
                    <div className="error__container">
                        <p className="error__message">{errors.lanes}</p>
                    </div>
                )}

                <fieldset className="input-container">
                    <legend>Number of awesome bowlers</legend>
                    <input
                        id="people"
                        type="number"
                        value={people ?? ''}
                        max={lanes ? lanes * 4 : 4}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (isNaN(value)) {
                                setErrors((prevErrors) => ({ ...prevErrors, people: '' }));
                                setPeople(undefined);
                            } else if (lanes && value > lanes * 4) {
                                setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    people: `Max ${lanes * 4} people allowed for ${lanes} lanes.`,
                                }));
                            } else {
                                setPeople(value > 0 ? value : undefined);
                                setErrors((prevErrors) => ({ ...prevErrors, people: '' }));
                            }
                        }}
                        required
                    />
                </fieldset>
                {errors.people && (
                    <div className="error__container">
                        <p className="error__message">{errors.people}</p>
                    </div>
                )}

            </div>

            <div className="booking__page--subtitle-container">
                <hr className="booking__page--divider" />
                <p className="booking__page--subtitle">Shoes</p>
                <hr className="booking__page--divider" />
            </div>

            <div className="shoe-sizes-container">
                {Array.from({ length: people || 0 }).map((_, index) => (
                    <fieldset key={index} className="shoe-size-wrapper">
                        <legend>Shoe size for Person {index + 1}</legend>
                        <input
                            type="number"
                            className="shoe-size-input"
                            onChange={(e) => {
                                const updatedShoes = [...shoes];
                                updatedShoes[index] = Number(e.target.value);
                                setShoes(updatedShoes);

                                setErrors((prevErrors) => ({ ...prevErrors, shoes: '' }));
                            }}
                        />
                    </fieldset>
                ))}
            </div>

            {people !== undefined && errors.shoes && (
                <div className="error__container">
                    <p className="error__message">{errors.shoes}</p>
                </div>
            )}

            <button onClick={handleSubmit}>STRIIIIIIKE!</button>
        </div>
    );
};

export default BookingForm;
