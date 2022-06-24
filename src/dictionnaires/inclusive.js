const inclusive = [

    //  Structure :
    // [/faute/]: "correction",

    // TYPOGRAPHIE
    // Possibilité de reconstruire le pluriel si la dernière lettre suivant le point est un "s"
    // Note : le /g final est important !
    [/\(e\)/gi, ""],
    [/\(se\)/gi, ""],
    [/\(euse\)/gi, ""],


    // [/(·|·|·|.)e/, ""],


    [/[·|·|·|.]e[·|·|·|.]s/gi, ""],
    [/[·|·|·|.]rice[·|·|·|.]s/gi, ""],
    [/[·|·|·|.]ne[·|·|·|.]s/gi, ""],
    [/[·|·|·|.]le[·|·|·|.]s/gi, ""],
    [/[·|·|·|.]e/gi, ""],



    // VOCABULAIRE DIVERS
    // *** A ***
    [/Autrice/g, "Auteur"],
    [/autrice/g, "auteur"],


    // *** I ***
    [/\sIel\s/g, " Il "],
    [/\siel\s/g, " il "],

    // PROFESSIONS
    [/Développeur \/ Développeuse/g, "Développeur"],
    [/développeurs et de développeuses/g, "développeurs"],
    [/développeuses et développeurs/g, "développeurs"],
    [/développeuses et de développeurs/g, "développeurs"],
    [/le développeur ou la développeuse/g, "le développeur"],
    [/la développeuse ou le développeur/g, "le développeur"],
    // développeuses et de développeurs
    // ! Voir possibilité de faire un regex type : "racine profession + terminaison euse / racine profession + terminaison eur"
    // ! Possibilité de conflit avec des couples sans rapport avec l'écriture inclusive comme : "Mitrailleuse / Chargeur"
    [/un utilisateur ou une utilisatrice/g, "un utilisateur"],
    [/une utilisatrice ou un utilisateur/g, "un utilisateur"],
    [/utilisateurs et utilisatrices/g, "utilisateurs"],
    [/utilisatrices et utilisateurs/g, "utilisateurs"],
    // Regex globaux
    [/euses\b et [a-zA-Z]*eurs\b/g, "utilisateurs"],
    [/euses\b et [a-zA-Z]*eurs\b/g, "utilisateurs"],
    
    // EXPRESSIONS
    [/à tous et à toutes/g, "à tous"],
    [/à tous et toutes/g, "à tous"],
    [/à toutes et tous/g, "à tous"],
    [/à toutes et tous,/g, "à tous"],
    [/à toutes et à tous/g, "à tous"],
    // Avec erreurs d'orthographe :
    [/à toute et à tous/g, "à tous"],    

];


//  Ancien test
// const inclusive = {

    //  Structure :
    // "faute": "correction",

//     "\(e\)": "",
//     "\b\w*[·]\w*\b": "REMPLACEMENT",
// }

// Anciens Regex
    // [/(?=·e·s).*?(?=[ ,\s]|$)/, ""],
    // [/(?=·e·s).*?(?=[ ,\s]|$)/, ""],
    // [/(?=·rice·s).*?(?=[ ,\s]|$)/, ""],

    // [/(?=·).*?(?=\s)/, ""],
    // [/(?=⋅).*?(?=\s)/, ""],
    // [/(?=·).*?(?<=\b)/, ""],
    // [/(?=\.).*?(?=\s)/, ""],

    // Ces trois points sont différents !
    // [/·e·s/, ""],
    // [/·e·s/, ""],
    // [/·e·s/, ""],
