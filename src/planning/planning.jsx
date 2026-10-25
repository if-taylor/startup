import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export function Planning() {
    const [habits, setHabits] = React.useState(() => {
        const savedHabits = localStorage.getItem('habits');

        if (savedHabits) {
            return JSON.parse(savedHabits);
        }

        return [];
    });

    const [showHabitModal, setShowHabitModal] = React.useState(false);
    const [newHabitName, setNewHabitName] = React.useState('');
    const [frequencyType, setFrequencyType] = React.useState('everyDay');
    const [selectedDays, setSelectedDays] = React.useState([]);
    const [timesPerWeek, setTimesPerWeek] = React.useState(3);

    React.useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);
    
    function addHabit() {
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

        const newHabit = {
            id: Date.now(),
            name: newHabitName,
            frequency: frequency,
        };

        setHabits([...habits, newHabit]);

        setNewHabitName('');
        setFrequencyType('everyDay');
        setSelectedDays([]);
        setTimesPerWeek(3);
        setShowHabitModal(false);
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

    return (
        <main className="container mt-4">
            {/* User goals and habits will eventually be loaded from a database. */}
            <section className="planning">
                <section className="planning-section">
                    <h3>Habits</h3>
                    <ul>
                        {habits.map((habit) => (
                            <li key={habit.id}>
                                <button className="habit-item">
                                    <div className="item-header">
                                        <h3>{habit.name}</h3>
                                        <span>{getFrequencyText(habit.frequency)}</span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <Button onClick={() => setShowHabitModal(true)}>
                        New Habit
                    </Button>
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

            <Modal show={showHabitModal} onHide={() => setShowHabitModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>New Habit</Modal.Title>
                </Modal.Header>

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
                    <Button variant="secondary" onClick={() => setShowHabitModal(false)}>
                        Cancel
                    </Button>

                    <Button variant="primary" onClick={addHabit}>
                        Add Habit
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}