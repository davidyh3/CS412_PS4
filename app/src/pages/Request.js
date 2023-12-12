import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Logout from '../components/logout.js';
import withAuth from '../components/withAuth.js';
import '../css/Request.css';

function Request() {

  const navigate = useNavigate();
  const [ date, setDate ] = useState("");
  const [ iata, setIATA ] = useState("");
  const [ users, setUsers ] = useState("");
  const [ popup, setPopUp ] = useState(false);
  const { state } = useLocation();
  const user = state?.user

  function handleOnClick() {
    setUsers(state?.user);
    console.log(iata);
    console.log(date);
    if ( iata === "" || date === "" ) {
      TogglePopup();
    } else {
      navigate('/respond', { state: { iata, date, user } });    
    }
  };

  function TogglePopup() {
    setPopUp(!popup);
  }

  useEffect(() => {
    if (user === undefined) {
      navigate("/login");
    }
  },[]);

  return (
      <>
      <head>
  <link rel="stylesheet" href="style.css"/>
  </head>
<h1>Hello {user?.name}</h1>
<div class="dropdown">
  <label for="IATA-select">What city would you like to visit?</label>
  <select id="IATA-select" name="IATA" value={iata} onChange={(event) => setIATA(event.target.value)}>
    <option value="">-- Please select a city to visit --</option>
    <option value="BER">Berlin</option>
    <option value="ORD">Chicago</option>
    <option value="DEN">Denver</option>
    <option value="DUB">Dublin</option>
    <option value="FLL">Fort Lauderdale</option>
    <option value="LIS">Lisbon</option>
    <option value="LHR">London</option>
    <option value="LAX">Los Angeles</option>
    <option value="MDE">Medellin</option>
    <option value="MEX">Mexico City</option>
    <option value="MIA">Miama</option>
    <option value="YMX">Montreal</option>
    <option value="MYR">Myrtle Beach</option>
    <option value="BNA">Nashville</option>
    <option value="MSY">New Orleans</option>
    <option value="JFK">New York City</option>
    <option value="PAR">Paris</option>
    <option value="RIO">Rio de Janeiro</option>
    <option value="ROM">Rome</option>
    <option value="SYD">Sydney</option>

  </select>
  </div>

  <div class="calendar">
  <label for="duration-input">When would you like to Visit?</label>
  <input 
  type="date" 
  id="duration-input" 
  name="duration" 
  onChange={(event) => setDate(event.target.value)}
  min={new Date().toISOString().split('T')[0]} />
  </div>


  <div class="form-actions">
    <button type="submit" class="button button-primary" onClick={handleOnClick}>Submit</button>
  </div>
  <div class="logout">
      <Logout/>
  </div>
  <>
    {popup && (
    <div className="popup">
      <h2>ERROR</h2>
      <p>Please fill in all fields before submitting.</p>
      <button onClick={TogglePopup}>Close</button>
    </div>
    )}
  </>
        </>
    )
}

export default withAuth(Request);
