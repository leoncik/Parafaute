let replacementCounts = {
  inclusive: 0,
  anglicismes: 0,
  fautesCourantes: 0,
  fautesTypographiques: 0,
  reforme1990: 0,
};

// Store current settings and observer instance globally
let currentSettings = null;
let textObserver = null;

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getCount") {
    sendResponse({ counts: replacementCounts });
  } else if (message.action === "settingsChanged") {
    // Re-read settings and reinitialize observer
    initializeObserver(message.activated || false);
    sendResponse({ success: true });
  }
});

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Debounce for 100ms to avoid too frequent updates
const updateBadge = debounce(() => {
  browser.runtime
    .sendMessage({
      action: "updateBadge",
      counts: replacementCounts,
    })
    .catch(() => {
      // Extension context may be invalidated, ignore errors
    });
}, 100);

function replaceText(text, replacements, category) {
  let newText = text;
  let localCount = 0;
  for (let [regex, correction] of replacements) {
    newText = newText.replace(regex, () => {
      localCount++;
      return correction;
    });
  }
  if (localCount > 0) {
    replacementCounts[category] += localCount;
    updateBadge();
  }
  return newText;
}

function createTextObserverCallback(checkedOptions) {
  return (text) => {
    let newText = text;
    if (checkedOptions.inclusive) {
      newText = replaceText(newText, inclusive, "inclusive");
    }
    if (checkedOptions.anglicismes) {
      newText = replaceText(newText, anglicismes, "anglicismes");
    }
    if (checkedOptions.reforme1990) {
      // Select the appropriate dictionary based on the mode
      const reforme1990Dict =
        checkedOptions.reforme1990Mode === "nouvelle"
          ? reforme1990ToNouvelle
          : reforme1990ToClassique;
      newText = replaceText(newText, reforme1990Dict, "reforme1990");
    }
    if (checkedOptions.fautesCourantes) {
      newText = replaceText(newText, fautesCourantes, "fautesCourantes");
    }
    if (checkedOptions.fautesTypographiques) {
      newText = replaceText(
        newText,
        fautesTypographiques,
        "fautesTypographiques",
      );
    }
    return newText;
  };
}

function initializeObserver(shouldReprocess = true) {
  browser.storage.sync
    .get([
      "anglicismes",
      "inclusive",
      "fautesCourantes",
      "fautesTypographiques",
      "reforme1990",
      "reforme1990Mode",
      "extensionScope",
    ])
    .then((checkedOptions) => {
      // Disconnect existing observer if it exists
      if (textObserver !== null) {
        textObserver.disconnect();
        textObserver = null;
      }

      // Store current settings
      currentSettings = checkedOptions;

      const textObserverCallback = createTextObserverCallback(checkedOptions);

      const lang = document.querySelector("html")?.getAttribute("lang") || "";
      if (checkedOptions.extensionScope || lang.match(/\bfr[-]?/)) {
        // If filter was activated, reprocess entire page; if deactivated, only update callback
        textObserver = new TextObserver(
          textObserverCallback,
          document,
          shouldReprocess,
        );
      }
    });
}

// Initialize on page load
initializeObserver(true);
