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

  [addSeparatorsRegex("tou_te_s", "g"), "tous"],
  [addSeparatorsRegex("TOU_TE_S", "g"), "TOUS"],
  [addSeparatorsRegex("tou_tes", "g"), "tous"],
  [addSeparatorsRegex("TOU_TES", "g"), "TOUS"],
  [addSeparatorsRegex("teur_trice_s", "g"), "teurs"],
  [addSeparatorsRegex("TEUR_TRICE_S", "g"), "TEURS"],
  [addSeparatorsRegex("teur_euse_s", "g"), "teurs"],
  [addSeparatorsRegex("TEUR_EUSE_S", "g"), "TEURS"],
  [addSeparatorsRegex("teurs_trices\\b", "g"), "teurs"],
  [addSeparatorsRegex("TEURS_TRICES\\b", "g"), "TEURS"],
  [addSeparatorsRegex("teurs_euses\\b", "g"), "teurs"],
  [addSeparatorsRegex("TEURS_EUSES\\b", "g"), "TEURS"],
  [addSeparatorsRegex("eur_rice_s", "g"), "eurs"],
  [addSeparatorsRegex("EUR_RICE_S", "g"), "EURS"],
  [addSeparatorsRegex("tous_tes", "g"), "tous"],
  [addSeparatorsRegex("TOUS_TES", "g"), "TOUS"],
  [addSeparatorsRegex("ier_ère_s", "g"), "s"],
  [addSeparatorsRegex("IER_ÈRE_S", "g"), "S"],
  [addSeparatorsRegex("s_e_s", "g"), "s"],
  [addSeparatorsRegex("S_E_S", "g"), "S"],

  [addSeparatorsRegex("_aux_lles", "g"), "aux"],
  [addSeparatorsRegex("_AUX_LLES", "g"), "AUX"],
  [addSeparatorsRegex("_eur_rice", "g"), "eur"],
  [addSeparatorsRegex("_EUR_RICE", "g"), "EUR"],
  [addSeparatorsRegex("_fe_s", "g"), "s"],
  [addSeparatorsRegex("_FE_S", "g"), "S"],
  [addSeparatorsRegex("_e_s", "g"), "s"],
  [addSeparatorsRegex("_E_S", "g"), "S"],
  [addSeparatorsRegex("_x_se", "g"), "x"],
  [addSeparatorsRegex("_X_SE", "g"), "X"],
  [addSeparatorsRegex("_rice_s", "g"), "s"],
  [addSeparatorsRegex("_RICE_S", "g"), "S"],
  [addSeparatorsRegex("_ive_s", "g"), "s"],
  [addSeparatorsRegex("_IVE_S", "g"), "S"],
  [addSeparatorsRegex("_ne_s", "g"), "s"],
  [addSeparatorsRegex("_NE_S", "g"), "S"],
  [addSeparatorsRegex("_le_s", "g"), "s"],
  [addSeparatorsRegex("_LE_S", "g"), "S"],
  [addSeparatorsRegex("_se_s", "g"), "s"],
  [addSeparatorsRegex("_SE_S", "g"), "S"],

  [addSeparatorsRegex("le_a\\b", "g"), "le"], // Ajout de "\b" pour les cas comme "Nouvelle-Aquitaine".
  [addSeparatorsRegex("LE_A\\b", "g"), "LE"],
  [addSeparatorsRegex("le_la\\b", "g"), "le"],
  [addSeparatorsRegex("LE_LA\\b", "g"), "LE"],
  [addSeparatorsRegex("en_nes", "g"), "ens"],
  [addSeparatorsRegex("EN_NES", "g"), "ENS"],
  [addSeparatorsRegex("if_ves", "g"), "ifs"],
  [addSeparatorsRegex("IF_VES", "g"), "IFS"],
  [addSeparatorsRegex("eur_ses", "g"), "eurs"],
  [addSeparatorsRegex("EUR_SES", "g"), "EURS"],
  [addSeparatorsRegex("eurs_ses", "g"), "eurs"],
  [addSeparatorsRegex("EURS_SES", "g"), "EURS"],
  [addSeparatorsRegex("eaux_elles", "g"), "eaux"],
  [addSeparatorsRegex("EAUX_ELLES", "g"), "EAUX"],
  [addSeparatorsRegex("eau_elle", "g"), "eau"],
  [addSeparatorsRegex("EAU_ELLE", "g"), "EAU"],
  [addSeparatorsRegex("teur_trice", "g"), "teur"],
  [addSeparatorsRegex("TEUR_TRICE", "g"), "TEUR"],
  [addSeparatorsRegex("\\bceux_elles", "g"), "ceux"],
  [addSeparatorsRegex("\\bCEUX_ELLES", "g"), "CEUX"],
  [addSeparatorsRegex("cet_te", "g"), "ce"],
  [addSeparatorsRegex("CET_TE", "g"), "CE"],
  [addSeparatorsRegex("\\eux_ses", "g"), "eux"],
  [addSeparatorsRegex("\\EUX_SES", "g"), "EUX"],
  [addSeparatorsRegex("s_es\\b", "g"), "s"],
  [addSeparatorsRegex("S_ES\\b", "g"), "S"],
  [addSeparatorsRegex("ant_e\\b", "g"), "ant"],
  [addSeparatorsRegex("ANT_E\\b", "g"), "ANT"],
  [addSeparatorsRegex("eur_se\\b", "g"), "eur"],
  [addSeparatorsRegex("EUR_SE\\b", "g"), "EUR"],
  [addSeparatorsRegex("if_ve\\b", "g"), "if"],
  [addSeparatorsRegex("IF_VE\\b", "g"), "IF"],
  [addSeparatorsRegex("é_e\\b", "g"), "é"],
  [addSeparatorsRegex("É_E\\b", "g"), "É"],
  [addSeparatorsRegex("teur_trice\\b", "g"), "teur"],
  [addSeparatorsRegex("TEUR_TRICE\\b", "g"), "TEUR"],
  [addSeparatorsRegex("teur_euse\\b", "g"), "teur"],
  [addSeparatorsRegex("TEUR_EUSE\\b", "g"), "TEUR"],
  [addSeparatorsRegex("eur_rice\\b", "g"), "eur"],
  [addSeparatorsRegex("EUR_RICE\\b", "g"), "EUR"],
  [addSeparatorsRegex("eur_euse\\b", "g"), "eur"],
  [addSeparatorsRegex("EUR_EUSE\\b", "g"), "EUR"],
  [addSeparatorsRegex("eurs_rices\\b", "g"), "eurs"],
  [addSeparatorsRegex("EURS_RICES\\b", "g"), "EURS"],
  [addSeparatorsRegex("eurs_euses\\b", "g"), "eurs"],
  [addSeparatorsRegex("EURS_EUSES\\b", "g"), "EURS"],
  [addSeparatorsRegex("ains_es\\b", "g"), "ains"],
  [addSeparatorsRegex("AINS_ES\\b", "g"), "AINS"],
  [addSeparatorsRegex("un_une\\b", "g"), "un"],
  [addSeparatorsRegex("UN_UNE\\b", "g"), "UN"],
  [addSeparatorsRegex("un_e\\b", "g"), "un"],
  [addSeparatorsRegex("UN_E\\b", "g"), "UN"],
  [/un\[e\]/g, "un"],
  [addSeparatorsRegex("Un_e\\b", "g"), "Un"],
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

  [addSeparatorsRegex("_rices\\b", "g"), "s"],
  [addSeparatorsRegex("_RICES\\b", "g"), "S"],
  [addSeparatorsRegex("_rice\\b"), ""],
  [addSeparatorsRegex("_ices\\b"), ""],
  [addSeparatorsRegex("_ice\\b"), ""],
  [addSeparatorsRegex("_es\\b", "g"), "s"],
  [addSeparatorsRegex("_ES\\b", "g"), "S"],
  [addSeparatorsRegex("_se\\b"), ""],
  [addSeparatorsRegex("_fe\\b"), ""],
  [addSeparatorsRegex("_ve\\b"), ""],
  [addSeparatorsRegex("_fes\\b", "g"), "s"],
  [addSeparatorsRegex("_FES\\b", "g"), "S"],
  [addSeparatorsRegex("_ales\\b"), ""],
  [addSeparatorsRegex("_euses\\b"), ""],

  // Posait des problèmes avec les expressions comme « faites-les» ou « listez-les » et les noms comme « Morzy-les-Gaillardes »
  // [addSeparatorsRegex("_le\\b"), ""],
  // [addSeparatorsRegex("_les\\b"), ""],
  // [addSeparatorsRegex("_elle\\b"), ""],
  // [/(?<=\w(?<!ez|es))[·|·|·|‧|܁|.|⋅|-|•|∙|-|\/|.|-]le(?!-)\b/gi, ""],
  // [/(?<=\w(?<!ez|es))[·|·|·|‧|܁|.|⋅|-|•|∙|-|\/|.|-]les(?!-)\b/gi, ""],

  [addSeparatorsRegex("_ière\\b"), ""],
  [addSeparatorsRegex("_ère\\b"), ""],
  [addSeparatorsRegex("_ne\\b"), ""],
  [addSeparatorsRegex("_nes\\b", "g"), "s"],
  [addSeparatorsRegex("_NES\\b", "g"), "S"],
  // Faux positif: ne pas corriger "shift-e"
  [addSeparatorsRegex("(?<=\\w(?<!(?:s|S)hift))_e\\b"), ""],

  // Gestions spécifiques pour "-le" pour inclure les expressions comme "Teste-le !" et lieux comme "Sennecey-le-Grand"
  [addSeparatorsRegex("il_le(?![-])\\b", "g"), "il"],
  [addSeparatorsRegex("IL_LE(?![-])\\b", "g"), "IL"],
  [addSeparatorsRegex("ils_les(?![-])\\b", "g"), "ils"],
  [addSeparatorsRegex("ILS_LES(?![-])\\b", "g"), "ILS"],
  [addSeparatorsRegex("el_le(?![-])\\b", "g"), "el"],
  [addSeparatorsRegex("EL_LE(?![-])\\b", "g"), "EL"],

  // ÉCRITURE INCLUSIVE AVEC "X"
  // Le "x" est parfois utilisé comme alternative au point médian
  // (ex : "étudiantxe" au lieu de "étudiant·e").
  // Contrairement au point médian, le "x" est une lettre ordinaire, ce qui nécessite
  // des règles spécifiques pour éviter les faux positifs (axe, luxe, fixe, etc.).

  // Mots spécifiques
  [/\bunxe\b/g, "un"],
  [/\bUnxe\b/g, "Un"],
  [/\btousxtes\b/g, "tous"],
  [/\bTousxtes\b/g, "Tous"],

  // Terminaisons composées (suffixe féminin complexe après "x")
  [/teurxtrices\b/g, "teurs"],
  [/TEURXTRICES\b/g, "TEURS"],
  [/teurxtrice\b/g, "teur"],
  [/TEURXTRICE\b/g, "TEUR"],
  [/eurxeuses\b/g, "eurs"],
  [/EURXEUSES\b/g, "EURS"],
  [/eurxeuse\b/g, "eur"],
  [/EURXEUSE\b/g, "EUR"],
  [/eurxrices\b/g, "eurs"],
  [/EURXRICES\b/g, "EURS"],
  [/eurxrice\b/g, "eur"],
  [/EURXRICE\b/g, "EUR"],
  [/ifxves\b/g, "ifs"],
  [/IFXVES\b/g, "IFS"],
  [/ifxve\b/g, "if"],
  [/IFXVE\b/g, "IF"],
  [/enxnes\b/g, "ens"],
  [/ENXNES\b/g, "ENS"],
  [/enxne\b/g, "en"],
  [/ENXNE\b/g, "EN"],

  // Terminaison générique : consonne ou voyelle accentuée + "xe(s)"
  // Les mots français courants en "-xe" sont précédés d'une voyelle
  // non accentuée (axe, boxe, fixe, luxe...), ce qui les exclut de cette règle.
  [/(?<=[BCDFGHJKLMNPQRSTVWYZÉÈÊËÀÂÙÛÎÏÔÖ])XES\b/g, "S"],
  [/(?<=[bcdfghjklmnpqrstvwyzéèêëàâùûîïôö])xes\b/g, "s"],
  [/(?<=[BCDFGHJKLMNPQRSTVWYZÉÈÊËÀÂÙÛÎÏÔÖ])XE\b/g, ""],
  [/(?<=[bcdfghjklmnpqrstvwyzéèêëàâùûîïôö])xe\b/g, ""],

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
