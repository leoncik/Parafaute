const fautesCourantes = [

    //  Structure :
    // [/faute/]: "correction",
    
    // VOCABULAIRE

    // *** B ***
    [/banquaire/g, "bancaire"],

    // *** C ***
    [/cauchemard\b/g, "cauchemar"],

    // *** D ***
    [/disfonctionnement/g, "dysfonctionnement"],

    // *** P ***
    [/parmis/g, "parmi"],
    [/Parmis/g, "Parmi"],
    [/pillule/g, "pilule"],

    // *** J ***
    [/des jeux vidéos/g, "des jeux vidéo"],
    [/les jeux vidéos/g, "les jeux vidéo"],
    [/ces jeux vidéos/g, "les jeux vidéo"],

    // *** L ***
    [/langage/g, "language"],

    // *** M ***
    [/magazin\b/g, "magasin"],

    // *** S ***
    [/syphon/g, "siphon"],
    
    // EXPRESSIONS
    [/sa va\b/g, "ça va"],
    [/Sa va\b/g, "Ça va"],

    // TYPOGRAPHIE
    // (Enlever les espaces avant les points et les doubles espaces)
    // [/ ./g, "."],
    // [/  /g, " "],
]
