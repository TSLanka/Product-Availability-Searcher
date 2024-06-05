document.addEventListener('DOMContentLoaded', function () {
    fetch(chrome.runtime.getURL('Croma Store List.csv'))
        .then(response => response.text())
        .then(text => {
            const data = parseCSV(text);
            populateStateDropdown(data);
        });

    document.getElementById('state-select').addEventListener('change', function () {
        const selectedState = this.value;
        fetch(chrome.runtime.getURL('Croma Store List.csv'))
            .then(response => response.text())
            .then(text => {
                const data = parseCSV(text);
                populateCityDropdown(data, selectedState);
            });
    });

    document.getElementById('check-availability').addEventListener('click', function () {
        const selectedState = document.getElementById('state-select').value;
        const selectedCity = document.getElementById('city-select').value;

        console.log('Selected State:', selectedState, 'Selected City:', selectedCity);

        if (!selectedState || !selectedCity) {
            document.getElementById('result').textContent = 'Please select both state and city.';
            return;
        }

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'checkAvailability',
                state: selectedState,
                city: selectedCity
            }, function (response) {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    document.getElementById('result').textContent = 'Failed to check availability.';
                } else if (response && response.success) {
                    document.getElementById('result').textContent = 'Check complete!';
                } else {
                    document.getElementById('result').textContent = 'Check failed.';
                }
            });
        });
    });
});

function parseCSV(text) {
    const lines = text.split('\n');
    const result = [];
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}

function populateStateDropdown(data) {
    const stateSet = new Set(data.map(item => item.State));
    const stateSelect = document.getElementById('state-select');
    stateSet.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
}

function populateCityDropdown(data, state) {
    const citySelect = document.getElementById('city-select');
    citySelect.innerHTML = '<option value="">Select a city</option>';
    const citySet = new Set(data.filter(item => item.State === state).map(item => item.City));
    citySet.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}
