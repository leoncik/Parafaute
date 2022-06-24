// Replacement à partir des dictionnaires
// Todo : attention aux variantes de langue (fr-FR, etc.)
// if (document.querySelector('html').getAttribute('lang') === 'fr') {
    const observer = new TextObserver(text => {
        for (let [faute, correction] of inclusive) {
            text = text.replace(new RegExp(faute), correction);
        }
        for(let [faute, correction] of anglicismes) {
            text = text.replace(new RegExp(faute), correction);
        }
        for(let [faute, correction] of fautesCourantes) {
            text = text.replace(new RegExp(faute), correction);
        }
        return text;
    });
// }
