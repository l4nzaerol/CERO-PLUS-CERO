import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/dashboard.css";
import { LogOut, ClipboardList, FolderKanban } from "lucide-react";

const Dashboard = ({ onLogout }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("tasks"); // either 'tasks' or 'projects'
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchUserDetails();
        fetchTasks();
        fetchProjects();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:8000/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:8000/api/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:8000/api/projects", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                localStorage.removeItem("token");
                onLogout();
                navigate("/");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2>{user ? `Welcome, ${user.name}` : "Loading..."}</h2>
                <ul>
                    <li
                        className={activeTab === "tasks" ? "active" : ""}
                        onClick={() => setActiveTab("tasks")}
                    >
                        <ClipboardList size={16} />
                        My Tasks
                    </li>
                    <li
                        className={activeTab === "projects" ? "active" : ""}
                        onClick={() => setActiveTab("projects")}
                    >
                        <FolderKanban size={16} />
                        Projects
                    </li>
                </ul>
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                </button>
            </aside>

            {/* Main content */}
            <main className="main-content">
                {activeTab === "tasks" && (
                    <>
                        <h2>My Tasks</h2>
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Project</th>
                                    <th>Assigned To</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <tr key={task.id}>
                                            <td>{task.name}</td>
                                            <td>{task.description}</td>
                                            <td>{task.status}</td>
                                            <td>{task.priority}</td>
                                            <td>{task.project_id}</td>
                                            <td>{task.assigned_to || "Unassigned"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No tasks available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                )}

                {activeTab === "projects" && (
                    <>
                        <h2>Projects</h2>
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.length > 0 ? (
                                    projects.map((project) => (
                                        <tr key={project.id}>
                                            <td>{project.id}</td>
                                            <td>{project.name}</td>
                                            <td>{project.description}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No projects available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
