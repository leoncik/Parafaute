const inclusive = [

    //  Structure :
    // [/faute/]: "correction",

    // TYPOGRAPHIE
    [/\(e\)/, ""],
    [/\(se\)/, ""],
    [/\(euse\)/, ""],
    // Enlève ce qui suit un point médian jusqu'à rencontrer un espace.
    // Possibilité de refacto les variantes du point avec "|"
    [/(?=·).*?(?=\s)/, ""],
    [/(?=⋅).*?(?=\s)/, ""],
    [/(?=\.).*?(?=\s)/, ""],

    // VOCABULAIRE DIVERS
    // *** I ***
    [/\sIel\s/, " Il "],
    [/\siel\s/, " il "],

    // PROFESSIONS
    [/Développeur \/ Développeuse/, "Développeur"],
    [/développeurs et de développeuses/, "développeurs"],
    [/développeuses et développeurs/, "développeurs"],
    // ! Voir possibilité de faire un regex type : "racine profession + terminaison euse / racine profession + terminaison eur"
    // ! Possibilité de conflit avec des couples sans rapport avec l'écriture inclusive comme : "Mitrailleuse / Chargeur"
    
    // EXPRESSIONS
    [/à tous et à toutes/, "à tous"],
    [/à tous et toutes/, "à tous"],
    [/à toutes et tous/, "à tous"],
    [/à toutes et tous,/, "à tous"],
    [/à toutes et à tous/, "à tous"],

];


//  Ancien test
// const inclusive = {

    //  Structure :
    // "faute": "correction",

//     "\(e\)": "",
//     "\b\w*[·]\w*\b": "REMPLACEMENT",
// }
