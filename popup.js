document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('state-select');
    const citySelect = document.getElementById('city-select');
    const checkButton = document.getElementById('check-availability');
    const resultsDiv = document.getElementById('results');
  
    // Fetch and populate states
    fetch('path/to/states.json')
      .then(response => response.json())
      .then(data => {
        data.states.forEach(state => {
          let option = document.createElement('option');
          option.value = state.id;
          option.textContent = state.name;
          stateSelect.appendChild(option);
        });
      });
  
    // Populate cities based on selected state
    stateSelect.addEventListener('change', function() {
      citySelect.innerHTML = '';
      fetch(`path/to/cities/${this.value}.json`)
        .then(response => response.json())
        .then(data => {
          data.cities.forEach(city => {
            let option = document.createElement('option');
            option.value = city.id;
            option.textContent = city.name;
            citySelect.appendChild(option);
          });
        });
    });
  
    // Check product availability
    checkButton.addEventListener('click', function() {
      const selectedCities = Array.from(citySelect.selectedOptions).map(option => option.value);
      checkProductAvailability(selectedCities);
    });
  
    function checkProductAvailability(cities) {
      resultsDiv.innerHTML = '';
      cities.forEach(city => {
        fetch(`https://www.croma.com/api/check_availability?city=${city}`)
          .then(response => response.json())
          .then(data => {
            let cityResult = document.createElement('div');
            cityResult.textContent = `${city}: ${data.availability}`;
            resultsDiv.appendChild(cityResult);
          });
      });
    }
  });
  