import axios from 'axios';
import { BookingRequest, BookingResponse } from '../interfaces/bookingTypes';

const apiKey = '738c6b9d-24cf-47c3-b688-f4f4c5747662';
const apiUrl = 'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com';

const createBooking = async(bookingData: BookingRequest): Promise<BookingResponse> => {
    try {
        const response = await axios.post<BookingResponse>(`${apiUrl}/booking`, bookingData, {
            headers: {
                'x-api-key': apiKey
            },
        });

        if(!response.data || !response.data.id) {
            throw new Error('Invalid response from server');
        };

        return response.data as BookingResponse;

    } catch (error: any) {

        if(error.response) {
            console.error(`API error: ${error.response.status} - ${error.response.data}`);
        } else {
            console.error('Error creating booking', error.message || error);
        }

        throw error;
    }
};


export { createBooking };