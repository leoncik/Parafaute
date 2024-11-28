// Input elements
const anglicismesInput = document.getElementById('anglicismes');
const inclusiveInput = document.getElementById('inclusive');
const fautesCourantesInput = document.getElementById('fautes-courantes');
const fautesTypographiquesInput = document.getElementById('fautes-typographiques');
const reforme1990Input = document.getElementById('reforme-1990');
const extensionScopeInput = document.getElementById('extension-scope');

// Initialize the options with the user's option settings
chrome.storage.sync.get([
  'anglicismes',
  'inclusive',
  'fautesCourantes',
  'fautesTypographiques',
  'reforme1990',
  'extensionScope'
], function(options) {

  // Set default options if chrome storage data does not exist and check popup checkboxes accordingly.
  if (Object.keys(options).length === 0) {
    chrome.storage.sync.set({'fautesCourantes': true});
    chrome.storage.sync.set({'anglicismes': true});
    chrome.storage.sync.set({'inclusive': true});
    chrome.storage.sync.set({'fautesTypographiques': false});
    chrome.storage.sync.set({'reforme1990': false});
    chrome.storage.sync.set({'extensionScope': false});

    anglicismesInput.checked = true;
    inclusiveInput.checked = true;
    fautesCourantesInput.checked = true;
    fautesTypographiquesInput.checked = false;
    reforme1990Input.checked = false;
    extensionScopeInput.checked = false;
  }

  // Check or uncheck options from popup according to user choices retrieved from storage
  if (Object.keys(options).length !== 0) {
    (options.anglicismes) ? anglicismesInput.checked = true : anglicismesInput.checked = false;
    (options.inclusive) ? inclusiveInput.checked = true : inclusiveInput.checked = false;
    (options.fautesCourantes) ? fautesCourantesInput.checked = true : fautesCourantesInput.checked = false;
    (options.fautesTypographiques) ? fautesTypographiquesInput.checked = true : fautesTypographiquesInput.checked = false;
    (options.reforme1990) ? reforme1990Input.checked = true : reforme1990Input.checked = false;
    (options.extensionScope) ? extensionScopeInput.checked = true : extensionScopeInput.checked = false;
  }
});

// Set options on input change
anglicismesInput.addEventListener("input", () => {
  if (anglicismesInput.checked) {
    chrome.storage.sync.set({'anglicismes': true});
  } else {
    chrome.storage.sync.set({'anglicismes': false});
  }
})

inclusiveInput.addEventListener("input", () => {
  if (inclusiveInput.checked) {
    chrome.storage.sync.set({'inclusive': true});
  } else {
    chrome.storage.sync.set({'inclusive': false});
  }
})

fautesCourantesInput.addEventListener("input", () => {
  if (fautesCourantesInput.checked) {
    chrome.storage.sync.set({'fautesCourantes': true});
  } else {
    chrome.storage.sync.set({'fautesCourantes': false});
  }
})

fautesTypographiques.addEventListener("input", () => {
  if (fautesTypographiques.checked) {
    chrome.storage.sync.set({'fautesTypographiques': true});
  } else {
    chrome.storage.sync.set({'fautesTypographiques': false});
  }
})

reforme1990Input.addEventListener("input", () => {
  if (reforme1990Input.checked) {
    chrome.storage.sync.set({'reforme1990': true});
  } else {
    chrome.storage.sync.set({'reforme1990': false});
  }
})

extensionScopeInput.addEventListener("input", () => {
  if (extensionScopeInput.checked) {
    chrome.storage.sync.set({'extensionScope': true});
  } else {
    chrome.storage.sync.set({'extensionScope': false});
  }
})