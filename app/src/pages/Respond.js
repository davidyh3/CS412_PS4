import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import { set } from 'mongoose';
import Logout from '../components/logout.js';
import withAuth from '../components/withAuth.js';

function Respond() {

    const [ weather, setWeather ] = useState([]); 
    const [ flight, setFlight ] = useState([]);
    const [ city, setCity ] = useState("");
    const { state } = useLocation();
    const iata = state?.iata;
    const date = state?.date;
    const user = state?.user;
    const navigate = useNavigate();

    async function Weather(city) {
        try {
            const weathers = await axios.get(
                `http://api.weatherapi.com/v1/forecast.json?key=40de535bf85e4305b02183509231004&q=${city}&days=7&aqi=no&alerts=no`
                );
            setWeather(weathers.data.forecast.forecastday);
            console.log(weather);
            Flight();
        } catch (error) {
            console.error(error);
        }
    };

    async function Flight() {
        try {
            const flights = await axios.get(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=BOS&destinationLocationCode=${iata}&departureDate=${date}&adults=1&nonStop=true&currencyCode=USD&max=250`, {
                headers: {
                  'Authorization': 'Bearer jWlAdXKbVgEpixSobbUQBby3GDv0',
                  'Content-Type': 'application/json'
                }
              });
            setFlight(flights.data.data);
            console.log(flight);
        } catch (error) {
            console.error(error);
        }
    };

    async function City() {
        try {
            const cities = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${iata}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=LIGHT`, {
                headers: {
                    'Authorization': 'Bearer Vg87YwrNJARAp21EUItTtIfMXANl',
                    'Content-Type': 'application/json'
                }
            });
            setCity(cities.data.data[0].address.cityName);
            Weather(city);
        } catch(error) {
            console.error(error);
        }
    }

    function Return() {
        navigate('/request', { state: { user }});
    };

    useEffect(() => {
        if (user === undefined) {
            navigate("/login");
        } else {
            City();
        }
    },[city]);

    return (
        <>
            <Logout/>
            <button onClick={Return}>Go back to Request</button>
            <table>
                <thead>
                    <tr>
                    <th style={{ border: '1px solid black', padding: '5px' }}>Date</th>
                    <th style={{ border: '1px solid black', padding: '5px' }}>Min Temperature</th>
                    <th style={{ border: '1px solid black', padding: '5px' }}>Avg Temperature</th>
                    <th style={{ border: '1px solid black', padding: '5px' }}>Max Temperature</th>
                    </tr>
                </thead>
                <tbody>
                    {weather.map((weather, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{weather.date}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{weather.day.mintemp_f}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{weather.day.avgtemp_f}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{weather.day.maxtemp_f}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <table>
                <thead>
                    <tr>
                    <th style={{ border: '1px solid black', padding: '5px' }}>Deadline</th>
                    <th style={{ border: '1px solid black', padding: '5px' }}>Price</th>
                    <th style={{ border: '1px solid black', padding: '5px' }}>Seats Left</th>
                    <th style={{ border: '1px solid black', padding: '5px' }}>Departure Time</th>
                    <th style={{ border: '1px solid black', padding: '5px' }}>Departure Terminal</th>
                    <th style={{ border: '1px solid black', padding: '5px' }}>Arrival Time</th>
                    <th style={{ border: '1px solid black', padding: '5px' }}>Arrival Terminal</th>
                    </tr>
                </thead>
                <tbody>
                    {flight.map((flight, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{flight.lastTicketingDate}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>${flight.price.total}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{flight.numberOfBookableSeats}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{flight.itineraries[0].segments[0].departure.at}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{flight.itineraries[0].segments[0].departure.terminal}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{flight.itineraries[0].segments[0].arrival.at}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{flight.itineraries[0].segments[0].arrival.terminal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        
        </>
        
    )
}

export default withAuth(Respond);