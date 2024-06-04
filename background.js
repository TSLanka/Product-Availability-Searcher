chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkAvailability") {
        // Your background logic to handle availability checking
        console.log("Background script checking availability...");
        sendResponse({ success: true });
    }
});
