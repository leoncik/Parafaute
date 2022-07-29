// Todo : watch behaviour if no initial option.
chrome.storage.sync.get([
    'anglicismes',
    'inclusive',
    'fautesCourantes',
    'extensionScope'
], function(checkedOptions) {

    
    // Trigger extension on every page (if extensionScope option is activated)
    if (checkedOptions.extensionScope) {
        const observer = new TextObserver(text => {
            if (checkedOptions.inclusive) {
                for (let [faute, correction] of inclusive) {
                    text = text.replace(new RegExp(faute), correction);
                }
            }
            if (checkedOptions.anglicismes) {
                for(let [faute, correction] of anglicismes) {
                    text = text.replace(new RegExp(faute), correction);
                }
            }
            if (checkedOptions.fautesCourantes) {
                for(let [faute, correction] of fautesCourantes) {
                    text = text.replace(new RegExp(faute), correction);
                }
            }
    
            return text;
        });
    }
    // Trigger extension only if the page is in french (default)
    else if (document.querySelector('html').getAttribute('lang').match(/\bfr[-]?/)) {
        const observer = new TextObserver(text => {
            if (checkedOptions.inclusive) {
                for (let [faute, correction] of inclusive) {
                    text = text.replace(new RegExp(faute), correction);
                }
            }
            if (checkedOptions.anglicismes) {
                for(let [faute, correction] of anglicismes) {
                    text = text.replace(new RegExp(faute), correction);
                }
            }
            if (checkedOptions.fautesCourantes) {
                for(let [faute, correction] of fautesCourantes) {
                    text = text.replace(new RegExp(faute), correction);
                }
            }
    
            return text;
        });
    }
  });