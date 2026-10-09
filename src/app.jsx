import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return(
    <div className="body bg-dark text-light">
        <header>
            <nav className="navbar">
                <a href="index.html" className="nav-brand">
                    <img src="/LiveMyGospelLogoNew.png" alt="LiveMyGospel Logo" />
                    <span>LiveMyGospel</span>
                </a>

                <div className="nav-links">
                    <a href="schedule.html">SCHEDULE</a>
                    <a href="planning.html">PLANNING</a>
                    <a href="login.html">LOGIN</a>
                </div>
            </nav>
        </header>

        <main>App components go here</main>

        <footer>
            <p>LiveMyGospel by Taylor Richins</p>
            <p><a href="https://github.com/if-taylor/startup">GitHub Repository</a></p>
        </footer>
    </div>
  );
}