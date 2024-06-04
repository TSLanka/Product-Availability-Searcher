chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'displayResults') {
      const results = JSON.parse(localStorage.getItem('results')) || {};
      results[message.city] = message.isAvailable;
      localStorage.setItem('results', JSON.stringify(results));
  
      // Open a new tab with the results
      chrome.tabs.create({ url: chrome.runtime.getURL('results.html') }, function(tab) {
        chrome.tabs.executeScript(tab.id, {
          code: 'displayResults();'
        });
      });
    }
  });
  