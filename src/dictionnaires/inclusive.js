const inclusive = [

    //  Structure :
    // [/faute/]: "correction",

    // EXPRESSIONS
    [/celles et ceux/g, "ceux"],
    [/ceux et celles/g, "ceux"],
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
    [/toutes et tous/g, "tous"],
    [/Toutes et tous/g, "Tous"],
    [/tous et toutes/g, "tous"],
    [/Tous et toutes/g, "Tous"],
    [/Toustes/g, "Tous"],
    [/toustes/g, "tous"],

    // TYPOGRAPHIE
    [/\(e\)/gi, ""],
    [/\(es\)/gi, ""],
    [/\(se\)/gi, ""],
    [/\(euses\)/gi, ""],
    [/\(euse\)/gi, ""],
    [/\(trice\)/gi, ""],
    [/\(trices\)/gi, ""],
    [/\(rice\)/gi, ""],
    [/\(ne\)/gi, ""],
    [/\(ère\)/gi, ""],
    [/\(ées\)/gi, ""],
    [/\(le\)/gi, ""],
    [/\(te\)/gi, ""],
    [/\(ve\)/gi, ""],

    [/ant\/e\b/g, "ant"],
    [/eur\/se\b/g, "eur"],
    [/if\/ve\b/g, "if"],
    [/é\/e\b/g, "é"],
    [/teur\/trice\b/g, "teur"],
    [/eur\/rice\b/g, "eur"],
    [/eur.euse\b/g, "eur"],
    [/teurs\/trices\b/g, "teurs"],
    [/eurs\/rices\b/g, "eurs"],
    [/eurs\/euses\b/g, "eurs"],
    [/ains\/es\b/g, "ains"],
    [/un\/une\b/g, "un"],
    [/un\/e\b/g, "un"],
    [/un\[e\]/g, "un"],
    [/un[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]e\b/gi, "un"],
    [/Un[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]e\b/gi, "Un"],


    // Liste des points médians avec variantes : [·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]

    [/tou[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]te[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]s/gi, "tous"],
    [/tou[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]tes/gi, "tous"],
    [/teur[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]trice[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]s/gi, "teurs"],
    [/eur[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]rice[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]s/gi, "eurs"],
    [/tous[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]tes/gi, "tous"],
    [/s[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]e[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]s/gi, "s"],

    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]aux[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]lles/gi, "aux"],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]eur[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]rice/gi, "eur"],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]fe[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]s/gi, "s"],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]e[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]s/gi, "s"],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]x[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]se/gi, "x"],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]rice[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]s/gi, "s"],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]ive[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]s/gi, "s"],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]ne[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]s/gi, "s"],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]le[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]s/gi, "s"],

    [/le[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]a\b/gi, "le"], // Ajout de "\b" pour les cas comme "Nouvelle-Aquitaine".
    [/le[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]la\b/gi, "le"],
    [/en[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]nes/gi, "ens"],
    [/if[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]ves/gi, "ifs"],
    [/eur[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]ses/gi, "eurs"],
    [/eurs[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]ses/gi, "eurs"],
    [/eaux[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]elles/gi, "eaux"],
    [/eau[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]elle/gi, "eau"],
    [/teur[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]trice/gi, "teur"],
    [/\bceux[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]elles/gi, "ceux"],
    [/\eux[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]ses/gi, "eux"],
    [/s[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]es\b/gi, "s"],
    // "Elle" n'a pas besoin d'être sensible à la casse
    [/il[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-](?:e|E)(?:l|L)(?:l|L)(?:e|E)\b/g, "il"],
    [/ils[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-](?:e|E)(?:l|L)(?:l|L)(?:e|E)(?:s|S)\b/g, "ils"],
    [/Il[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-](?:e|E)(?:l|L)(?:l|L)(?:e|E)\b/g, "Il"],
    [/Ils[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-](?:e|E)(?:l|L)(?:l|L)(?:e|E)(?:s|S)\b/g, "Ils"],

    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]rices\b/gi, "s"],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]rice\b/gi, ""],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]ices\b/gi, ""],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]ice\b/gi, ""],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]es\b/gi, "s"],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]ES\b/gi, "S"],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]euses\b/gi, ""],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]se\b/gi, ""],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]fe\b/gi, ""],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]ve\b/gi, ""],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]fes\b/gi, "s"],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]ales\b/gi, "s"],

    // Posait des problèmes avec les expressions comme « faites-les» ou « listez-les » et les noms comme « Morzy-les-Gaillardes »
    // [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]le\b/gi, ""],
    // [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]les\b/gi, ""],
    // [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]elle\b/gi, ""],
    // [/(?<=\w(?<!ez|es))[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]le(?!-)\b/gi, ""],
    // [/(?<=\w(?<!ez|es))[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]les(?!-)\b/gi, ""],

    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]ière\b/gi, ""],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]ne\b/gi, ""],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]nes\b/gi, "s"],
    [/[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]e\b/gi, ""],

    // Gestions spécifiques pour "-le" pour inclure les expressions comme "Teste-le !" et lieux comme "Sennecey-le-Grand"
    [/il[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]le(?![-])\b/gi, "il"],
    [/ils[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]les(?![-])\b/gi, "ils"],
    [/el[·|·|·|‧|.|⋅|-|•|∙|-|\/|.|-]le(?![-])\b/gi, "el"],


    // VOCABULAIRE DIVERS
    // *** A ***
    [/Autrice/g, "Auteur"],
    [/autrice/g, "auteur"],
    // Les noms féminins en “eur” ne prennent pas de “e” (exceptions : heure, demeure).
    [/Auteure/g, "Auteur"],
    [/auteure/g, "auteur"],


    // *** I ***
    [/\bIel/g, "Il"],
    [/\biel/g, "il"],
    [/\bIels/g, "Ils"],
    [/\biels/g, "ils"],
    [/\billes/g, "ils"],
    [/\bIlles/g, "Ils"],

    [/\instituteurice/g, "instituteur"],

    // *** C ***
    [/\bcelleux/g, "ceux"],
    [/\bCelleux/g, "Ceux"],
    [/\bcellui/g, "celui"],
    [/\bCellui/g, "Celui"],
    [/\bcopaines/g, "copains"],
    [/\bCopaines/g, "Copains"],

    // PROFESSIONS
    // Afin de prendre en compte les couples type : "déterminant féminin - nom féminin - déterminant masculin - nom masculin".
    // Il faut faire l'opération de substitution en 2 étapes :
    // 1) remplacer le déterminant (s'il est au féminin singulier)
    [/une (?=[a-zA-Z-é]*trice ou un [a-zA-Z-é]*teur)/g, 'un '],
    [/la (?=[a-zA-Z-é]*euse ou le [a-zA-Z-é]*eur)/g, 'le '],

    // 2) remplacer la terminaison du nom
    [/trice\b ou un [a-zA-Z-é]*teur\b/g, "teur"],

    [/euses\b et [a-zA-Z-é]*eurs\b/g, "eurs"],
    [/euses\b et des [a-zA-Z-é]*eurs\b/g, "eurs"],
    [/euses\b et les [a-zA-Z-é]*eurs\b/g, "eurs"],
    [/euses\b et de [a-zA-Z-é]*eurs\b/g, "eurs"],

    [/euse\b ou le [a-zA-Z-é]*eur\b/g, "eur"],

    [/eurs\b et [a-zA-Z-é]*euses\b/g, "eurs"],
    [/eurs\b et des [a-zA-Z-é]*euses\b/g, "eurs"],
    [/eurs\b et les [a-zA-Z-é]*euses\b/g, "eurs"],
    [/eurs\b et de [a-zA-Z-é]*euses\b/g, "eurs"],

    [/eur\b ou la [a-zA-Z-é]*euse\b/g, "eur"],

    [/ens\b et [a-zA-Z-é]*ennes\b/g, "ens"],
    [/ens\b et des [a-zA-Z-é]*ennes\b/g, "ens"],
    [/ens\b et les [a-zA-Z-é]*ennes\b/g, "ens"],
    [/ens\b et de [a-zA-Z-é]*ennes\b/g, "ens"],

    [/en\b ou la [a-zA-Z-é]*enne\b/g, "en"],

    [/ennes\b et [a-zA-Z-é]*ens\b/g, "ens"],
    [/ennes\b et des [a-zA-Z-é]*ens\b/g, "ens"],
    [/ennes\b et les [a-zA-Z-é]*ens\b/g, "ens"],
    [/ennes\b et de [a-zA-Z-é]*ens\b/g, "ens"],

    [/enne\b ou le [a-zA-Z-é]*en\b/g, "en"],

    [/els\b et [a-zA-Z-é]*elles\b/g, "els"],
    [/els\b et des [a-zA-Z-é]*elles\b/g, "els"],
    [/els\b et les [a-zA-Z-é]*elles\b/g, "els"],
    [/els\b et de [a-zA-Z-é]*elles\b/g, "els"],

    [/el\b et la [a-zA-Z-é]*elle\b/g, "el"],

    [/elles\b et [a-zA-Z-é]*els\b/g, "els"],
    [/elles\b et des [a-zA-Z-é]*els\b/g, "els"],
    [/elles\b et les [a-zA-Z-é]*els\b/g, "els"],
    [/elles\b et de [a-zA-Z-é]*els\b/g, "els"],

    [/elle\b et le [a-zA-Z-é]*el\b/g, "el"],

    [/euses\b et [a-zA-Z-é]*eux\b/g, "eux"],
    [/eux\b et [a-zA-Z-é]*euses\b/g, "eux"],
    
    [/eur\b \/ [a-zA-Z-é]*euse\b/g, "eur"],
    [/eur\/[a-zA-Z-é]*euse\b/g, "eur"],
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