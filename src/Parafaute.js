let pageReplacementCount = 0;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getCount") {
    sendResponse({ count: pageReplacementCount });
  }
});

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
      for (let [faute, correction] of replacements) {
        let regex = new RegExp(faute, "g");
        let matches = newText.match(regex);
        if (matches) {
          pageReplacementCount += matches.length;
          newText = newText.replace(regex, correction);
        }
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

    // Trigger extension on every page (if extensionScope option is activated)
    if (checkedOptions.extensionScope) {
      const observer = new TextObserver(textObserverCallback);
    }
    // Trigger extension only if the page is in french (default)
    else if (
      document
        .querySelector("html")
        .getAttribute("lang")
        .match(/\bfr[-]?/)
    ) {
      const observer = new TextObserver(textObserverCallback);
    }
  }
);
