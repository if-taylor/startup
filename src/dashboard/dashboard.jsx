import React from 'react';

export function Dashboard() {
  return (
    <main class="container mt-4">
        {/* User name will come from authentication */}
        <section class="home-welcome">
            <h2 id="welcome-heading">Welcome to LiveMyGospel, [user]!</h2>
            <p class="text-muted">LiveMyGospel is a scheduling and goal/habit tracking app for those who want to align their daily lives with their goals 
                for the future and who they want to become.</p>
        </section>
        
        {/* Habits overview */}
        {/* Habits on homepage will eventually be loaded from the database for the current user. */}
        <section class="p-4 mb-4">
            <h2 class="fw-light fs-4">Here's your overview for today.</h2>
            <table class="habits-table">
                <thead>
                    <tr>
                        <th>Habit</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Habit 1</td>
                        <td>not complete</td>
                    </tr>
                    <tr>
                        <td>Habit 2</td>
                        <td>complete</td>
                    </tr>
                    <tr>
                        <td>Habit 3</td>
                        <td>not complete</td>
                    </tr>
                </tbody>
            </table>
        </section>
        {/* Goals overview */}
        <section class="p-4 mb-4">
            <h2 class="fw-light fs-4">Your Goals</h2>

            {/* Goals will eventually be loaded from the database for the current user. */}
            <table class="goals-table">
                <thead>
                    <tr>
                        <th>Goal</th>
                        <th>Progress</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Example Goal</td>
                        <td>60%</td>
                    </tr>
                    <tr>
                        <td>Another Goal</td>
                        <td>5%</td>
                    </tr>
                    <tr>
                        <td>Third Goal</td>
                        <td>25%</td>
                    </tr>
                </tbody>
            </table>

        </section>
        
        {/* Upcoming events */}
        <section class="p-4 mb-4">
            <h3 class="fw-light fs-4">Upcoming Events</h3>
            {/* Upcoming events will eventually be loaded from the database for the current user. */}
            <div class="upcoming-event">
                <h3>Example event</h3>
                <p>9:00 AM - 10:00 AM</p>
                <p>Location: the moon</p>
                
            </div>

            <div class="upcoming-event">
                <h3>Another event</h3>
                <p>12:00 PM - 1:00 PM</p>
                <p>Location: here</p>
            </div>
        </section>

        {/* Weather information from a third-party service */}
        <section class="weather-section p-4 mb-4">
            <h3 class="fw-light fs-4">Current Weather</h3>
            <p>Weather information will be displayed here.</p>
        </section>

        <section class="p-4 mb-4">
            <h2 class="fw-light fs-4">My Friends' Goals</h2>
            {/* Shared progress will eventually update in real time through WebSockets. */}
            <ul class="friends-goals">
                <li>
                    <h3>Run a 5K</h3>
                    <p>Shared by Alex</p>
                    <p>Progress: 62%</p>
                </li>

                <li>
                    <h3>Read Every Day</h3>
                    <p>Shared by Alex</p>
                    <p>Current streak: 12 days</p>
                </li>
            </ul>
        </section>
    </main>
  );
}