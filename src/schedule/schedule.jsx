import React from 'react';

export function Schedule() {
    return (
        <main className="container mt-4">

            <section className="schedule">
                <h3 className="page-heading">Schedule</h3>
                <h2>September 22, 2026</h2>
                <section className="schedule-navigation">
                        <button>← Previous Day</button>
                        <button>Today</button>
                        <button>Next Day →</button>
                        <button>📅</button>
                </section>
                
                <section className="schedule-timeline">
                    <div className="timeline-hours">
                        <div className="timeline-hour">
                            <time>12:00 AM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>1:00 AM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>2:00 AM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>3:00 AM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>4:00 AM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>5:00 AM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>6:00 AM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>7:00 AM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>8:00 AM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>9:00 AM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>10:00 AM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>11:00 AM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>12:00 PM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>1:00 PM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>2:00 PM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>3:00 PM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>4:00 PM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>5:00 PM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>6:00 PM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>7:00 PM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>8:00 PM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>9:00 PM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>10:00 PM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>11:00 PM</time>
                        </div>
                        <div className="timeline-hour">
                            <time>12:00 AM</time>
                        </div>
                    </div>

                    {/* Schedule events will eventually be loaded from the database for the current user. */}
                    <div className="timeline-events">                
                        <div className="timeline-event">
                            <strong>Morning Workout</strong>
                            <span>7:00 AM – 8:00 AM</span>
                        </div>

                        <div className="timeline-event">
                            <strong>Study Session</strong>
                            <span>10:30 AM – 12:00 PM</span>
                        </div>
                    </div>
                </section>

                {/* Add more events */}
                <button>🞣Add Event</button>
            </section>
        </main>
    );
}