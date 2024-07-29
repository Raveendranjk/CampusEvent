document.addEventListener('DOMContentLoaded', () => {
    let events = JSON.parse(localStorage.getItem('events')) || [];

    const eventsList = document.getElementById('events-list');
    if (eventsList) {
        loadEvents();
    }

    const createEventForm = document.getElementById('create-event-form');
    if (createEventForm) {
        createEventForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const newEvent = {
                id: events.length + 1,
                name: document.getElementById('event-name').value,
                date: document.getElementById('event-date').value,
                time: document.getElementById('event-time').value,
                location: document.getElementById('event-location').value,
                description: document.getElementById('event-description').value
            };
            events.push(newEvent);
            saveEvents();
            alert('Event created!');
            createEventForm.reset();
        });
    }

    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function (event) {
            event.preventDefault();
            alert('Feedback submitted!');
            feedbackForm.reset();
        });
    }

    function loadEvents() {
        eventsList.innerHTML = '';
        events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event-item');
            eventItem.innerHTML = `
                <h3>${event.name}</h3>
                <p class="event-date-time">${event.date} at ${event.time}</p>
                <p class="event-location">${event.location}</p>
                <p class="event-description">${event.description}</p>
                <button class="delete-button">Delete</button>
            `;
            eventsList.appendChild(eventItem);

            const deleteButton = eventItem.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => {
                events = events.filter(e => e.id !== event.id);
                saveEvents();
                loadEvents();
            });
        });
    }

    function saveEvents() {
        localStorage.setItem('events', JSON.stringify(events));
    }
});