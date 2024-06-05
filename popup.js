document.addEventListener('DOMContentLoaded', function() {
  const stateSelect = document.querySelector('#stateSelect');
  const citySelect = document.querySelector('#citySelect');
  const checkAvailabilityButton = document.querySelector('#checkAvailabilityButton');

  if (!stateSelect || !citySelect || !checkAvailabilityButton) {
    console.error('Error: Cannot find required elements.');
    return;
  }

  let storeData = [];

  function parseCSV(text) {
    const rows = text.split('\n');
    return rows.map(row => {
      const [state, city, pincode, storeName] = row.split(',');
      return { "State": state, "City": city, "Pincode": pincode, "Store Name": storeName };
    });
  }

  function createOption(value) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    return option;
  }

  fetch(chrome.runtime.getURL('New Croma Store List.csv'))
    .then(response => response.text())
    .then(text => {
      storeData = parseCSV(text);
      const states = [...new Set(storeData.map(item => item['State']))];

      states.forEach(state => stateSelect.appendChild(createOption(state)));
    })
    .catch(error => console.error('Error loading CSV file:', error));

  stateSelect.addEventListener('change', function() {
    citySelect.innerHTML = '';
    const selectedStates = Array.from(stateSelect.selectedOptions).map(option => option.value);
    const cities = storeData
      .filter(item => selectedStates.includes(item['State']))
      .map(item => item['City']);

    [...new Set(cities)].forEach(city => citySelect.appendChild(createOption(city)));
  });

  checkAvailabilityButton.addEventListener('click', function() {
    const selectedCities = Array.from(citySelect.selectedOptions).map(option => option.value);
    if (selectedCities.length > 0) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'checkAvailability', cities: selectedCities });
      });
    } else {
      alert('Please select at least one city.');
    }
  });
});