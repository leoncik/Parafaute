// Liste des séparateurs pouvant faire office de point médian.
// Inclut les caractères invisibles de formatage qui peuvent apparaître dans le HTML :
// - \u00AD : soft hyphen (&shy;) - point de césure potentiel avec tiret
// - \u200B : zero-width space - point de césure sans tiret
// Le "+" permet d’inclure dans la détection plusieurs séparateurs consécutifs (ex: "·­" = point médian + soft hyphen).
// Note : le "-" doit être à la fin de la classe pour être littéral (sinon il crée une plage de caractères).
const MEDIAN_SEPARATORS = "[·‧܁⋅•∙\\/.\\u00AD\\u200B-]+";

/**
 * Construit une expression régulière avec des séparateurs médians.
 * Remplace chaque underscore "_" par le groupe de séparateurs médians.
 *
 * @param {string} pattern - Texte à modifier avec des underscores comme placeholders.
 * @param {string} [flags="gi"] - Flags de l'expression régulière (par défaut: "gi").
 * @returns {RegExp} Expression régulière compilée.
 *
 * @example
 * // Retourne /tou[·‧܁⋅•∙\/.­-]+te[·‧܁⋅•∙\/.­-]+s/gi
 * addSeparatorsRegex("tou_te_s")
 *
 * @example
 * // Avec des flags personnalisés.
 * addSeparatorsRegex("un_e\\b", "g") // Retourne /un[·‧܁⋅•∙\/.­-]+e\b/g
 */
const addSeparatorsRegex = (pattern, flags = "gi") =>
  new RegExp(pattern.replace(/_/g, MEDIAN_SEPARATORS), flags);

const inclusive = [
  //  Structure :
  // [/faute/]: "correction",

  // EXPRESSIONS
  [/le ou la/g, "le"],
  [/la ou le/g, "le"],
  [/celles et ceux/g, "ceux"],
  [/ceux et celles/g, "ceux"],
  [/Celui\/Celle/g, "Celui"],
  [/Celle\/Celui/g, "Celui"],
  [/Celui ou (c|C)elle/g, "Celui"],
  [/Celle ou (c|C)elui/g, "Celui"],
  [/(c|C)elui\/(c|C)elle/g, "celui"],
  [/(c|C)elle\/(c|C)elui/g, "celui"],
  [/(c|C)elle ou (c|C)elui/g, "celui"],
  [/(c|C)elui ou (c|C)elle/g, "celui"],
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
  [/\((e|E)\)/gi, ""],
  [/\((e|E)(s|S)\)/gi, ""],
  [/\([sS][eE][sS]\)/gi, ""],
  [/\((es|ES)\)/gi, ""],
  [/\((se|SE)\)/gi, ""],
  [/\((euses|EUSES)\)/gi, ""],
  [/\((euse|EUSE)\)/gi, ""],
  [/\((trice|TRICE)\)/gi, ""],
  [/\((trices|TRICES)\)/gi, ""],
  [/\((rice|RICE)\)/gi, ""],
  [/\((ice|ICE)\)/gi, ""],
  [/\((ne|NE)\)/gi, ""],
  [/\((ère|ÈRE)\)/gi, ""],
  [/\((ées|ÉES)\)/gi, ""],
  [/\((le|LE)\)/gi, ""],
  [/\((te|TE)\)/gi, ""],
  [/\((ve|VE)\)/gi, ""],
  [/\((fe|FE)\)/gi, ""],

  // Liste des points médians avec variantes (voir MEDIAN_SEPARATORS)

  [addSeparatorsRegex("tou_te_s"), "tous"],
  [addSeparatorsRegex("tou_tes"), "tous"],
  [addSeparatorsRegex("teur_trice_s"), "teurs"],
  [addSeparatorsRegex("eur_rice_s"), "eurs"],
  [addSeparatorsRegex("tous_tes"), "tous"],
  [addSeparatorsRegex("ier_ère_s"), "s"],
  [addSeparatorsRegex("s_e_s"), "s"],

  [addSeparatorsRegex("_aux_lles"), "aux"],
  [addSeparatorsRegex("_eur_rice"), "eur"],
  [addSeparatorsRegex("_fe_s"), "s"],
  [addSeparatorsRegex("_e_s"), "s"],
  [addSeparatorsRegex("_E_S"), "S"],
  [addSeparatorsRegex("_x_se"), "x"],
  [addSeparatorsRegex("_rice_s"), "s"],
  [addSeparatorsRegex("_ive_s"), "s"],
  [addSeparatorsRegex("_ne_s"), "s"],
  [addSeparatorsRegex("_le_s"), "s"],
  [addSeparatorsRegex("_se_s"), "s"],

  [addSeparatorsRegex("le_a\\b"), "le"], // Ajout de "\b" pour les cas comme "Nouvelle-Aquitaine".
  [addSeparatorsRegex("le_la\\b"), "le"],
  [addSeparatorsRegex("en_nes"), "ens"],
  [addSeparatorsRegex("if_ves"), "ifs"],
  [addSeparatorsRegex("eur_ses"), "eurs"],
  [addSeparatorsRegex("eurs_ses"), "eurs"],
  [addSeparatorsRegex("eaux_elles"), "eaux"],
  [addSeparatorsRegex("eau_elle"), "eau"],
  [addSeparatorsRegex("teur_trice"), "teur"],
  [addSeparatorsRegex("\\bceux_elles"), "ceux"],
  [addSeparatorsRegex("cet_te"), "ce"],
  [addSeparatorsRegex("\\eux_ses"), "eux"],
  [addSeparatorsRegex("s_es\\b"), "s"],
  [addSeparatorsRegex("ant_e\\b", "g"), "ant"],
  [addSeparatorsRegex("eur_se\\b", "g"), "eur"],
  [addSeparatorsRegex("if_ve\\b", "g"), "if"],
  [addSeparatorsRegex("é_e\\b", "g"), "é"],
  [addSeparatorsRegex("teur_trice\\b", "g"), "teur"],
  [addSeparatorsRegex("eur_rice\\b", "g"), "eur"],
  [addSeparatorsRegex("eur_euse\\b", "g"), "eur"],
  [addSeparatorsRegex("teurs_trices\\b", "g"), "teurs"],
  [addSeparatorsRegex("eurs_rices\\b", "g"), "eurs"],
  [addSeparatorsRegex("eurs_euses\\b", "g"), "eurs"],
  [addSeparatorsRegex("ains_es\\b", "g"), "ains"],
  [addSeparatorsRegex("un_une\\b", "g"), "un"],
  [addSeparatorsRegex("un_e\\b", "g"), "un"],
  [/un\[e\]/g, "un"],
  [addSeparatorsRegex("un_e\\b"), "un"],
  [addSeparatorsRegex("Un_e\\b"), "Un"],
  // "Elle" n'a pas besoin d'être sensible à la casse
  [addSeparatorsRegex("il_(?:e|E)(?:l|L)(?:l|L)(?:e|E)\\b", "g"), "il"],
  [
    addSeparatorsRegex("ils_(?:e|E)(?:l|L)(?:l|L)(?:e|E)(?:s|S)\\b", "g"),
    "ils",
  ],
  [addSeparatorsRegex("Il_(?:e|E)(?:l|L)(?:l|L)(?:e|E)\\b", "g"), "Il"],
  [
    addSeparatorsRegex("Ils_(?:e|E)(?:l|L)(?:l|L)(?:e|E)(?:s|S)\\b", "g"),
    "Ils",
  ],

  [addSeparatorsRegex("_rices\\b"), "s"],
  [addSeparatorsRegex("_rice\\b"), ""],
  [addSeparatorsRegex("_ices\\b"), ""],
  [addSeparatorsRegex("_ice\\b"), ""],
  [addSeparatorsRegex("_es\\b"), "s"],
  [addSeparatorsRegex("_ES\\b"), "S"],
  [addSeparatorsRegex("_euses\\b"), ""],
  [addSeparatorsRegex("_se\\b"), ""],
  [addSeparatorsRegex("_fe\\b"), ""],
  [addSeparatorsRegex("_ve\\b"), ""],
  [addSeparatorsRegex("_fes\\b"), "s"],
  [addSeparatorsRegex("_ales\\b"), ""],

  // Posait des problèmes avec les expressions comme « faites-les» ou « listez-les » et les noms comme « Morzy-les-Gaillardes »
  // [addSeparatorsRegex("_le\\b"), ""],
  // [addSeparatorsRegex("_les\\b"), ""],
  // [addSeparatorsRegex("_elle\\b"), ""],
  // [/(?<=\w(?<!ez|es))[·|·|·|‧|܁|.|⋅|-|•|∙|-|\/|.|-]le(?!-)\b/gi, ""],
  // [/(?<=\w(?<!ez|es))[·|·|·|‧|܁|.|⋅|-|•|∙|-|\/|.|-]les(?!-)\b/gi, ""],

  [addSeparatorsRegex("_ière\\b"), ""],
  [addSeparatorsRegex("_ère\\b"), ""],
  [addSeparatorsRegex("_ne\\b"), ""],
  [addSeparatorsRegex("_nes\\b"), "s"],
  // Faux positif: ne pas corriger "shift-e"
  [addSeparatorsRegex("(?<=\\w(?<!(?:s|S)hift))_e\\b"), ""],

  // Gestions spécifiques pour "-le" pour inclure les expressions comme "Teste-le !" et lieux comme "Sennecey-le-Grand"
  [addSeparatorsRegex("il_le(?![-])\\b"), "il"],
  [addSeparatorsRegex("ils_les(?![-])\\b"), "ils"],
  [addSeparatorsRegex("el_le(?![-])\\b"), "el"],

  // VOCABULAIRE DIVERS
  // *** A ***
  [/Autrice/g, "Auteur"],
  [/autrice/g, "auteur"],
  // Les noms féminins en “eur” ne prennent pas de “e” (exceptions : heure, demeure).
  [/Auteure/g, "Auteur"],
  [/auteure/g, "auteur"],

  // *** C ***
  [/\bcelleux/g, "ceux"],
  [/\bCelleux/g, "Ceux"],
  [/\bcellui/g, "celui"],
  [/\bCellui/g, "Celui"],
  [/\bcopaines/g, "copains"],
  [/\bCopaines/g, "Copains"],

  // *** I ***
  [/\bIel/g, "Il"],
  [/\biel/g, "il"],
  [/\bIels/g, "Ils"],
  [/\biels/g, "ils"],
  [/\billes/g, "ils"],
  [/\bIlles/g, "Ils"],

  [/teurice/g, "teur"],
  [/teurices/g, "teurs"],

  // PROFESSIONS
  // Afin de prendre en compte les couples type : "déterminant féminin - nom féminin - déterminant masculin - nom masculin".
  // Il faut faire l'opération de substitution en 2 étapes :
  // 1) remplacer le déterminant (s'il est au féminin singulier)
  [/une (?=[a-zA-Z-é]*trice ou un [a-zA-Z-é]*teur)/g, "un "],
  [/la (?=[a-zA-Z-é]*euse ou le [a-zA-Z-é]*eur)/g, "le "],

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
