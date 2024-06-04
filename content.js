chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkAvailability") {
        // Your logic to check availability on the Croma website
        console.log("Checking availability...");
        sendResponse({ success: true });
    }
});
