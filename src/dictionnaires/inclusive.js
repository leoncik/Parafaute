const inclusive = [

    //  Structure :
    // [/faute/]: "correction",

    // Wordpress
    [/Auteur\/autrice/g, "Auteur"],

    // TYPOGRAPHIE
    // Possibilité de reconstruire le pluriel si la dernière lettre suivant le point est un "s"
    [/\(e\)/gi, ""],
    [/\(se\)/gi, ""],
    [/\(euse\)/gi, ""],


    // Liste des points médians avec variantes : [·|·|·|.|⋅|-|-]

    [/[·|·|·|.|⋅|-]e/gi, ""],
    [/[·|·|·|.|⋅|-]es/gi, ""],
    [/[·|·|·|.|⋅|-]e[·|·|·|.|⋅|-]s/gi, ""],
    [/[·|·|·|.|⋅|-]rice[·|·|·|.|⋅|-]s/gi, ""],
    [/[·|·|·|.|⋅|-]ive[·|·|·|.|⋅|-]s/gi, ""],
    [/[·|·|·|.|⋅|-]ne[·|·|·|.|⋅|-]s/gi, ""],
    [/[·|·|·|.|⋅|-]le[·|·|·|.|⋅|-]s/gi, ""],
    [/[·|·|·|.|⋅|-]e/gi, ""],



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
    // Todo : Penser aux accents et caractères spéciaux [a-zA-Z-é-è-ç]
    [/euses\b et [a-zA-Z-é]*eurs\b/g, "eurs"],
    [/euses\b et des [a-zA-Z-é]*eurs\b/g, "eurs"],
    [/euses\b et les [a-zA-Z-é]*eurs\b/g, "eurs"],

    [/eurs\b et [a-zA-Z-é]*euses\b/g, "eurs"],
    [/eurs\b et des [a-zA-Z-é]*euses\b/g, "eurs"],
    [/eurs\b et les [a-zA-Z-é]*euses\b/g, "eurs"],

    [/trices\b et [a-zA-Z-é]*eurs\b/g, "eurs"],
    [/trices\b et des [a-zA-Z-é]*eurs\b/g, "eurs"],
    [/trices\b et les [a-zA-Z-é]*eurs\b/g, "eurs"],

    [/antes\b et [a-zA-Z-é]*ants\b/g, "ants"],
    [/antes\b et des [a-zA-Z-é]*ants\b/g, "ants"],
    [/antes\b et les [a-zA-Z-é]*ants\b/g, "ants"],

    [/çaises\b et [a-zA-Z-é]*çais\b/g, "çais"],
    [/çaises\b et des [a-zA-Z-é]*çais\b/g, "çais"],
    [/çaises\b et les [a-zA-Z-é]*çais\b/g, "çais"],

    [/çais\b et [a-zA-Z-é]*çaises\b/g, "çais"],
    [/çais\b et des [a-zA-Z-é]*çaises\b/g, "çais"],
    [/çais\b et les [a-zA-Z-é]*çaises\b/g, "çais"],

    
    // EXPRESSIONS
    [/à tous et à toutes/g, "à tous"],
    [/à tous et toutes/g, "à tous"],
    [/à toutes et tous/g, "à tous"],
    [/à toutes et tous,/g, "à tous"],
    [/à toutes et à tous/g, "à tous"],
    // Avec erreurs d'orthographe :
    [/à toute et à tous/g, "à tous"],    

];