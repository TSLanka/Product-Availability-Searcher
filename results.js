function displayResults() {
    const resultsList = document.getElementById('resultsList');
    const results = JSON.parse(localStorage.getItem('results')) || {};
  
    for (const city in results) {
      const listItem = document.createElement('li');
      listItem.textContent = `${city}: ${results[city] ? 'Available' : 'Not Available'}`;
      resultsList.appendChild(listItem);
    }
  }
  
  document.addEventListener('DOMContentLoaded', displayResults);

  