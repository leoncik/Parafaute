const fautesTypographiques = [

    //  Structure :
    // [/faute/]: "correction",
    
    // Ajout d'espace fine insécable devant les signes de ponctuation double.
    // Exception : pas d'espace fine insécable devant "http" ou "https".
    [/(?<=\w)!/g, " !"],
    [/(?<=\w)\?/g, " ?"],
    [/(?<=\w(?<!http|https)):/gi, " :"],
    // Espace insécable pour les guillemets
    [/(?<=«) /g, " "], 
    [/ (?=»)/g, " "],
    // Pas d'espace avant une virgule ou un point.
    [/(?<=\w) ,/g, ","],
    [/(?<=\w) \./g, "."],

]
