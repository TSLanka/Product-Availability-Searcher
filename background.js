// background.js
chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked");
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['contentscript.js']
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkAvailability") {
    console.log("Received checkAvailability request");
    // Your background logic to handle availability checking
    sendResponse({ success: true });
  }
});
