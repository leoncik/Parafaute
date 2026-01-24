let tabCounts = {};

chrome.tabs.onActivated.addListener((activeInfo) => {
  updateBadgeForTab(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading") {
    // Reset counts immediately when navigation starts (more reliable than beforeunload)
    const zeroCounts = {
      inclusive: 0,
      anglicismes: 0,
      fautesCourantes: 0,
      fautesTypographiques: 0,
      reforme1990: 0,
    };
    updateBadge(zeroCounts, tabId);
  } else if (changeInfo.status === "complete") {
    updateBadgeForTab(tabId);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabCounts[tabId];
});

function updateBadgeForTab(tabId) {
  chrome.tabs.sendMessage(tabId, { action: "getCount" }, (response) => {
    if (chrome.runtime.lastError) {
      updateBadge(
        {
          inclusive: 0,
          anglicismes: 0,
          fautesCourantes: 0,
          fautesTypographiques: 0,
          reforme1990: 0,
        },
        tabId,
      );
    } else if (response && response.counts) {
      updateBadge(response.counts, tabId);
    }
  });
}

function updateBadge(counts, tabId) {
  tabCounts[tabId] = counts;
  let totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);
  let badgeText = "";

  if (totalCount > 0) {
    badgeText = totalCount > 99 ? "99+" : totalCount.toString();
  }

  chrome.action.setBadgeText({
    text: badgeText,
    tabId: tabId,
  });
  chrome.action.setBadgeBackgroundColor({ color: "#6B6E6F", tabId: tabId });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateBadge" && sender.tab) {
    updateBadge(message.counts, sender.tab.id);
  } else if (message.action === "getDetailedCount") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        sendResponse({
          counts: tabCounts[tabs[0].id] || {
            inclusive: 0,
            anglicismes: 0,
            fautesCourantes: 0,
            fautesTypographiques: 0,
            reforme1990: 0,
          },
        });
      } else {
        sendResponse({
          counts: {
            inclusive: 0,
            anglicismes: 0,
            fautesCourantes: 0,
            fautesTypographiques: 0,
            reforme1990: 0,
          },
        });
      }
    });
    // Indicates we will send a response asynchronously
    return true;
  }
});
