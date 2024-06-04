console.log("Content script injected");

// Example: Log the product title
const productTitle = document.querySelector('.product-title');
console.log("Product Title:", productTitle.textContent);

// Send a message to the background script to indicate that the content script has been injected
chrome.runtime.sendMessage({ message: "Content script injected" });
