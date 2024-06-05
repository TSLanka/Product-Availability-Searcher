chrome.runtime.onInstalled.addListener(() => {
  chrome.scripting.registerContentScript({
    id: 'contentScript',
    matches: ['http://*.croma.com/*', 'https://*.croma.com/*'],
    js: [{ file: 'contentScript.js' }],
    allFrames: true,
    runAt: 'document_idle',
  });
});