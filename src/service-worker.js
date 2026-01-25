let tabCounts = {};

browser.tabs.onActivated.addListener((activeInfo) => {
  updateBadgeForTab(activeInfo.tabId);
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
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

browser.tabs.onRemoved.addListener((tabId) => {
  delete tabCounts[tabId];
});

function updateBadgeForTab(tabId) {
  browser.tabs
    .sendMessage(tabId, { action: "getCount" })
    .then((response) => {
      if (response && response.counts) {
        updateBadge(response.counts, tabId);
      }
    })
    .catch(() => {
      // Content script not loaded yet, set zero counts
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
    });
}

function updateBadge(counts, tabId) {
  tabCounts[tabId] = counts;
  let totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);
  let badgeText = "";

  if (totalCount > 0) {
    badgeText = totalCount > 99 ? "99+" : totalCount.toString();
  }

  browser.browserAction.setBadgeText({
    text: badgeText,
    tabId: tabId,
  });
  browser.browserAction.setBadgeBackgroundColor({
    color: "#6B6E6F",
    tabId: tabId,
  });
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateBadge" && sender.tab) {
    updateBadge(message.counts, sender.tab.id);
  } else if (message.action === "getDetailedCount") {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
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
  } else if (message.action === "forwardToContentScript") {
    // Forward message from popup to active tab's content script
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs[0]) {
        browser.tabs
          .sendMessage(tabs[0].id, {
            action: "settingsChanged",
            filterName: message.filterName,
            activated: message.activated,
          })
          .then(() => {
            sendResponse({ success: true });
          })
          .catch((error) => {
            // Content script may not be loaded yet, which is fine
            console.log("Content script not ready:", error);
            sendResponse({ success: true });
          });
      } else {
        sendResponse({ success: false });
      }
    });
    // Indicates we will send a response asynchronously
    return true;
  }
});
