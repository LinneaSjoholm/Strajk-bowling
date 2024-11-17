import { BookingRequest, BookingResponse } from "../../frontend/interfaces/bookingTypes";
import validateBooking from "./validation";

const URL = "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com";
const API_KEY = "738c6b9d-24cf-47c3-b688-f4f4c5747662";

export async function postBooking(requestData: BookingRequest): Promise<BookingResponse | null> {
  
  console.log("Received booking request:", requestData);
  const validationError = validateBooking(requestData);

  if (validationError) {
    
    console.error("Validation failed:", validationError);
    return null;
  }

  try {
    const response = await fetch(`${URL}/booking`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      console.error("Server error:", response.status, await response.text());
      return null;
    }

    const data: BookingResponse = await response.json();
    return data;

  } catch (error) {

    console.error("Network or parsing error:", error);
    return null;
  }
}
