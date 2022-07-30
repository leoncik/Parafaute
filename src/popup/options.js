// Input elements
const anglicismesInput = document.getElementById('anglicismes');
const inclusiveInput = document.getElementById('inclusive');
const fautesCourantesInput = document.getElementById('fautes-courantes');
const extensionScopeInput = document.getElementById('extension-scope');

// Reload button
const reloadTabButton = document.querySelector('.reload-tab-button');

// Initialize the options with the user's option settings
chrome.storage.sync.get([
  'anglicismes',
  'inclusive',
  'fautesCourantes',
  'extensionScope'
], function(option) {
  console.log("list of options:", option);
  (option.anglicismes) ? anglicismesInput.checked = true : anglicismesInput.checked = false;
  (option.inclusive) ? inclusiveInput.checked = true : inclusiveInput.checked = false;
  (option.fautesCourantes) ? fautesCourantesInput.checked = true : fautesCourantesInput.checked = false;
  (option.extensionScope) ? extensionScopeInput.checked = true : extensionScopeInput.checked = false;
});

// Set options on input change
anglicismesInput.addEventListener("input", () => {
  reloadTabButton.classList.contains('hidden') && reloadTabButton.classList.remove('hidden');
  if (anglicismesInput.checked) {
    chrome.storage.sync.set({'anglicismes': true});
  } else {
    chrome.storage.sync.set({'anglicismes': false});
  }
})

inclusiveInput.addEventListener("input", () => {
  reloadTabButton.classList.contains('hidden') && reloadTabButton.classList.remove('hidden');
  if (inclusiveInput.checked) {
    chrome.storage.sync.set({'inclusive': true});
  } else {
    chrome.storage.sync.set({'inclusive': false});
  }
})

fautesCourantesInput.addEventListener("input", () => {
  reloadTabButton.classList.contains('hidden') && reloadTabButton.classList.remove('hidden');
  if (fautesCourantesInput.checked) {
    chrome.storage.sync.set({'fautesCourantes': true});
  } else {
    chrome.storage.sync.set({'fautesCourantes': false});
  }
})

extensionScopeInput.addEventListener("input", () => {
  reloadTabButton.classList.contains('hidden') && reloadTabButton.classList.remove('hidden');
  if (extensionScopeInput.checked) {
    chrome.storage.sync.set({'extensionScope': true});
  } else {
    chrome.storage.sync.set({'extensionScope': false});
  }
})

// Button to reload current tab in order to activate changed settings
const reloadMainTab = () => {
  reloadTabButton.classList.add('hidden');
  chrome.tabs.reload();
}
reloadTabButton.addEventListener('click', reloadMainTab);