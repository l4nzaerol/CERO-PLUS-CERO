import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Login component handles user authentication and navigation to the dashboard.
const Login = ({ onLogin }) => {
    const [email, setEmail] = useState(""); // State to store email input
    const [password, setPassword] = useState(""); // State to store password input
    const [error, setError] = useState(""); // State to store error messages
    const navigate = useNavigate();

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }), // Send email and password to the API
            });

            const data = await response.json();

            if (response.ok) {
                onLogin(data.token); // Pass the token to the parent component
                navigate("/dashboard"); // Redirect to the dashboard
            } else {
                setError(data.message || "Login failed"); // Display error message
            }
        } catch (error) {
            setError("Server error"); // Handle server errors
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;