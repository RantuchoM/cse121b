// Use the JSON data URL you provided
const jsonDataUrl = 'https://raw.githubusercontent.com/RantuchoM/cse121b/main/jsons/json.json';

const ensembleCheckboxes = document.getElementById('ensembleCheckboxes');
const agendaList = document.getElementById('agendaList');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const checkAllButton = document.getElementById('checkAllButton');
const uncheckAllButton = document.getElementById('uncheckAllButton');
const filterButton = document.getElementById('filterButton');
const showRepertoireCheckbox = document.getElementById('showRepertoireCheckbox');

let data; // Store JSON data
let ensembleCheckboxesMap = {}; // Map to store ensemble checkboxes

// Function to add triggers to checkboxes
function addTriggersToCheckboxes() {
    Object.values(ensembleCheckboxesMap).forEach((checkbox) => {
        checkbox.addEventListener('change', filterAndDisplayEvents);
    });
}

// Function to check all checkboxes
function checkAll() {
    Object.values(ensembleCheckboxesMap).forEach((checkbox) => {
        checkbox.checked = true;
    });
    filterAndDisplayEvents(); // Trigger filtering
}

// Function to uncheck all checkboxes
function uncheckAll() {
    Object.values(ensembleCheckboxesMap).forEach((checkbox) => {
        checkbox.checked = false;
    });
    filterAndDisplayEvents(); // Trigger filtering
}

// Function to filter and display events
function filterAndDisplayEvents() {
    // Parse start and end dates or set to null if no value is provided
    const startDateValue = startDateInput.value;
    const endDateValue = endDateInput.value;
    const startDate = startDateValue ? new Date(startDateValue + 'T00:00') : null; // Convert to Date object and set time to midnight
    const endDate = endDateValue ? new Date(endDateValue + 'T23:59') : null; // Convert to Date object and set time to the end of the day

    // Clear the previous agenda.
    agendaList.innerHTML = '';

    // Create an array to store the ensembles to filter for this selection.
    const ensemblesToDisplay = Object.values(ensembleCheckboxesMap)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Function to format a date as "dd month yyyy"
    function formatDate(dateStr) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString(undefined, options);
    }

    // Function to format the time as "hh:mm - hh:mm hs"
    function formatTime(startTime, endTime) {
        return `${startTime} - ${endTime} hs`;
    }

    // Function to create a separator line
    function createSeparator() {
        return document.createElement('hr');
    }

    // Function to display concerts as cards
    function displayConcertCards(events) {
        events.forEach((event) => {
            const card = document.createElement('div');
            card.classList.add('concert-card');

            // Location and date
            const locationDate = document.createElement('p');
            locationDate.innerHTML = `<b class="location">${event.location.toUpperCase()}</b><br><br>${formatDate(event.date)} - ${formatTime(event.startTime, event.endTime)}`;
            card.appendChild(locationDate);

            // Conductor
            const conductor = document.createElement('p');
            conductor.innerHTML = `CONDUCTOR: ${event.conductor}`;
            card.appendChild(conductor);

            if (showRepertoireCheckbox.checked) {
                // Repertoire
                const repertoire = document.createElement('p');
                repertoire.innerHTML = `<span style="font-style: italic; text-decoration: underline;">REPERTOIRE</span>`;
                card.appendChild(repertoire);

                const repertoireContainer = displayRepertoire(event.repertoire);
                card.appendChild(repertoireContainer);
            }

            // Add the card to the agenda list
            agendaList.appendChild(card);
            //agendaList.appendChild(createSeparator());
        });
    }

    // Function to display repertoire as lines with minimal separation
    function displayRepertoire(repertoire) {
        const repertoireContainer = document.createElement('div');
        repertoireContainer.classList.add('repertoire-container');

        repertoire.forEach(piece => {
            const repertoireLine = document.createElement('span');
            repertoireLine.textContent = `♫ ${piece.composer} - ${piece.title}`;
            repertoireContainer.appendChild(repertoireLine);
            repertoireContainer.appendChild(document.createElement('br')); // Add a line break
        });

        return repertoireContainer;
    }

    // Filter and display events for the selected ensembles and within the date range.
    data.events.forEach(event => {
        const eventDate = new Date(event.date + 'T' + event.startTime);
        const isDateInRange = (!startDate || eventDate >= startDate) && (!endDate || eventDate <= endDate);
        if (isDateInRange && event.ensembles.some(ensemble => ensemblesToDisplay.includes(ensemble))) {
            displayConcertCards([event]);
        }
    });
}
// Function to display ensemble checkboxes
function displayEnsembleCheckboxes() {
    if (!data || !data.ensembles || data.ensembles.length === 0) {
        return; // Ensure data is available and has ensembles
    }

    data.ensembles.forEach((ensemble) => {
        const ensembleContainer = document.createElement('div');
        ensembleContainer.classList.add('ensemble-container');

        const label = document.createElement('label');
        label.setAttribute('for', ensemble.name);
        label.textContent = ensemble.name;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = ensemble.name;
        checkbox.value = ensemble.name;
        checkbox.classList.add('ensemble-checkbox');

        label.prepend(checkbox); // Place the checkbox inside the label

        ensembleContainer.appendChild(label);

        ensembleCheckboxes.appendChild(ensembleContainer);
        ensembleCheckboxesMap[ensemble.name] = checkbox;
    });
}
// Define an async function to fetch JSON data
async function fetchData() {
    try {
        const response = await fetch(jsonDataUrl);
        if (response.ok) {
            const jsonData = await response.json();
            return jsonData; // Return the JSON data
        } else {
            console.error('Failed to fetch JSON data');
            return null;
        }
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return null;
    }
}

// Define the async initialization function
async function initialize() {
    data = await fetchData(); // Wait for the JSON data to be fetched
    if (!data) {
        // Handle the case where data is not successfully fetched
        return;
    }

    displayEnsembleCheckboxes(); // Call your checkbox rendering function
    addTriggersToCheckboxes();

    // Add event listeners to handle button clicks, date input changes, and "Show Repertoire" checkbox change
    checkAllButton.addEventListener('click', checkAll);
    uncheckAllButton.addEventListener('click', uncheckAll);
    filterButton.addEventListener('click', filterAndDisplayEvents);
    startDateInput.addEventListener('input', filterAndDisplayEvents);
    endDateInput.addEventListener('input', filterAndDisplayEvents);
    showRepertoireCheckbox.addEventListener('change', filterAndDisplayEvents);

    // Initially display events based on default selections
    filterAndDisplayEvents();
}

initialize(); // Call the initialization function to start the process