import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export function Planning({ userName }) {
    const [habits, setHabits] = React.useState(() => {
        const savedHabits = localStorage.getItem(`habits-${userName}`)

        if (savedHabits) {
            return JSON.parse(savedHabits);
        }

        return [];
    });

    const [goals, setGoals] = React.useState(() => {
        const savedGoals = localStorage.getItem(`goals-${userName}`)

        if (savedGoals) {
            return JSON.parse(savedGoals);
        }

        return [];
    });

    const [showHabitModal, setShowHabitModal] = React.useState(false);
    const [newHabitName, setNewHabitName] = React.useState('');
    const [frequencyType, setFrequencyType] = React.useState('everyDay');
    const [selectedDays, setSelectedDays] = React.useState([]);
    const [timesPerWeek, setTimesPerWeek] = React.useState(3);
    const [editingHabitId, setEditingHabitId] = React.useState(null);
    const [showGoalModal, setShowGoalModal] = React.useState(false);
    const [editingGoalId, setEditingGoalId] = React.useState(null);
    const [goalName, setGoalName] = React.useState('');
    const [goalDueDate, setGoalDueDate] = React.useState('');
    const [goalTasks, setGoalTasks] = React.useState([]);
    const [newTaskName, setNewTaskName] = React.useState('');
    const [goalCompletedDate, setGoalCompletedDate] = React.useState(null);

    React.useEffect(() => {
        localStorage.setItem(`habits-${userName}`, JSON.stringify(habits));
    }, [habits]);

    React.useEffect(() => {
        localStorage.setItem(`goals-${userName}`, JSON.stringify(goals));
    }, [goals]);

    function saveHabit() {
        if (!newHabitName) {
            return;
        }

        let frequency;

        if (frequencyType === 'everyDay') {
            frequency = {
                type: 'everyDay',
            };
        } else if (frequencyType === 'specificDays') {
            if (selectedDays.length === 0) {
                return;
            }

            frequency = {
                type: 'specificDays',
                days: selectedDays,
            };
        } else {
            frequency = {
                type: 'timesPerWeek',
                count: timesPerWeek,
            };
        }

        if (editingHabitId !== null) {
            setHabits(
                habits.map((habit) =>
                    habit.id === editingHabitId
                        ? {
                            ...habit,
                            name: newHabitName,
                            frequency: frequency,
                        }
                        : habit
                )
            );
        } else {
            const newHabit = {
                id: crypto.randomUUID(),
                name: newHabitName,
                frequency: frequency,
            };

            setHabits([...habits, newHabit]);
        }

        closeHabitModal();
    }

    function deleteHabit() {
        setHabits(habits.filter((habit) => habit.id !== editingHabitId));
        closeHabitModal();
    }

    function closeHabitModal() {
        setShowHabitModal(false);
        setEditingHabitId(null);
        setNewHabitName('');
        setFrequencyType('everyDay');
        setSelectedDays([]);
        setTimesPerWeek(3);
    }

    function toggleDay(day) {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    }

    function getFrequencyText(frequency) {
        if (frequency.type === 'everyDay') {
            return 'Every day';
        }

        if (frequency.type === 'specificDays') {
            return frequency.days.join(', ');
        }

        if (frequency.type === 'timesPerWeek') {
            return `${frequency.count} times per week`;
        }

        return '';
    }

    function getGoalProgress(goal) {
        if (goal.tasks.length === 0) {
            return 0;
        }

        const completedTasks = goal.tasks.filter((task) => task.completed).length;

        return Math.round((completedTasks / goal.tasks.length) * 100);
    }

    function isGoalComplete(goal) {
        return goal.tasks.length > 0 &&
            goal.tasks.every((task) => task.completed);
    }

    function areTasksComplete(tasks) {
        return tasks.length > 0 &&
            tasks.every((task) => task.completed);
    }

    function openNewGoalModal() {
        setEditingGoalId(null);
        setGoalName('');
        setGoalDueDate('');
        setGoalTasks([]);
        setNewTaskName('');
        setGoalCompletedDate(null);
        setShowGoalModal(true);
    }

    function openGoalModal(goal) {
        setEditingGoalId(goal.id);
        setGoalName(goal.name);
        setGoalDueDate(goal.dueDate || '');
        setGoalTasks(goal.tasks.map((task) => ({ ...task })));
        setNewTaskName('');
        setGoalCompletedDate(goal.completedDate || null);
        setShowGoalModal(true);
    }

    function closeGoalModal() {
        setShowGoalModal(false);
        setEditingGoalId(null);
        setGoalName('');
        setGoalDueDate('');
        setGoalTasks([]);
        setNewTaskName('');
        setGoalCompletedDate(null);
    }

    function updateGoalTasks(updatedTasks) {
        const wasComplete = areTasksComplete(goalTasks);
        const willBeComplete = areTasksComplete(updatedTasks);

        if (!wasComplete && willBeComplete) {
            const confirmed = window.confirm(
                'Completing this task will mark the goal as finished and move it to Past Goals. Continue?'
            );

            if (!confirmed) {
                return;
            }

            setGoalCompletedDate(new Date().toLocaleDateString());
        }

        if (wasComplete && !willBeComplete) {
            const confirmed = window.confirm(
                'This change will mark the goal as unfinished and move it back to your current Goals. Continue?'
            );

            if (!confirmed) {
                return;
            }

            setGoalCompletedDate(null);
        }

        setGoalTasks(updatedTasks);
    }

    function addGoalTask() {
        if (!newTaskName.trim()) {
            return;
        }

        const newTask = {
            id: crypto.randomUUID(),
            name: newTaskName.trim(),
            completed: false,
            autoGenerated: false,
        };

        updateGoalTasks([...goalTasks, newTask]);
        setNewTaskName('');
    }

    function toggleGoalTask(taskId) {
        const updatedTasks = goalTasks.map((task) =>
            task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
        );

        updateGoalTasks(updatedTasks);
    }

    function renameGoalTask(taskId, newName) {
        setGoalTasks(
            goalTasks.map((task) =>
                task.id === taskId
                    ? { ...task, name: newName }
                    : task
            )
        );
    }

    function deleteGoalTask(taskId) {
        let updatedTasks = goalTasks.filter((task) => task.id !== taskId);

        if (updatedTasks.length === 0) {
            updatedTasks = [
                {
                    id: crypto.randomUUID(),
                    name: 'Complete Goal',
                    completed: false,
                    autoGenerated: true,
                },
            ];
        }

        updateGoalTasks(updatedTasks);
    }

    function saveGoal() {
        if (!goalName.trim()) {
            return;
        }

        let finalTasks = goalTasks;

        if (finalTasks.length === 0) {
            finalTasks = [
                {
                    id: crypto.randomUUID(),
                    name: 'Complete Goal',
                    completed: false,
                    autoGenerated: true,
                },
            ];
        }

        const finalCompletedDate = areTasksComplete(finalTasks)
            ? goalCompletedDate || new Date().toLocaleDateString()
            : null;

        if (editingGoalId !== null) {
            setGoals(
                goals.map((goal) =>
                    goal.id === editingGoalId
                        ? {
                            ...goal,
                            name: goalName.trim(),
                            dueDate: goalDueDate,
                            tasks: finalTasks,
                            completedDate: finalCompletedDate,
                        }
                        : goal
                )
            );
        } else {
            const newGoal = {
                id: crypto.randomUUID(),
                name: goalName.trim(),
                dueDate: goalDueDate,
                tasks: finalTasks,
                completedDate: finalCompletedDate,
            };

            setGoals([...goals, newGoal]);
        }

        closeGoalModal();
    }

    function deleteGoal() {
        setGoals(goals.filter((goal) => goal.id !== editingGoalId));
        closeGoalModal();
    }

    return (
        <main className="container mt-4">
            {/* User goals and habits will eventually be loaded from a database. */}
            <section className="planning">
                <section className="planning-section">
                    <h3>Habits</h3>
                    <ul>
                        {habits.map((habit) => (
                            <li key={habit.id}>
                                <button
                                    className="habit-item"
                                    onClick={() => {
                                        setEditingHabitId(habit.id);
                                        setNewHabitName(habit.name);
                                        setFrequencyType(habit.frequency.type);

                                        if (habit.frequency.type === 'specificDays') {
                                            setSelectedDays(habit.frequency.days);
                                        } else {
                                            setSelectedDays([]);
                                        }

                                        if (habit.frequency.type === 'timesPerWeek') {
                                            setTimesPerWeek(habit.frequency.count);
                                        } else {
                                            setTimesPerWeek(3);
                                        }

                                        setShowHabitModal(true);
                                    }}
                                >
                                    <div className="item-header">
                                        <h3>{habit.name}</h3>
                                        <span>{getFrequencyText(habit.frequency)}</span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => {
                            setEditingHabitId(null);
                            setNewHabitName('');
                            setFrequencyType('everyDay');
                            setSelectedDays([]);
                            setTimesPerWeek(3);
                            setShowHabitModal(true);
                        }}
                    >
                        New Habit
                    </button>
                </section>

                <section className="planning-section">
                    <h3>Goals</h3>
                    <p>It is recommended to have at most 2-3 current goals</p>
                    <ul>
                        {goals
                            .filter((goal) => !isGoalComplete(goal))
                            .map((goal) => {
                                const progress = getGoalProgress(goal);

                                return (
                                    <li key={goal.id}>
                                        <button
                                            className="goal-item"
                                            onClick={() => openGoalModal(goal)}
                                        >
                                            <div className="item-header">
                                                <h3>{goal.name}</h3>
                                                <span>{goal.dueDate}</span>
                                            </div>

                                            <p>Progress: {progress}%</p>

                                            <div className="goal-progress-bar">
                                                <div
                                                    className="goal-progress-fill"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                        </button>
                                    </li>
                                );
                            })}
                    </ul>

                    <button onClick={openNewGoalModal}>
                        New Goal
                    </button>
                </section>

                <section className="planning-section">
                    <h3>Past Goals</h3>
                    <p>Here are the goals you've completed!</p>
                    <ul>
                        {goals
                            .filter((goal) => isGoalComplete(goal))
                            .map((goal) => (
                                <li key={goal.id}>
                                    <button
                                        className="goal-item"
                                        onClick={() => openGoalModal(goal)}
                                    >
                                        <div className="item-header">
                                            <h3>{goal.name}</h3>
                                            <span>
                                                {goal.completedDate
                                                    ? `Finished: ${goal.completedDate}`
                                                    : 'Completed'}
                                            </span>
                                        </div>

                                        <p>Progress: 100%</p>

                                        <div className="goal-progress-bar">
                                            <div
                                                className="goal-progress-fill"
                                                style={{ width: '100%' }}
                                            ></div>
                                        </div>
                                    </button>
                                </li>
                            ))}
                    </ul>
                </section>
            </section>

            <Modal show={showHabitModal} onHide={closeHabitModal}>
                <Modal.Title>
                    {editingHabitId !== null ? 'Edit Habit' : 'New Habit'}
                </Modal.Title>

                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Habit Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={newHabitName}
                            onChange={(event) => setNewHabitName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Frequency</Form.Label>

                        <Form.Check
                            type="radio"
                            label="Every day"
                            name="frequencyType"
                            checked={frequencyType === 'everyDay'}
                            onChange={() => setFrequencyType('everyDay')}
                        />

                        <Form.Check
                            type="radio"
                            label="Specific days"
                            name="frequencyType"
                            checked={frequencyType === 'specificDays'}
                            onChange={() => setFrequencyType('specificDays')}
                        />

                        <Form.Check
                            type="radio"
                            label="Times per week"
                            name="frequencyType"
                            checked={frequencyType === 'timesPerWeek'}
                            onChange={() => setFrequencyType('timesPerWeek')}
                        />
                    </Form.Group>

                    {frequencyType === 'specificDays' && (
                        <Form.Group className="mb-3">
                            <Form.Label>Select Days</Form.Label>

                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                <Form.Check
                                    key={day}
                                    type="checkbox"
                                    label={day}
                                    checked={selectedDays.includes(day)}
                                    onChange={() => toggleDay(day)}
                                />
                            ))}
                        </Form.Group>
                    )}

                    {frequencyType === 'timesPerWeek' && (
                        <Form.Group className="mb-3">
                            <Form.Label>Times per Week</Form.Label>

                            <Form.Select
                                value={timesPerWeek}
                                onChange={(event) => setTimesPerWeek(Number(event.target.value))}
                            >
                                <option value={1}>1 time per week</option>
                                <option value={2}>2 times per week</option>
                                <option value={3}>3 times per week</option>
                                <option value={4}>4 times per week</option>
                                <option value={5}>5 times per week</option>
                                <option value={6}>6 times per week</option>
                            </Form.Select>
                        </Form.Group>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    {editingHabitId !== null && (
                        <Button variant="danger" onClick={deleteHabit}>
                            Delete Habit
                        </Button>
                    )}

                    <Button variant="secondary" onClick={closeHabitModal}>
                        Cancel
                    </Button>

                    <Button variant="primary" onClick={saveHabit}>
                        {editingHabitId !== null ? 'Save Changes' : 'Add Habit'}
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showGoalModal} onHide={closeGoalModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editingGoalId !== null ? 'Edit Goal' : 'New Goal'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Goal Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={goalName}
                            onChange={(event) => setGoalName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Due Date (optional)</Form.Label>
                        <Form.Control
                            type="date"
                            value={goalDueDate}
                            onChange={(event) => setGoalDueDate(event.target.value)}
                        />
                    </Form.Group>

                    <h5>Tasks</h5>

                    {goalTasks.map((task) => (
                        <div key={task.id} className="d-flex align-items-center gap-2 mb-2">
                            <Form.Check
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleGoalTask(task.id)}
                            />

                            <Form.Control
                                type="text"
                                value={task.name}
                                onChange={(event) =>
                                    renameGoalTask(task.id, event.target.value)
                                }
                            />

                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => deleteGoalTask(task.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}

                    <div className="d-flex gap-2 mt-3">
                        <Form.Control
                            type="text"
                            placeholder="New task"
                            value={newTaskName}
                            onChange={(event) => setNewTaskName(event.target.value)}
                        />

                        <Button onClick={addGoalTask}>
                            Add Task
                        </Button>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    {editingGoalId !== null && (
                        <Button variant="danger" onClick={deleteGoal}>
                            Delete Goal
                        </Button>
                    )}

                    <Button variant="secondary" onClick={closeGoalModal}>
                        Cancel
                    </Button>

                    <Button variant="primary" onClick={saveGoal}>
                        {editingGoalId !== null ? 'Save Changes' : 'Create Goal'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}