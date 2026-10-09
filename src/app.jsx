import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Dashboard } from "./dashboard/dashboard";
import { Planning } from "./planning/planning";
import { Schedule } from "./schedule/schedule";
import { Login } from "./login/login";


export default function App() {
    return(
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
                        <NavLink to="/login">LOGIN</NavLink>
                    </div>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/planning" element={<Planning />} />
                <Route path="/login" element={<Login />} />
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