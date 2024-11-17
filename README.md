# Strajk Bowling App

Strajk Bowling is a mobile-first web app for booking lanes and shoes at the newly opened Strajk Bowling Hall in Bromölla. This app allows users to book lanes, select shoe sizes for each player, and receive a confirmation of their booking. The app is designed to be responsive and optimized for mobile devices with a viewport of 480px x 608px.

## Technologies

- **Frontend**: React, TypeScript
- **Backend**: Integrates with Strajk Bowling backend API via RESTful requests

## Features

- **Booking Form**: Allows users to select a date, time, number of lanes, number of people, and shoe sizes.
- **Dynamic Shoe Size Form**: Once the user selects the number of people, a dynamic form appears for entering shoe sizes.
- **Price Calculation**: The app automatically calculates the total price based on 120 SEK per person and 100 SEK per lane.
- **Booking Confirmation**: After submitting the booking, a confirmation screen displays the booking details, including the total price and a unique booking ID.
- **Responsive Menu**: A mobile-friendly menu is available via a navicon button.

### API Endpoints

- **Base URL**: `https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com`
- **Authorization**: Use the `x-api-key` header with the provided API key.

  **API Key**: `738c6b9d-24cf-47c3-b688-f4f4c5747662`

### Booking Model

#### Request Format

```json
{
  "when": "2022-11-11T18:00",
  "lanes": 1,
  "people": 4,
  "shoes": [38, 39, 44, 43]
}
