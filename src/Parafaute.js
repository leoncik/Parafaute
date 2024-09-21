let pageReplacementCount = 0;
let debounceTimeout = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getCount") {
    sendResponse({ count: pageReplacementCount });
  }
});

function debounce(func, wait) {
  return function (...args) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Debounce for 100ms to avoid too frequent updates
const updateBadge = debounce(() => {
  chrome.runtime.sendMessage({
    action: "updateBadge",
    count: pageReplacementCount,
  });
}, 100);

chrome.storage.sync.get(
  [
    "anglicismes",
    "inclusive",
    "fautesCourantes",
    "fautesTypographiques",
    "extensionScope",
  ],
  function (checkedOptions) {
    function replaceText(text, replacements) {
      let newText = text;
      let localCount = 0;
      for (let [faute, correction] of replacements) {
        let regex = new RegExp(faute, "g");
        newText = newText.replace(regex, (match) => {
          localCount++;
          return correction;
        });
      }
      if (localCount > 0) {
        pageReplacementCount += localCount;
        // Update badge after each set of replacements
        updateBadge();
      }
      return newText;
    }

    const textObserverCallback = (text) => {
      let newText = text;
      if (checkedOptions.inclusive) {
        newText = replaceText(newText, inclusive);
      }
      if (checkedOptions.anglicismes) {
        newText = replaceText(newText, anglicismes);
      }
      if (checkedOptions.fautesCourantes) {
        newText = replaceText(newText, fautesCourantes);
      }
      if (checkedOptions.fautesTypographiques) {
        newText = replaceText(newText, fautesTypographiques);
      }
      return newText;
    };

    // Trigger extension based on scope
    if (checkedOptions.extensionScope || document.querySelector("html").getAttribute("lang").match(/\bfr[-]?/)) {
      const observer = new TextObserver(textObserverCallback);
    }

    // Reset count when the page is unloaded
    window.addEventListener("beforeunload", () => {
      pageReplacementCount = 0;
      updateBadge();
    });
  }
);
