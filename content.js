chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'checkAvailability') {
      const cities = message.cities;
  
      // Logic to check availability for each city using content script injection
      cities.forEach(city => {
        // Example: Perform a search or fetch request to Croma's website
        fetch(`https://www.croma.com/search?q=product&city=${city}`)
          .then(response => response.text())
          .then(data => {
            // Parse and check availability in the returned data
            const isAvailable = data.includes('In Stock'); // Example check
            chrome.runtime.sendMessage({
              action: 'displayResults',
              city: city,
              isAvailable: isAvailable
            });
          })
          .catch(error => console.error('Error:', error));
      });
    }
  });
  