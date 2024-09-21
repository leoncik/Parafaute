let tabCounts = {};

chrome.tabs.onActivated.addListener((activeInfo) => {
  updateBadgeForTab(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    updateBadgeForTab(tabId);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabCounts[tabId];
});

function updateBadgeForTab(tabId) {
  chrome.tabs.sendMessage(tabId, { action: "getCount" }, (response) => {
    if (chrome.runtime.lastError) {
      // Handle potential errors, for example if the content script is not ready
      updateBadge(0, tabId);
    } else if (response && response.count !== undefined) {
      updateBadge(response.count, tabId);
    }
  });
}

function updateBadge(count, tabId) {
  tabCounts[tabId] = count;
  chrome.action.setBadgeText({
    text: count > 0 ? count.toString() : "",
    tabId: tabId,
  });
  chrome.action.setBadgeBackgroundColor({ color: "#4688F1", tabId: tabId });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateBadge" && sender.tab) {
    updateBadge(message.count, sender.tab.id);
  }
});
