// Input elements
const anglicismesInput = document.getElementById("anglicismes");
const inclusiveInput = document.getElementById("inclusive");
const fautesCourantesInput = document.getElementById("fautes-courantes");
const fautesTypographiquesInput = document.getElementById(
  "fautes-typographiques",
);
const reforme1990Input = document.getElementById("reforme-1990");
const extensionScopeInput = document.getElementById("extension-scope");

// Radio buttons for reforme1990 mode
const reformeClassiqueInput = document.getElementById("reforme-classique");
const reformeNouvelleInput = document.getElementById("reforme-nouvelle");
const reformeSuboptions = document.getElementById("reforme-suboptions");

// Toggle sub-options visibility based on reforme1990 state
function updateReformeSuboptionsVisibility(isEnabled) {
  if (isEnabled) {
    reformeSuboptions.classList.remove("hidden");
  } else {
    reformeSuboptions.classList.add("hidden");
  }
}

// Initialize the options with the user's option settings
chrome.storage.sync.get(
  [
    "anglicismes",
    "inclusive",
    "fautesCourantes",
    "fautesTypographiques",
    "reforme1990",
    "reforme1990Mode",
    "extensionScope",
  ],
  function (options) {
    // Set default options if chrome storage data does not exist and check popup checkboxes accordingly.
    if (Object.keys(options).length === 0) {
      chrome.storage.sync.set({ fautesCourantes: true });
      chrome.storage.sync.set({ anglicismes: true });
      chrome.storage.sync.set({ inclusive: true });
      chrome.storage.sync.set({ fautesTypographiques: false });
      chrome.storage.sync.set({ reforme1990: false });
      chrome.storage.sync.set({ reforme1990Mode: "classique" });
      chrome.storage.sync.set({ extensionScope: false });

      anglicismesInput.checked = true;
      inclusiveInput.checked = true;
      fautesCourantesInput.checked = true;
      fautesTypographiquesInput.checked = false;
      reforme1990Input.checked = false;
      reformeClassiqueInput.checked = true;
      reformeNouvelleInput.checked = false;
      extensionScopeInput.checked = false;
      updateReformeSuboptionsVisibility(false);
    } else {
      // Check or uncheck options from popup according to user choices retrieved from storage
      anglicismesInput.checked = options.anglicismes ?? true;
      inclusiveInput.checked = options.inclusive ?? true;
      fautesCourantesInput.checked = options.fautesCourantes ?? true;
      fautesTypographiquesInput.checked = options.fautesTypographiques ?? false;
      reforme1990Input.checked = options.reforme1990 ?? false;
      extensionScopeInput.checked = options.extensionScope ?? false;

      // Set reforme1990 mode radio buttons
      const mode = options.reforme1990Mode ?? "classique";
      if (mode === "nouvelle") {
        reformeNouvelleInput.checked = true;
        reformeClassiqueInput.checked = false;
      } else {
        reformeClassiqueInput.checked = true;
        reformeNouvelleInput.checked = false;
      }

      // Update sub-options visibility
      updateReformeSuboptionsVisibility(options.reforme1990 ?? false);
    }
  },
);

// Set options on input change
anglicismesInput.addEventListener("input", () => {
  chrome.storage.sync.set({ anglicismes: anglicismesInput.checked });
});

inclusiveInput.addEventListener("input", () => {
  chrome.storage.sync.set({ inclusive: inclusiveInput.checked });
});

fautesCourantesInput.addEventListener("input", () => {
  chrome.storage.sync.set({ fautesCourantes: fautesCourantesInput.checked });
});

fautesTypographiquesInput.addEventListener("input", () => {
  chrome.storage.sync.set({
    fautesTypographiques: fautesTypographiquesInput.checked,
  });
});

reforme1990Input.addEventListener("input", () => {
  const activated = reforme1990Input.checked;
  updateReformeSuboptionsVisibility(activated);
  chrome.storage.sync.set({ reforme1990: activated });
});

// Radio button handlers for reforme1990 mode
reformeClassiqueInput.addEventListener("change", () => {
  if (reformeClassiqueInput.checked) {
    chrome.storage.sync.set({ reforme1990Mode: "classique" });
  }
});

reformeNouvelleInput.addEventListener("change", () => {
  if (reformeNouvelleInput.checked) {
    chrome.storage.sync.set({ reforme1990Mode: "nouvelle" });
  }
});

extensionScopeInput.addEventListener("input", () => {
  chrome.storage.sync.set({ extensionScope: extensionScopeInput.checked });
});
