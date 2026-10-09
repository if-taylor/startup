import React from 'react';

export function Planning() {
    return (
        <main className="container mt-4">
            {/* User goals and habits will eventually be loaded from a database. */}
            <section className="planning">
                <section className="planning-section">
                    <h3>Habits</h3>
                    <ul>
                        <li>
                            <button className="habit-item">
                                <div className="item-header">
                                    <h3>Exercise</h3>
                                    <span>Every weekday</span>
                                </div>
                            </button>
                        </li>

                        <li>
                            <button className="habit-item">
                                <div className="item-header">
                                    <h3>Read Scriptures</h3>
                                    <span>Every day</span>
                                </div>
                            </button>
                        </li>

                        <li>
                            <button className="habit-item">
                                <div className="item-header">
                                    <h3>Build my Website</h3>
                                    <span>3 times per week</span>
                                </div>
                            </button>
                        </li>
                    </ul>
                    <button>New Habit</button>
                </section>

                <section className="planning-section">
                    <h3>Goals</h3>
                    <p>It is recommended to have at most 2-3 current goals</p>
                    <ul>
                        <li>
                            <button className="goal-item">
                                <div className="item-header">
                                    <h3>Read Old Testament</h3>
                                    <span>October 25th</span>
                                </div>

                                <p>Progress: 60%</p>

                                <div className="progress-bar">
                                    <div className="progress"></div>
                                </div>
                            </button>
                        </li>

                        <li>
                            <button className="goal-item">
                                <div className="item-header">
                                    <h3>Build my Website</h3>
                                    <span>December 1st</span>
                                </div>

                                <p>Progress: 25%</p>

                                <div className="progress-bar">
                                    <div className="progress"></div>
                                </div>
                            </button>
                        </li>
                    </ul>
                    <button>New Goal</button>
                </section>

                <section className="planning-section">
                    <h3>Past Goals</h3>
                    <p>Here are the goals you've completed!</p>
                    <ul>
                        <li>
                            <button className="goal-item">
                                <div className="item-header">
                                    <h3>Read Book of Mormon</h3>
                                    <span>Finished: July 12th</span>
                                </div>

                                <p>Progress: 100%</p>

                                <div className="progress-bar">
                                    <div className="progress"></div>
                                </div>
                            </button>
                        </li>

                        <li>
                            <button className="goal-item">
                                <div className="item-header">
                                    <h3>Learn Piano Piece</h3>
                                    <span>Finished: May 5th</span>
                                </div>

                                <p>Progress: 100%</p>

                                <div className="progress-bar">
                                    <div className="progress"></div>
                                </div>
                            </button>
                        </li>

                        <li>
                            <button className="goal-item">
                                <div className="item-header">
                                    <h3>Run a Marathon</h3>
                                    <span>Finished: November 19th, 2025</span>
                                </div>

                                <p>Progress: 100%</p>

                                <div className="progress-bar">
                                    <div className="progress"></div>
                                </div>
                            </button>
                        </li>
                    </ul>
                </section>
            </section>
        </main>
    );
}