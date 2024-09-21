chrome.storage.sync.get(
  [
    "anglicismes",
    "inclusive",
    "fautesCourantes",
    "fautesTypographiques",
    "extensionScope",
  ],
  function (checkedOptions) {
    let replacementCount = 0;

    function replaceText(text, replacements) {
      let newText = text;
      for (let [faute, correction] of replacements) {
        let regex = new RegExp(faute, "g");
        let matches = newText.match(regex);
        if (matches) {
          replacementCount += matches.length;
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

      // Update the replacement count in storage
      chrome.storage.local.set({ replacementCount: replacementCount });

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
