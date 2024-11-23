const fautesTypographiques = [

    //  Structure :
    // [/faute/]: "correction",

    // Ajout d'espace fine insécable devant les signes de ponctuation double.
    // Exception : pas d'espace fine insécable devant "http" ou "https".
    [/(?<=\w)!/g, " !"],
    // Espace fine insécable si le point d'interrogation n'est pas suivi d'un mot
    // et s'il n'est pas précédé par un espace
    [/(?<=\w)\?(?!\w)/g, " ?"],
    [/(?<=\w(?<!http|https)):/gi, " :"],
    // Espace insécable pour les guillemets
    [/(?<=«) /g, " "], 
    [/ (?=»)/g, " "],
    // Pas d'espace avant une virgule ou un point.
    [/(?<=\w) ,/g, ","],
    [/(?<=\w) \./g, "."],
    // Apostrophe courbe
    [/(?<=\w)'/g, "’"],
    // Ligatures
    [/\bOe/g, "Œ"],
    [/\boe/g, "œ"],
    [/oeu\b/g, "œu"],
    [/oeur\b/g, "œur"],
    [/Oeuf\b/g, "Œuf"],
    [/oeuf\b/g, "œuf"],
    [/Oeil\b/g, "Œil"],
    [/oeil\b/g, "œil"],
    [/oenix\b/g, "œnix"],
    [/oetus\b/g, "œtus"],
    [/oeud\b/g, "œud"],

]
