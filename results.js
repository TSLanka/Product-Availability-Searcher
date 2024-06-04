chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'showResults') {
      const storeList = document.getElementById('storeList');
      message.results.forEach(store => {
        const li = document.createElement('li');
        li.textContent = store;
        storeList.appendChild(li);
      });
    }
  });
  