export const isFutureDateTime = (date: string, time: string): boolean => {
    const selectedDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    return selectedDateTime >= currentDateTime;
};

export const getMinDate = (): string => {
    return new Date().toISOString().split('T')[0];
};

export const getMinTime = (selectedDate?: string): string => {
    const today = new Date().toISOString().split('T')[0];

    if (selectedDate === today) {
        return new Date().toTimeString().slice(0, 5);
    }
    return "00:00"; 
};

export const formatDateTime = (dateTime: string): string => {
    const dateObj = new Date(dateTime);

    if (isNaN(dateObj.getTime())) {
        return 'Invalid date';
    }

    const options: Intl.DateTimeFormatOptions = { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    };

    const formattedDate = dateObj.toLocaleDateString('sv-SE', options);
    return formattedDate.replace('nov.', 'nov,');
};
