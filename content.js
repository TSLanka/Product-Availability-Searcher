chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkAvailability") {
        console.log('Content script received checkAvailability message', message);

        // Example logic to check product title as a placeholder for availability check
        const productTitle = document.querySelector('.product-title');
        if (productTitle) {
            console.log("Product Title found:", productTitle.textContent);
            sendResponse({ success: true });
        } else {
            console.log("Product title not found.");
            sendResponse({ success: false });
        }
    }
});
