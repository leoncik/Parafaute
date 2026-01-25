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

// Function to update the stats grid with current counts
function updateStatsGrid() {
  chrome.runtime.sendMessage(
    { action: "getDetailedCount" },
    function (response) {
      if (response && response.counts) {
        document.getElementById("inclusive-count").textContent =
          response.counts.inclusive || 0;
        document.getElementById("anglicismes-count").textContent =
          response.counts.anglicismes || 0;
        document.getElementById("fautesCourantes-count").textContent =
          response.counts.fautesCourantes || 0;
        document.getElementById("fautesTypographiques-count").textContent =
          response.counts.fautesTypographiques || 0;
        document.getElementById("reforme1990-count").textContent =
          response.counts.reforme1990 || 0;

        let totalCount = Object.values(response.counts).reduce(
          (sum, count) => sum + count,
          0,
        );
        document.getElementById("total").textContent = totalCount;
      }
    },
  );
}

// Function to send settings change message to active tab's content script via service worker
function notifyContentScript(filterName, activated) {
  chrome.runtime.sendMessage(
    {
      action: "forwardToContentScript",
      filterName: filterName,
      activated: activated,
    },
    (response) => {
      // Handle errors gracefully (e.g., content script not loaded)
      if (chrome.runtime.lastError) {
        // Content script may not be loaded yet, which is fine
        console.log("Service worker not ready:", chrome.runtime.lastError);
      }
      // Update stats grid after a small delay to allow content script to process
      setTimeout(updateStatsGrid, 200);
    },
  );
}

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
  const activated = anglicismesInput.checked;
  chrome.storage.sync.set({ anglicismes: activated }, () => {
    notifyContentScript("anglicismes", activated);
  });
});

inclusiveInput.addEventListener("input", () => {
  const activated = inclusiveInput.checked;
  chrome.storage.sync.set({ inclusive: activated }, () => {
    notifyContentScript("inclusive", activated);
  });
});

fautesCourantesInput.addEventListener("input", () => {
  const activated = fautesCourantesInput.checked;
  chrome.storage.sync.set({ fautesCourantes: activated }, () => {
    notifyContentScript("fautesCourantes", activated);
  });
});

fautesTypographiquesInput.addEventListener("input", () => {
  const activated = fautesTypographiquesInput.checked;
  chrome.storage.sync.set({ fautesTypographiques: activated }, () => {
    notifyContentScript("fautesTypographiques", activated);
  });
});

reforme1990Input.addEventListener("input", () => {
  const activated = reforme1990Input.checked;
  updateReformeSuboptionsVisibility(activated);
  chrome.storage.sync.set({ reforme1990: activated }, () => {
    notifyContentScript("reforme1990", activated);
  });
});

// Radio button handlers for reforme1990 mode
reformeClassiqueInput.addEventListener("change", () => {
  if (reformeClassiqueInput.checked) {
    chrome.storage.sync.set({ reforme1990Mode: "classique" }, () => {
      notifyContentScript("reforme1990Mode", "classique");
    });
  }
});

reformeNouvelleInput.addEventListener("change", () => {
  if (reformeNouvelleInput.checked) {
    chrome.storage.sync.set({ reforme1990Mode: "nouvelle" }, () => {
      notifyContentScript("reforme1990Mode", "nouvelle");
    });
  }
});

extensionScopeInput.addEventListener("input", () => {
  const activated = extensionScopeInput.checked;
  chrome.storage.sync.set({ extensionScope: activated }, () => {
    notifyContentScript("extensionScope", activated);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  updateStatsGrid();
});
