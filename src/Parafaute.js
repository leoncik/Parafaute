let replacementCounts = {
  inclusive: 0,
  anglicismes: 0,
  fautesCourantes: 0,
  fautesTypographiques: 0,
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getCount") {
    sendResponse({ counts: replacementCounts });
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
  chrome.runtime.sendMessage({
    action: "updateBadge",
    counts: replacementCounts,
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
    function replaceText(text, replacements, category) {
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
        replacementCounts[category] += localCount;
        updateBadge();
      }
      return newText;
    }

    const textObserverCallback = (text) => {
      let newText = text;
      if (checkedOptions.inclusive) {
        newText = replaceText(newText, inclusive, "inclusive");
      }
      if (checkedOptions.anglicismes) {
        newText = replaceText(newText, anglicismes, "anglicismes");
      }
      if (checkedOptions.fautesCourantes) {
        newText = replaceText(newText, fautesCourantes, "fautesCourantes");
      }
      if (checkedOptions.fautesTypographiques) {
        newText = replaceText(
          newText,
          fautesTypographiques,
          "fautesTypographiques"
        );
      }
      return newText;
    };

    if (
      checkedOptions.extensionScope ||
      document
        .querySelector("html")
        .getAttribute("lang")
        .match(/\bfr[-]?/)
    ) {
      const observer = new TextObserver(textObserverCallback);
    }

    window.addEventListener("beforeunload", () => {
      replacementCounts = {
        inclusive: 0,
        anglicismes: 0,
        fautesCourantes: 0,
        fautesTypographiques: 0,
      };
      updateBadge();
    });
  }
);
