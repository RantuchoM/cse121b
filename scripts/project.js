// Use the JSON data URL you provided
const jsonDataUrl = 'https://raw.githubusercontent.com/RantuchoM/cse121b/main/jsons/json.json';

const ensembleCheckboxes = document.getElementById('ensembleCheckboxes');
const agendaList = document.getElementById('agendaList');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const checkAllButton = document.getElementById('checkAllButton');
const uncheckAllButton = document.getElementById('uncheckAllButton');
const filterButton = document.getElementById('filterButton');

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

    // Filter and display events for the selected ensembles and within the date range.
    data.events.forEach(event => {
        const eventDate = new Date(event.date + 'T' + event.startTime);
        const isDateInRange = (!startDate || eventDate >= startDate) && (!endDate || eventDate <= endDate);
        if (isDateInRange && event.ensembles.some(ensemble => ensemblesToDisplay.includes(ensemble))) {
            const listItem = document.createElement('li');

            // Event location formatted as a header
            listItem.innerHTML = `<b>${event.location.toUpperCase()}</b><br>`;

            // Date formatted as "dd month yyyy"
            listItem.innerHTML += formatDate(event.date) + ' - ' + formatTime(event.startTime, event.endTime) + '<br>';
            listItem.innerHTML += `CONDUCTOR: ${event.conductor}<br>`;
            listItem.innerHTML += `REPERTOIRE: ${event.repertoire}`;
            
            agendaList.appendChild(listItem);
            agendaList.appendChild(createSeparator());
        }
    });
}

// Fetch the JSON data
fetch(jsonDataUrl)
    .then((response) => response.json())
    .then((jsonData) => {
        data = jsonData; // Store the JSON data for filtering

        // Create checkboxes for ensembles and add to the page
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

        // Add triggers to checkboxes
        addTriggersToCheckboxes();

        // Add event listeners to handle button clicks and date input changes
        checkAllButton.addEventListener('click', checkAll);
        uncheckAllButton.addEventListener('click', uncheckAll);
        filterButton.addEventListener('click', filterAndDisplayEvents);
        startDateInput.addEventListener('input', filterAndDisplayEvents);
        endDateInput.addEventListener('input', filterAndDisplayEvents);

        // Initially display events based on default selections
        filterAndDisplayEvents();
    })
    .catch((error) => {
        console.error('Error fetching JSON data:', error);
    });
