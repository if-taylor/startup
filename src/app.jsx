import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "./dashboard/dashboard";
import { Planning } from "./planning/planning";
import { Schedule } from "./schedule/schedule";
import { Login } from "./login/login";



export default function App() {
    const [userName, setUserName] = React.useState(() => {
        return localStorage.getItem('userName') || '';
    });

    function RequireAuth({ userName, children }) {
        if (!userName) {
            return <Navigate to="/login" replace />;
        }

        return children;
    }

    return (
        <BrowserRouter>
            <div className="body">
                <header>
                    <nav className="navbar">
                        <NavLink className="nav-brand" to="/">
                            <img src="/LiveMyGospelLogoNew.png" alt="LiveMyGospel Logo" />
                            <span>LiveMyGospel</span>
                        </NavLink>

                        <div className="nav-links">
                            <NavLink to="/schedule">SCHEDULE</NavLink>
                            <NavLink to="/planning">PLANNING</NavLink>
                            <NavLink to="/login">
                                {userName ? 'ACCOUNT' : 'LOGIN'}
                            </NavLink>
                        </div>
                    </nav>
                </header>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireAuth userName={userName}>
                                <Dashboard userName={userName} />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="/schedule"
                        element={
                            <RequireAuth userName={userName}>
                                <Schedule userName={userName} />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="/planning"
                        element={
                            <RequireAuth userName={userName}>
                                <Planning userName={userName} />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <Login
                                userName={userName}
                                onLogin={(email) => setUserName(email)}
                                onLogout={() => setUserName('')}
                            />
                        }
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>

                <footer>
                    <p>LiveMyGospel by Taylor Richins</p>
                    <p><a href="https://github.com/if-taylor/startup">GitHub Repository</a></p>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}