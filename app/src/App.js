import logo from './logo.svg';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import './App.css';
import { set } from 'mongoose';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Request from './pages/Request.js';
import Respond from './pages/Respond.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/request' element={<Request/>} />
          <Route path='/respond' element={<Respond/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
