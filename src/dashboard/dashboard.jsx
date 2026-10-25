import React from 'react';

export function Dashboard({ userName }) {
    const [habits, setHabits] = React.useState(() => {
        const savedHabits = localStorage.getItem('habits');
        return savedHabits ? JSON.parse(savedHabits) : [];
    });

    const [goals, setGoals] = React.useState(() => {
        const savedGoals = localStorage.getItem('goals');
        return savedGoals ? JSON.parse(savedGoals) : [];
    });

    const [events, setEvents] = React.useState(() => {
        const savedEvents = localStorage.getItem('events');
        return savedEvents ? JSON.parse(savedEvents) : [];
    });

    const [habitCompletions, setHabitCompletions] = React.useState(() => {
        const savedCompletions = localStorage.getItem('habitCompletions');
        return savedCompletions ? JSON.parse(savedCompletions) : {};
    });

    const upcomingEvents = [...events]
        .filter((event) => {
            const eventDateTime = new Date(
                `${event.date}T${event.startTime}`
            );

            return eventDateTime >= new Date();
        })
        .sort((a, b) => {
            const first = new Date(`${a.date}T${a.startTime}`);
            const second = new Date(`${b.date}T${b.startTime}`);

            return first - second;
        })
        .slice(0, 3);

    const [weather, setWeather] = React.useState(null);

    const [friendUpdates, setFriendUpdates] = React.useState([
        {
            id: crypto.randomUUID(),
            user: 'Alex',
            goal: 'Run a 5K',
            progress: 62,
        },
    ]);

    React.useEffect(() => {
        localStorage.setItem(
            'habitCompletions',
            JSON.stringify(habitCompletions)
        );
    }, [habitCompletions]);

    React.useEffect(() => {
        localStorage.setItem('goals', JSON.stringify(goals));
    }, [goals]);

    React.useEffect(() => {
        setWeather(getWeather());
    }, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            // Mock WebSocket update
            const mockUpdates = [
                {
                    user: 'Alex',
                    goal: 'Run a 5K',
                    progress: Math.floor(Math.random() * 101),
                },
                {
                    user: 'Jordan',
                    goal: 'Read 20 Books',
                    progress: Math.floor(Math.random() * 101),
                },
                {
                    user: 'Sam',
                    goal: 'Learn Guitar',
                    progress: Math.floor(Math.random() * 101),
                },
            ];

            const randomUpdate =
                mockUpdates[Math.floor(Math.random() * mockUpdates.length)];

            setFriendUpdates((previousUpdates) => [
                {
                    id: crypto.randomUUID(),
                    ...randomUpdate,
                },
                ...previousUpdates,
            ].slice(0, 5));
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    function getDateKey(date = new Date()) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    function getTodayKey() {
        return getDateKey();
    }

    function isHabitDueOnDate(habit, date) {
        if (habit.frequency.type === 'everyDay') {
            return true;
        }

        if (habit.frequency.type === 'specificDays') {
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const dayName = dayNames[date.getDay()];

            return habit.frequency.days.includes(dayName);
        }

        if (habit.frequency.type === 'timesPerWeek') {
            return true;
        }

        return false;
    }

    function getStartOfWeek(date = new Date()) {
        const start = new Date(date);
        const day = start.getDay();

        const difference = day === 0 ? -6 : 1 - day;

        start.setDate(start.getDate() + difference);
        start.setHours(0, 0, 0, 0);

        return start;
    }

    function getHabitWeeklyCompletions(habitId) {
        const startOfWeek = getStartOfWeek();
        let count = 0;

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);

            const dateKey = getDateKey(date);

            if (habitCompletions[dateKey]?.includes(habitId)) {
                count++;
            }
        }

        return count;
    }

    function isHabitDueToday(habit) {
        const today = new Date();

        if (habit.frequency.type === 'timesPerWeek') {
            const completedThisWeek = getHabitWeeklyCompletions(habit.id);

            return completedThisWeek < habit.frequency.count;
        }

        return isHabitDueOnDate(habit, today);
    }

    function isHabitCompleteToday(habitId) {
        const today = getTodayKey();

        return habitCompletions[today]?.includes(habitId) ?? false;
    }

    function toggleHabitCompletion(habitId) {
        const today = getTodayKey();
        const completedToday = habitCompletions[today] || [];

        let updated;

        if (completedToday.includes(habitId)) {
            updated = completedToday.filter((id) => id !== habitId);
        } else {
            updated = [...completedToday, habitId];
        }

        setHabitCompletions({
            ...habitCompletions,
            [today]: updated,
        });
    }

    function getGoalProgress(goal) {
        if (goal.tasks.length === 0) {
            return 0;
        }

        const completedTasks = goal.tasks.filter(
            (task) => task.completed
        ).length;

        return Math.round(
            (completedTasks / goal.tasks.length) * 100
        );
    }

    function isGoalComplete(goal) {
        return goal.tasks.length > 0 &&
            goal.tasks.every((task) => task.completed);
    }

    function toggleGoalTask(goalId, taskId) {
        const goal = goals.find((goal) => goal.id === goalId);

        if (!goal) {
            return;
        }

        const wasComplete = isGoalComplete(goal);

        const updatedTasks = goal.tasks.map((task) =>
            task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
        );

        const updatedGoal = {
            ...goal,
            tasks: updatedTasks,
        };

        const willBeComplete = isGoalComplete(updatedGoal);

        if (!wasComplete && willBeComplete) {
            const confirmed = window.confirm(
                'Completing this task will finish the goal and move it to Past Goals. Continue?'
            );

            if (!confirmed) {
                return;
            }

            updatedGoal.completedDate = new Date().toLocaleDateString();
        }

        if (wasComplete && !willBeComplete) {
            const confirmed = window.confirm(
                'This will mark the goal as unfinished and move it back to your current Goals. Continue?'
            );

            if (!confirmed) {
                return;
            }

            updatedGoal.completedDate = null;
        }

        setGoals(
            goals.map((currentGoal) =>
                currentGoal.id === goalId
                    ? updatedGoal
                    : currentGoal
            )
        );
    }

    function getNextTask(goal) {
        return goal.tasks.find((task) => !task.completed);
    }

    function getWeather() {
        // This will be replaced with a third-party weather service call.
        return {
            temperature: 68,
            condition: 'Partly cloudy',
            location: 'Viridian City',
        };
    }

    return (
        <main className="container mt-4">
            {/* User name will come from authentication */}
            <section className="home-welcome">
                <h2 id="welcome-heading">
                    Welcome to LiveMyGospel{userName ? `, ${userName.split('@')[0]}` : ''}!
                </h2>
                <p className="text-muted">LiveMyGospel is a scheduling and goal/habit tracking app for those who want to align their daily lives with their goals
                    for the future and who they want to become.</p>
            </section>

            {/* Habits overview */}
            {/* Habits on homepage will eventually be loaded from the database for the current user. */}
            <section className="p-4 mb-4">
                <h2 className="fw-light fs-4">Here's your overview for today.</h2>
                <table className="habits-table">
                    <thead>
                        <tr>
                            <th>Habit</th>
                            <th>Status</th>
                            <th>This Week</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habits
                            .filter((habit) => isHabitDueToday(habit))
                            .map((habit) => (
                                <tr key={habit.id}>
                                    <td>{habit.name}</td>

                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={isHabitCompleteToday(habit.id)}
                                            onChange={() => toggleHabitCompletion(habit.id)}
                                        />

                                        {isHabitCompleteToday(habit.id)
                                            ? ' Complete'
                                            : ' Not complete'}
                                    </td>
                                    <td>
                                        {habit.frequency.type === 'timesPerWeek'
                                            ? `${getHabitWeeklyCompletions(habit.id)} / ${habit.frequency.count}`
                                            : `${getHabitWeeklyCompletions(habit.id)} completed`}
                                    </td>
                                </tr>
                            ))}

                        {habits.length === 0 && (
                            <tr>
                                <td colSpan="2">No habits yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
            {/* Goals overview */}
            <section className="p-4 mb-4">
                <h2 className="fw-light fs-4">Your Goals</h2>

                {/* Goals will eventually be loaded from the database for the current user. */}
                <table className="goals-table">
                    <thead>
                        <tr>
                            <th>Goal</th>
                            <th>Progress</th>
                            <th>Next Task</th>
                        </tr>
                    </thead>
                    <tbody>
                        {goals
                            .filter((goal) => !isGoalComplete(goal))
                            .map((goal) => {
                                const nextTask = getNextTask(goal);

                                return (
                                    <tr key={goal.id}>
                                        <td>{goal.name}</td>

                                        <td>{getGoalProgress(goal)}%</td>

                                        <td>
                                            {nextTask && (
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={nextTask.completed}
                                                        onChange={() =>
                                                            toggleGoalTask(goal.id, nextTask.id)
                                                        }
                                                    />

                                                    {' '}
                                                    {nextTask.name}
                                                </label>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>

            </section>

            {/* Upcoming events */}
            <section className="p-4 mb-4">
                <h3 className="fw-light fs-4">Upcoming Events</h3>
                {/* Upcoming events will eventually be loaded from the database for the current user. */}
                {upcomingEvents.map((event) => (
                    <div className="upcoming-event" key={event.id}>
                        <h3>{event.name}</h3>

                        <p>
                            {event.date} — {event.startTime} – {event.endTime}
                        </p>
                    </div>
                ))}

                {upcomingEvents.length === 0 && (
                    <p>No upcoming events.</p>
                )}
            </section>

            {/* Weather information from a third-party service */}
            <section className="weather-section p-4 mb-4">
                <h3 className="fw-light fs-4">Current Weather</h3>
                {weather && (
                    <>
                        <p>{weather.location}</p>
                        <p>{weather.temperature}°F</p>
                        <p>{weather.condition}</p>
                    </>
                )}
            </section>

            <section className="p-4 mb-4">
                <h2 className="fw-light fs-4">My Friends' Goals</h2>
                {/* Shared progress will eventually update in real time through WebSockets. */}
                <ul className="friends-goals">
                    {friendUpdates.map((update) => (
                        <li key={update.id}>
                            <h3>{update.goal}</h3>
                            <p>Shared by {update.user}</p>
                            <p>Progress: {update.progress}%</p>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}