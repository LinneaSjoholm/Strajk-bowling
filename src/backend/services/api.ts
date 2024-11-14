import { BookingRequest, BookingResponse } from '../../frontend/interfaces/bookingTypes';
import validateBooking from './validation';

const URL = "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com";
const API_KEY = "738c6b9d-24cf-47c3-b688-f4f4c5747662";

export async function postBooking(requestData: BookingRequest): Promise<BookingResponse | null> {
  // Steg 1: Validera bokningsdata innan API-anrop
  console.log("Received booking request:", requestData);  // Debugging line
  const validationError = validateBooking(requestData);

  if (validationError) {
    // Om valideringen misslyckas, logga och returnera null för att indikera att bokningen inte kan göras
    console.error("Validation failed:", validationError);
    return null;
  }

  // Steg 2: Om valideringen är OK, skicka POST-begäran till API
  try {
    const response = await fetch(`${URL}/booking`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData), // Skicka bokningsdata som JSON
    });

    // Steg 3: Kontrollera om servern svarar korrekt
    if (!response.ok) {
      // Om servern svarar med en felkod, logga felet
      console.error("Server error:", response.status, await response.text());
      return null;
    }

    // Steg 4: Om allt gick bra, hämta och returnera svar från servern
    const data: BookingResponse = await response.json();
    return data;

  } catch (error) {
    // Steg 5: Hantera eventuella nätverksfel eller JSON-parsningsfel
    console.error("Network or parsing error:", error);
    return null;
  }
}
