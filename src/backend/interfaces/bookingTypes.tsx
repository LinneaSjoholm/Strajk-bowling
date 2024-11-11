interface BookingRequest {
    when: string;
    lanes: number;
    people: number;
    shoes: number[];
}

interface BookingResponse {
    id: string;
    when: string;
    lanes: number;
    people: number;
    shoes: number[];
    price: number;
}

export { BookingRequest, BookingResponse };