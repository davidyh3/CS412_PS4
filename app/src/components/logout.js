import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    function handleLogout() {
        // Clear the user data from localStorage and redirect to login page
        window.localStorage.removeItem("auth");
        navigate('/login');
    }
    
    return (
        <button onClick={handleLogout}>Logout</button>
    )
}