// Sample JSON data URL, you can replace it with the actual URL.
const jsonDataUrl = 'https://raw.githubusercontent.com/RantuchoM/cse121b/main/jsons/json.json';

// Fetch data from the JSON URL and populate the dropdown.
fetch(jsonDataUrl)
    .then(response => response.json())
    .then(data => {
        const ensembleDropdown = document.getElementById('ensembleDropdown');
        const agendaList = document.getElementById('agendaList');

        // Populate the dropdown with ensemble names from JSON data.
        data.ensembles.forEach(ensemble => {
            const option = document.createElement('option');
            option.value = ensemble.name;
            option.textContent = ensemble.name;
            ensembleDropdown.appendChild(option);
        });

        // Handle dropdown change event.
        ensembleDropdown.addEventListener('change', () => {
            const selectedEnsemble = ensembleDropdown.value;

            // Clear the previous agenda.
            agendaList.innerHTML = '';

            // Filter and display events for the selected ensemble.
            data.events.forEach(event => {
                if (event.ensembles.includes(selectedEnsemble)) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${event.date}: ${event.startTime} - ${event.endTime}, ${event.location}, Conductor: ${event.conductor}, Repertoire: ${event.repertoire}`;
                    agendaList.appendChild(listItem);
                }
            });
        });
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });
