import { inclusive } from "./dictionnaires/inclusive.js";
import {anglicismes} from "./dictionnaires/anglicismes.js";
import { fautesCourantes } from "./dictionnaires/fautesCourantes.js";

// Replacement à partir des dictionnaires
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
