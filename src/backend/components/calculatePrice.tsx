import React, { useState } from "react";

const calculatePrice = (lanes: number, people: number, shoes: number[]): number => {
    const pricePerLane = 200;
    const pricePerPerson = 20;
    const pricePerShoe = 10;

    const totalLanePrice = lanes * pricePerLane;
    const totalPeoplePrice = people * pricePerPerson;
    const totalShoePrice = shoes.length * pricePerShoe;

    return totalLanePrice + totalPeoplePrice + totalShoePrice;
};

export default calculatePrice;