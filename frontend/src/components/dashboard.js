import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/dashboard.css";

// Dashboard component displays user details, a list of users, and provides a logout option.
const Dashboard = ({ onLogout }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]); // State to store the list of users
    const [user, setUser] = useState(null); // State to store the logged-in user details

    useEffect(() => {
        fetchUserDetails(); // Fetch logged-in user details on component mount
        fetchUsers(); // Fetch the list of all users on component mount
    }, []);

    // Fetch the logged-in user details from the API
    const fetchUserDetails = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const response = await fetch("http://127.0.0.1:8000/api/user", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data); // Update the user state with fetched data
            }
        } catch (error) {
            console.error("Error fetching user details", error);
        }
    };

    // Fetch the list of all users from the API
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const response = await fetch("http://127.0.0.1:8000/api/users", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data); // Update the users state with fetched data
            }
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    // Handle user logout by calling the API and clearing local storage
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const response = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                localStorage.removeItem("token"); // Remove token from local storage
                onLogout(); // Call the onLogout callback
                navigate("/"); // Redirect to the login page
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="dashboard">
            {/* Sidebar section displaying user details and logout button */}
            <div className="sidebar">
                <h2>Welcome, {user ? user.name : "Loading..."}</h2>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            {/* Main content section displaying the list of users */}
            <div className="main-content">
                <h2>Dashboard</h2>
                <p>Here is the list of registered users.</p>

                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;