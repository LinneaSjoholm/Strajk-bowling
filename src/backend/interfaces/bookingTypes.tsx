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
    active: true;
}

export { BookingRequest, BookingResponse };