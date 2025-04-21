import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    // State variables to store user input
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Function to handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevents default form submission behavior

        // Check if passwords match before sending request
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            // Send registration request to the API
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, password_confirmation: confirmPassword}),
            });

            const data = await response.json(); // Parse API response

            if (response.ok) {
                navigate("/");
            } else {
                let errorMsg = data.message;
                if (data.errors) {
                    errorMsg = Object.values(data.errors).flat().join(" ");
                }
                setError(errorMsg || "Registration failed");
            }
            
        } catch (error) {
            // Handle server errors
            setError("Server error reg");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
                {/* Registration heading */}
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                {/* Display error message if registration fails */}
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                {/* Registration form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    
                    {/* Name input field */}
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    {/* Email input field */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Password input field */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Confirm Password input field */}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    {/* Register button */}
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Register
                    </button>
                </form>

                {/* Button to navigate back to login page */}
                <button
                    onClick={() => navigate("/")}
                    className="w-full p-3 mt-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default Register;
