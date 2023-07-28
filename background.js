chrome.runtime.onInstalled.addListener(() => {
    // Initialization: Set an empty string as the initial value for blockedWords
    chrome.storage.local.set({ "blockedWords": " " });
  });
  