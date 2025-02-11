const calculatePrice = (lanes: number, people: number, shoes: number[]): number => {
    const pricePerLane = 100;
    const pricePerPerson = 120;

    const totalLanePrice = lanes * pricePerLane;
    const totalPeoplePrice = people * pricePerPerson;

    return totalLanePrice + totalPeoplePrice;
};

export default calculatePrice;