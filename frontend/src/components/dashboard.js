import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, FolderKanban, ClipboardList } from "lucide-react";
import "../style/dashboard.css";

const Dashboard = ({ onLogout }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("projects");
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        budget: "",
        status: "active",
    });

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        name: "",
        details: "",
        status: "todo",
    });

    useEffect(() => {
        fetchProjects();
        fetchTasks();
    }, []);

    const fetchProjects = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://127.0.0.1:8000/api/my-projects", {
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

    const fetchTasks = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://127.0.0.1:8000/api/my-tasks", {
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

    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        try {
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

    const handleCreateProject = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const method = newProject.id ? "PUT" : "POST";
        const url = newProject.id
            ? `http://127.0.0.1:8000/api/projects/${newProject.id}`
            : "http://127.0.0.1:8000/api/projects";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newProject),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Project saved:", data);
                setNewProject({ name: "", description: "", budget: "", status: "active" });
                fetchProjects();
            } else {
                const errorData = await response.json();
                console.error("Error saving project:", errorData);
            }
        } catch (error) {
            console.error("Error saving project:", error);
        }
    };

    const handleEditProject = (project) => {
        setNewProject(project);
    };

    const handleDeleteProject = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/projects/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                fetchProjects();
            } else {
                const errorData = await response.json();
                console.error("Error deleting project:", errorData);
            }
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const method = newTask.id ? "PUT" : "POST";
        const url = newTask.id
            ? `http://127.0.0.1:8000/api/tasks/${newTask.id}`
            : "http://127.0.0.1:8000/api/tasks";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newTask),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Task saved:", data);
                setNewTask({ name: "", details: "", status: "todo" });
                fetchTasks();
            } else {
                const errorData = await response.json();
                console.error("Error saving task:", errorData);
            }
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    const handleEditTask = (task) => {
        setNewTask(task);
    };

    const handleDeleteTask = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                fetchTasks();
            } else {
                const errorData = await response.json();
                console.error("Error deleting task:", errorData);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <ul>
                    <li className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>
                        <FolderKanban size={16} />
                        Projects
                    </li>
                    <li className={activeTab === "tasks" ? "active" : ""} onClick={() => setActiveTab("tasks")}>
                        <ClipboardList size={16} />
                        Tasks
                    </li>
                </ul>
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                </button>
            </aside>

            <main className="main-content">
                {activeTab === "projects" && (
                    <>
                        <h2>Projects</h2>

                        <form onSubmit={handleCreateProject} className="project-form">
                            <input
                                type="text"
                                placeholder="Project Name"
                                value={newProject.name}
                                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Budget"
                                value={newProject.budget}
                                onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                                required
                            />
                            <select
                                value={newProject.status}
                                onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                            >
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                            <button type="submit">{newProject.id ? "Update Project" : "Create Project"}</button>
                            {newProject.id && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setNewProject({ name: "", description: "", budget: "", status: "active" })
                                    }
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </form>

                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Budget</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.length > 0 ? (
                                    projects.map((project) => (
                                        <tr key={project.id}>
                                            <td>{project.id}</td>
                                            <td>{project.name}</td>
                                            <td>{project.description}</td>
                                            <td>{project.budget}</td>
                                            <td>{project.status}</td>
                                            <td>
                                                <button onClick={() => handleEditProject(project)}>Edit</button>
                                                <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No projects available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                )}

                {activeTab === "tasks" && (
                    <>
                        <h2>Tasks</h2>

                        <form onSubmit={handleCreateTask} className="project-form">
                            <input
                                type="text"
                                placeholder="Task Name"
                                value={newTask.name}
                                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Details"
                                value={newTask.details}
                                onChange={(e) => setNewTask({ ...newTask, details: e.target.value })}
                                required
                            />
                            <select
                                value={newTask.status}
                                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                            >
                                <option value="todo">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                            <button type="submit">{newTask.id ? "Update Task" : "Create Task"}</button>
                            {newTask.id && (
                                <button type="button" onClick={() => setNewTask({ name: "", details: "", status: "todo" })}>
                                    Cancel Edit
                                </button>
                            )}
                        </form>

                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Details</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <tr key={task.id}>
                                            <td>{task.id}</td>
                                            <td>{task.name}</td>
                                            <td>{task.details}</td>
                                            <td>{task.status}</td>
                                            <td>
                                                <button onClick={() => handleEditTask(task)}>Edit</button>
                                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No tasks available.</td>
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
