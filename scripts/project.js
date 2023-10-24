// Use the JSON data URL you provided
const jsonDataUrl = 'https://raw.githubusercontent.com/RantuchoM/cse121b/main/jsons/json.json';

const ensembleDropdown = document.getElementById('ensembleDropdown');
const agendaList = document.getElementById('agendaList');

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

        // Add an event listener to handle dropdown selection
        ensembleDropdown.addEventListener('change', () => {
            const selectedEnsemble = ensembleDropdown.value;

            // Clear the previous agenda.
            agendaList.innerHTML = '';

            // Create an array to store the ensembles to filter for this selection.
            const ensemblesToDisplay = [selectedEnsemble];

            // Check if the selected ensemble has children.
            const ensembleData = data.ensembles.find(ensemble => ensemble.name === selectedEnsemble);
            if (ensembleData && ensembleData.children) {
                ensemblesToDisplay.push(...ensembleData.children);
            }

            // Check if the selected ensemble has a parent.
            const parentEnsembleData = data.ensembles.find(ensemble => ensemble.children && ensemble.children.includes(selectedEnsemble));
            if (parentEnsembleData) {
                ensemblesToDisplay.push(parentEnsembleData.name);
            }

            // Filter and display events for the selected ensembles.
            data.events.forEach(event => {
                if (event.ensembles.some(ensemble => ensemblesToDisplay.includes(ensemble))) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${event.date}: ${event.startTime} - ${event.endTime}, ${event.location}, Conductor: ${event.conductor}, Repertoire: ${event.repertoire}`;
                    agendaList.appendChild(listItem);
                }
            });
        });
    })
    .catch((error) => {
        console.error('Error fetching JSON data:', error);
    });
