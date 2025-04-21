import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Registration from "./components/registration";
import Dashboard from "./components/dashboard";

const App = () => {
    // State to store authentication token from local storage
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Function to handle login and store token in local storage
    const handleLogin = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    // Function to handle logout and remove token from local storage
    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <Router>
            <Routes>
                {/* Redirect to dashboard if token exists, otherwise show login page */}
                <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
                
                {/* Registration page route */}
                <Route path="/register" element={<Registration />} />
                
                {/* Redirect to login if not authenticated, otherwise show dashboard */}
                <Route path="/dashboard" element={token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;