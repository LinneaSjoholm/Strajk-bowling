// bookingService.js
import axios from 'axios';
import { BookingRequest, BookingResponse } from '../../frontend/interfaces/bookingTypes';

const URL = "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com";
const API_KEY = "738c6b9d-24cf-47c3-b688-f4f4c5747662";

const createBooking = async (bookingData: BookingRequest): Promise<BookingResponse> => {
  try {
    const response = await axios.post<BookingResponse>(`${URL}`, bookingData, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (!response.data || !response.data.id) {
      throw new Error('Invalid response from server');
    }

    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export { createBooking };
