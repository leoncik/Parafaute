chrome.tabs.onActivated.addListener((activeInfo) => {
  updateBadgeForTab(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    updateBadgeForTab(tabId);
  }
});

function updateBadgeForTab(tabId) {
  chrome.tabs.sendMessage(tabId, { action: "getCount" }, (response) => {
    if (chrome.runtime.lastError) {
      // Handle potential errors, for example if the content script is not ready
      updateBadge(0);
    } else if (response && response.count !== undefined) {
      updateBadge(response.count);
    }
  });
}

function updateBadge(count) {
  chrome.action.setBadgeText({ text: count > 0 ? count.toString() : "" });
  chrome.action.setBadgeBackgroundColor({ color: "#acacac" });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateBadge") {
    updateBadge(message.count);
  }
});
