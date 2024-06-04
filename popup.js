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
