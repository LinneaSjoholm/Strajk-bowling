import { v4 as uuidv4 } from 'uuid';

const generateBookingId = () => {
    return uuidv4();
}

export default generateBookingId;