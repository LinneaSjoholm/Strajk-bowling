import { BookingRequest } from "../../frontend/interfaces/bookingTypes";

const validateBooking = (data: BookingRequest): string | null => {
    const { when, lanes, people, shoes } = data;

    if(!when || lanes === undefined || people === undefined) {
        return 'Please fill out all fields correctly';
    };

    if(people > 4 * lanes) {
        return 'Each lane can have a maximum of 4 people';
    };

    if(shoes.length !== people) {
        return `Please enter ${people} shoe sizes`;
    }

    return null;
};

export default validateBooking;