// Use the JSON data URL you provided
const jsonDataUrl = 'https://raw.githubusercontent.com/RantuchoM/cse121b/main/jsons/json.json';

const ensembleDropdown = document.getElementById('ensembleDropdown');
const agendaList = document.getElementById('agendaList');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');

// Fetch the JSON data
fetch(jsonDataUrl)
    .then((response) => response.json())
    .then((data) => {
        // Populate the ensemble dropdown with options
        data.ensembles.forEach((ensemble) => {
            const option = document.createElement('option');
            option.value = ensemble.name;
            option.textContent = ensemble.name;
            ensembleDropdown.appendChild(option);
        });

        // Function to filter and display events
        function filterAndDisplayEvents() {
            const selectedEnsemble = ensembleDropdown.value;
            const startDate = new Date(startDateInput.value + 'T00:00'); // Convert to Date object and set time to midnight
            const endDate = new Date(endDateInput.value + 'T23:59'); // Convert to Date object and set time to the end of the day

            // Clear the previous agenda.
            agendaList.innerHTML = '';

            // Create an array to store the ensembles to filter for this selection.
            const ensemblesToDisplay = [selectedEnsemble];

            // Check if the selected ensemble has children.
            const ensembleData = data.ensembles.find(ensemble => ensemble.name === selectedEnsemble);
            if (ensembleData && ensembleData.children) {
                ensemblesToDisplay.push(...ensembleData.children);
            }

            // Filter and display events for the selected ensembles and within the date range.
            data.events.forEach(event => {
                const eventDate = new Date(event.date + 'T' + event.startTime);
                if (
                    eventDate >= startDate &&
                    eventDate <= endDate &&
                    event.ensembles.some(ensemble => ensemblesToDisplay.includes(ensemble))
                ) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${event.date}: ${event.startTime} - ${event.endTime}, ${event.location}, Conductor: ${event.conductor}, Repertoire: ${event.repertoire}`;
                    agendaList.appendChild(listItem);
                }
            });
        }

        // Add event listeners to handle dropdown and date input changes
        ensembleDropdown.addEventListener('change', filterAndDisplayEvents);
        startDateInput.addEventListener('input', filterAndDisplayEvents);
        endDateInput.addEventListener('input', filterAndDisplayEvents);

        // Initially display events based on default selections
        filterAndDisplayEvents();
    })
    .catch((error) => {
        console.error('Error fetching JSON data:', error);
    });
