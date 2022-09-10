const inclusive = [

    //  Structure :
    // [/faute/]: "correction",

    // EXPRESSIONS
    [/Auteur\/autrice/g, "Auteur"],
    [/À tous et à toutes/g, "À tous"],
    [/à tous et à toutes/g, "à tous"],
    [/À tous et toutes/g, "À tous"],
    [/à tous et toutes/g, "à tous"],
    [/À toutes et tous/g, "À tous"],
    [/à toutes et tous/g, "à tous"],
    [/À toutes et tous,/g, "À tous"],
    [/à toutes et tous,/g, "à tous"],
    [/À toutes et à tous/g, "À tous"],
    [/à toutes et à tous/g, "à tous"],
    // Avec fautes d'orthographe :
    [/à toute et à tous/g, "à tous"],
    [/à tous et à toute/g, "à tous"],
    [/toustes/g, "tous"],

    // TYPOGRAPHIE
    [/\(e\)/gi, ""],
    [/\(es\)/gi, ""],
    [/\(se\)/gi, ""],
    [/\(euse\)/gi, ""],
    [/\(ne\)/gi, ""],

    [/teur\/trice\b/g, "teur"],
    [/eur\/rice\b/g, "eur"],
    [/eur.euse\b/g, "eur"],
    [/teurs\/trices\b/g, "teurs"],
    [/eurs\/rices\b/g, "eurs"],
    [/ains\/es\b/g, "ains"],
    [/un\/e\b/g, "un"],
    [/un\[e\]/g, "un"],


    // Liste des points médians avec variantes : [·|·|·|.|⋅|-|-]

    [/tou[·|·|·|.|⋅|-]te[·|·|·|.|⋅|-]s/gi, "tous"],
    [/tous[·|·|·|.|⋅|-]tes/gi, "tous"],
    [/[·|·|·|.|⋅|-]e[·|·|·|.|⋅|-]s/gi, "s"],
    [/[·|·|·|.|⋅|-]rice[·|·|·|.|⋅|-]s/gi, "s"],
    [/[·|·|·|.|⋅|-]ive[·|·|·|.|⋅|-]s/gi, "s"],
    [/[·|·|·|.|⋅|-]ne[·|·|·|.|⋅|-]s/gi, "s"],
    [/[·|·|·|.|⋅|-]le[·|·|·|.|⋅|-]s/gi, "s"],
    [/le[·|·|·|.|⋅|-]a/gi, "le"],
    [/le[·|·|·|.|⋅|-]la/gi, "le"],
    [/en[·|·|·|.|⋅|-]nes/gi, "ens"],
    [/if[·|·|·|.|⋅|-]ves/gi, "ifs"],
    [/eur[·|·|·|.|⋅|-]ses/gi, "eurs"],
    [/teur[·|·|·|.|⋅|-]trice/gi, "teur"],
    [/\bceux[·|·|·|.|⋅|-]elles/gi, "ceux"],
    [/[·|·|·|.|⋅|-]rices/gi, "s"],
    [/[·|·|·|.|⋅|-]rice/gi, ""],
    [/[·|·|·|.|⋅|-]es/gi, "s"],
    [/[·|·|·|.|⋅|-]se/gi, ""],
    [/[·|·|·|.|⋅|-]e\b/gi, ""],
    [/[·|·|·|.|⋅|-]e\b/gi, ""],



    // VOCABULAIRE DIVERS
    // *** A ***
    [/Autrice/g, "Auteur"],
    [/autrice/g, "auteur"],


    // *** I ***
    [/\bIel/g, "Il"],
    [/\biel/g, "il"],
    [/\bIels/g, "Ils"],
    [/\biels/g, "ils"],

    // *** C ***
    [/\bcelleux/g, "ceux"],
    [/\bCelleux/g, "Ceux"],
    [/\bcellui/g, "celui"],
    [/\bCellui/g, "Celui"],

    // PROFESSIONS
    // Afin de prendre en compte les couples type : "déterminant féminin - nom féminin - déterminant masculin - nom masculin".
    // Il faut faire l'opération de substitution en 2 étapes :
    // 1) remplacer le déterminant (s'il est au féminin singulier)
    [/une (?=[a-zA-Z-é]*trice ou un [a-zA-Z-é]*teur)/g, 'un '],

    // 2) remplacer la terminaison du nom
    [/trice\b ou un [a-zA-Z-é]*teur\b/g, "teur"],
    [/le développeur ou la développeuse/g, "le développeur"],
    [/la développeuse ou le développeur/g, "le développeur"],

    [/euses\b et [a-zA-Z-é]*eurs\b/g, "eurs"],
    [/euses\b et des [a-zA-Z-é]*eurs\b/g, "eurs"],
    [/euses\b et les [a-zA-Z-é]*eurs\b/g, "eurs"],
    [/euses\b et de [a-zA-Z-é]*eurs\b/g, "eurs"],
    
    [/eurs\b et [a-zA-Z-é]*euses\b/g, "eurs"],
    [/eurs\b et des [a-zA-Z-é]*euses\b/g, "eurs"],
    [/eurs\b et les [a-zA-Z-é]*euses\b/g, "eurs"],
    [/eurs\b et de [a-zA-Z-é]*euses\b/g, "eurs"],

    [/euses\b et [a-zA-Z-é]*eux\b/g, "eux"],
    [/eux\b et [a-zA-Z-é]*euses\b/g, "eux"],
    
    [/eur\b \/ [a-zA-Z-é]*euse\b/g, "eur"],
    [/eurs\b et [a-zA-Z-é]*trices\b/g, "eurs"],
    [/trices\b et [a-zA-Z-é]*teurs\b/g, "teurs"],
    [/teur ou une [a-zA-Z-é]*trice/g, "teur"],
    [/teur ou de [a-zA-Z-é]*trice/g, "teur"],



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

];