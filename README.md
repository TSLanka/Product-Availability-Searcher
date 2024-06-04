
---

# Product Availability Searcher

This Chrome extension allows users to check the availability of a product at different offline stores. The extension works specifically for the Croma website.

## Features

- Select a state and city to see product availability.
- Displays a list of offline stores where the product is available.

## Installation

1. Clone this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable Developer Mode.
4. Click on "Load unpacked" and select the directory where you cloned the repository.

## Usage

1. Visit a product page on the Croma website.
2. Click on the extension icon in the browser toolbar.
3. Select a state from the dropdown list.
4. Select a city from the secondary dropdown list.
5. The extension will display a list of offline stores where the product is available in the selected city.

## Development

### Files

- `manifest.json`: Contains the metadata of the extension including permissions and scripts.
- `background.js`: Handles background tasks like injecting content scripts.
- `content.js`: Contains logic to check availability on the Croma website.
- `contentscript.js`: Injects content script into the Croma website to interact with the DOM.
- `popup.js`: Handles interaction with the popup UI for state and city selection.
- `Croma Store List.csv`: CSV file containing store information for different cities.

### Debugging

- Use `console.log` statements in the content script, background script, and popup script to debug the extension.
- Use the developer tools in Chrome (`F12` or `Ctrl+Shift+I`) to inspect the background, content, and popup scripts.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---