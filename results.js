function displayResults() {
  const resultsList = document.querySelector('#resultsList');
  if (!resultsList) {
    console.error('Error: Cannot find resultsList element.');
    return;
  }

  chrome.storage.local.get('results', function(data) {
    const results = data.results || {};
    for (const city in results) {
      const listItem = document.createElement('li');
      listItem.textContent = `${city}: ${results[city] ? 'Available' : 'Not Available'}`;
      resultsList.appendChild(listItem);
    }
  });
}

document.addEventListener('DOMContentLoaded', displayResults);