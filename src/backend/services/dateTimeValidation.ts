export const isFutureDateTime = (date: string, time: string): boolean => {
    const selectedDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    return selectedDateTime >= currentDateTime;
};

export const getMinDate = (): string => {
    return new Date().toISOString().split('T')[0];
};

export const getMinTime = (): string => {
    return new Date().toTimeString().slice(0, 5);
};