// Replacement à partir des dictionnaires
// Todo : attention aux variantes de langue (fr-FR, etc.)
if (document.querySelector('html').getAttribute('lang') === 'fr') {
    const observer = new TextObserver(text => {
        // for (let [faute, correction] of Object.entries(inclusive)) {
        //     text = text.replace(new RegExp(faute), correction);
        // }
        for (let [faute, correction] of inclusive) {
            text = text.replace(new RegExp(faute), correction);
        }
        for(let faute in anglicismes) {
            text = text.replace(faute, anglicismes[faute]);
        }
        for(let faute in fautesCourantes) {
            text = text.replace(faute, fautesCourantes[faute]);
        }
        return text;
    });
}
