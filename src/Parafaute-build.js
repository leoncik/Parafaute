const inclusive = [

    //  Structure :
    // [/faute/]: "correction",

    // TYPOGRAPHIE
    [/\(e\)/, ""],
    [/\(se\)/, ""],
    [/\(euse\)/, ""],
    // Enlève ce qui suit un point médian jusqu'à rencontrer un espace.
    [/(?=·).*?(?=\s)/, ""],
    [/(?=⋅).*?(?=\s)/, ""],
    [/(?=\.).*?(?=\s)/, ""],

    // ⋅

    // VOCABULAIRE
    // *** I ***
    [/\sIel\s/, " Il "],
    [/\siel\s/, " il "],

    // PROFESSIONS
    [/Développeur \/ Développeuse/, "Développeur"],
    
    // EXPRESSIONS
    [/à tous et à toutes/, "à tous"],
    [/à tous et toutes/, "à tous"],
    [/à toutes et tous/, "à tous"],
    [/à toutes et tous,/, "à tous"],
    [/à toutes et à tous/, "à tous"],
];

const anglicismes = {

    //  Structure :
    // "faute": "correction",

    // *** C ***
    "Challenge": "Défi",
    "challenge": "défi",
    "Challenges": "Défis",
    "challenges": "défis",
    
    // *** H ***
    "Hello": "Salut",
    "hello": "salut",
    "Hello,": "Salut",
    "hello,": "salut",

    // *** T ***
    "team": 'équipe',
    "Team": 'Équipe',
    
    // Test
    // "Bonjour": "Chaviro"
}

const fautesCourantes = {

    //  Structure :
    // "faute": "correction",

    // *** B ***
    "banquaire": "bancaire",

    // *** C ***
    "cauchemard": "cauchemar",

    // *** D ***
    'disfonctionnement': 'dysfonctionnement',

    // *** P ***
    "parmis": "parmi",
    "Parmis": "parmi",
    "pillule": "pilule",

    // *** J ***
    "des jeux vidéos": "des jeux vidéo",
    "les jeux vidéos": "les jeux vidéo",
    "ces jeux vidéos": "les jeux vidéo",

    // *** L ***
    "langage": "language",

    // *** M ***
    "magazin": "magasin",

    // *** S ***
    "syphon": "siphon",

    // Divers
    " .": ".",
    "  ": " ",
}

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


