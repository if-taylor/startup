import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export function Schedule() {

    const [events, setEvents] = React.useState(() => {
        const savedEvents = localStorage.getItem('events');

        if (savedEvents) {
            return JSON.parse(savedEvents);
        }

        return [];
    });

    const [selectedDate, setSelectedDate] = React.useState(() => {
        return new Date().toISOString().split('T')[0];
    });

    const [showEventModal, setShowEventModal] = React.useState(false);
    const [editingEventId, setEditingEventId] = React.useState(null);

    const [eventName, setEventName] = React.useState('');
    const [eventDate, setEventDate] = React.useState('');
    const [eventStartTime, setEventStartTime] = React.useState('');
    const [eventEndTime, setEventEndTime] = React.useState('');

    const hourHeight = 60;

    React.useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    function changeDay(amount) {
        const date = new Date(`${selectedDate}T12:00:00`);
        date.setDate(date.getDate() + amount);

        setSelectedDate(date.toISOString().split('T')[0]);
    }

    function goToToday() {
        setSelectedDate(new Date().toISOString().split('T')[0]);
    }

    function formatSelectedDate() {
        const date = new Date(`${selectedDate}T12:00:00`);

        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    }

    function openNewEventModal() {
        setEditingEventId(null);
        setEventName('');
        setEventDate(selectedDate);
        setEventStartTime('');
        setEventEndTime('');
        setShowEventModal(true);
    }

    function openEventModal(event) {
        setEditingEventId(event.id);
        setEventName(event.name);
        setEventDate(event.date);
        setEventStartTime(event.startTime);
        setEventEndTime(event.endTime);
        setShowEventModal(true);
    }

    function closeEventModal() {
        setShowEventModal(false);
        setEditingEventId(null);
        setEventName('');
        setEventDate('');
        setEventStartTime('');
        setEventEndTime('');
    }

    function saveEvent() {
        if (!eventName.trim() || !eventDate || !eventStartTime || !eventEndTime) {
            return;
        }

        if (eventEndTime <= eventStartTime) {
            return;
        }

        if (editingEventId !== null) {
            setEvents(
                events.map((event) =>
                    event.id === editingEventId
                        ? {
                            ...event,
                            name: eventName.trim(),
                            date: eventDate,
                            startTime: eventStartTime,
                            endTime: eventEndTime,
                        }
                        : event
                )
            );
        } else {
            const newEvent = {
                id: crypto.randomUUID(),
                name: eventName.trim(),
                date: eventDate,
                startTime: eventStartTime,
                endTime: eventEndTime,
            };

            setEvents([...events, newEvent]);
        }

        closeEventModal();
    }

    function deleteEvent() {
        setEvents(events.filter((event) => event.id !== editingEventId));
        closeEventModal();
    }

    function timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    return (
        <main className="container mt-4">

            <section className="schedule">
                <h3 className="page-heading">Schedule</h3>
                <h2>{formatSelectedDate()}</h2>
                <section className="schedule-navigation">
                    <button onClick={() => changeDay(-1)}>← Previous Day</button>
                    <button onClick={goToToday}>Today</button>
                    <button onClick={() => changeDay(1)}>Next Day →</button>

                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(event) => setSelectedDate(event.target.value)}
                    />
                </section>

                <section className="schedule-timeline">
                    <div className="timeline-hours">
                        {Array.from({ length: 25 }, (_, hour) => {
                            const displayHour = hour % 12 === 0 ? 12 : hour % 12;
                            const period = hour < 12 || hour === 24 ? 'AM' : 'PM';

                            return (
                                <div className="timeline-hour" key={hour}>
                                    <time>{displayHour}:00 {period}</time>
                                </div>
                            );
                        })}
                    </div>

                    {/* Schedule events will eventually be loaded from the database for the current user. */}
                    <div className="timeline-events">
                        {events
                            .filter((event) => event.date === selectedDate)
                            .sort((a, b) => a.startTime.localeCompare(b.startTime))
                            .map((event) => {
                                const startMinutes = timeToMinutes(event.startTime);
                                const endMinutes = timeToMinutes(event.endTime);

                                const top = (startMinutes / 60) * hourHeight;
                                const height = ((endMinutes - startMinutes) / 60) * hourHeight;

                                return (
                                    <button
                                        key={event.id}
                                        className="timeline-event"
                                        onClick={() => openEventModal(event)}
                                        style={{
                                            top: `${top}px`,
                                            height: `${height}px`,
                                        }}
                                    >
                                        <strong>{event.name}</strong>
                                        <span>
                                            {event.startTime} – {event.endTime}
                                        </span>
                                    </button>
                                );
                            })}
                    </div>
                </section>

                {/* Add more events */}
                <button onClick={openNewEventModal}>Add Event</button>
            </section>

            <Modal show={showEventModal} onHide={closeEventModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editingEventId !== null ? 'Edit Event' : 'New Event'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={eventName}
                            onChange={(event) => setEventName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={eventDate}
                            onChange={(event) => setEventDate(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={eventStartTime}
                            onChange={(event) => setEventStartTime(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={eventEndTime}
                            onChange={(event) => setEventEndTime(event.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    {editingEventId !== null && (
                        <Button variant="danger" onClick={deleteEvent}>
                            Delete Event
                        </Button>
                    )}

                    <Button variant="secondary" onClick={closeEventModal}>
                        Cancel
                    </Button>

                    <Button variant="primary" onClick={saveEvent}>
                        {editingEventId !== null ? 'Save Changes' : 'Add Event'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}