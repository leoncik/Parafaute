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
  [/\btouste\b/g, "tout"],
  [/\bTouste\b/g, "Tout"],
  [/\bTOUSTE\b/g, "TOUT"],

  // Formes compactes avec parenthèses (déterminants)
  // Doit être AVANT la section typographie pour que "la(e)" → "le"
  // et non "la(e)" → "la" via la règle générique (e).
  // le(a) → le, la(e) → le
  [/\ble\s?\(a\)/g, "le"],
  [/\bLe\s?\(a\)/g, "Le"],
  [/\bLE\s?\(A\)/g, "LE"],
  [/\bla\s?\(e\)/g, "le"],
  [/\bLa\s?\(e\)/g, "Le"],
  [/\bLA\s?\(E\)/g, "LE"],
  // un(e) → un : couvert par la règle (e|E) ci-dessous
  // du(de la) → du
  [/\bdu\s?\(de la\)/g, "du"],
  [/\bDu\s?\(de la\)/g, "Du"],
  [/\bDU\s?\(DE LA\)/g, "DU"],
  // au(à la) → au
  [/\bau\s?\(à la\)/g, "au"],
  [/\bAu\s?\(à la\)/g, "Au"],
  [/\bAU\s?\(À LA\)/g, "AU"],
  // il(elle) → il, ils(elles) → ils
  [/\bil\s?\(elle\)/g, "il"],
  [/\bIl\s?\(elle\)/g, "Il"],
  [/\bIL\s?\(ELLE\)/g, "IL"],
  [/\bils\s?\(elles\)/g, "ils"],
  [/\bIls\s?\(elles\)/g, "Ils"],
  [/\bILS\s?\(ELLES\)/g, "ILS"],

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
  // Uniquement entre séparateurs médians pour éviter les faux positifs mathématiques (f(x), cos(x)…)
  [/(?<=[·‧܁⋅•∙\/.\u00AD\u200B-])\(x\)(?=[·‧܁⋅•∙\/.\u00AD\u200B-])/gi, ""],

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
  [addSeparatorsRegex("er_ère_s", "g"), "ers"],
  [addSeparatorsRegex("ER_ÈRE_S", "g"), "ERS"],
  [addSeparatorsRegex("s_e_s", "g"), "s"],
  [addSeparatorsRegex("S_E_S", "g"), "S"],

  [addSeparatorsRegex("_aux_lles\\b", "g"), "aux"],
  [addSeparatorsRegex("_AUX_LLES\\b", "g"), "AUX"],
  [addSeparatorsRegex("_eur_rice\\b", "g"), "eur"],
  [addSeparatorsRegex("_EUR_RICE\\b", "g"), "EUR"],
  [addSeparatorsRegex("_fe_s", "g"), "s"],
  [addSeparatorsRegex("_FE_S", "g"), "S"],
  // "·e·x·s" : combinaison féminin + neutre "x" + pluriel (ex: "représentant·e·x·s" → "représentants")
  [addSeparatorsRegex("_e_x_s", "g"), "s"],
  [addSeparatorsRegex("_E_X_S", "g"), "S"],
  [addSeparatorsRegex("_e_s", "g"), "s"],
  [addSeparatorsRegex("_E_S", "g"), "S"],
  [addSeparatorsRegex("_x_se\\b", "g"), "x"],
  [addSeparatorsRegex("_X_SE\\b", "g"), "X"],
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
  [addSeparatorsRegex("la_le\\b", "g"), "le"],
  [addSeparatorsRegex("La_Le\\b", "g"), "Le"],
  [addSeparatorsRegex("LA_LE\\b", "g"), "LE"],
  // la·e → le (ex: "Je la·e respecte" → "Je le respecte")
  [addSeparatorsRegex("\\bla_e\\b", "g"), "le"],
  [addSeparatorsRegex("\\bLa_E\\b", "g"), "Le"],
  [addSeparatorsRegex("\\bLA_E\\b", "g"), "LE"],
  // Articles partitifs : du·de la → du
  [addSeparatorsRegex("\\bdu_de la\\b", "g"), "du"],
  [addSeparatorsRegex("\\bDU_DE LA\\b", "g"), "DU"],
  [addSeparatorsRegex("\\bde la_du\\b", "g"), "du"],
  [addSeparatorsRegex("\\bDE LA_DU\\b", "g"), "DU"],
  // Déterminants possessifs : mon·ma, ton·ta, son·sa
  [addSeparatorsRegex("\\bmon_ma\\b", "g"), "mon"],
  [addSeparatorsRegex("\\bMon_Ma\\b", "g"), "Mon"],
  [addSeparatorsRegex("\\bMON_MA\\b", "g"), "MON"],
  [addSeparatorsRegex("\\bma_mon\\b", "g"), "mon"],
  [addSeparatorsRegex("\\bMa_Mon\\b", "g"), "Mon"],
  [addSeparatorsRegex("\\bMA_MON\\b", "g"), "MON"],
  [addSeparatorsRegex("\\bton_ta\\b", "g"), "ton"],
  [addSeparatorsRegex("\\bTon_Ta\\b", "g"), "Ton"],
  [addSeparatorsRegex("\\bTON_TA\\b", "g"), "TON"],
  [addSeparatorsRegex("\\bta_ton\\b", "g"), "ton"],
  [addSeparatorsRegex("\\bTa_Ton\\b", "g"), "Ton"],
  [addSeparatorsRegex("\\bTA_TON\\b", "g"), "TON"],
  [addSeparatorsRegex("\\bson_sa\\b", "g"), "son"],
  [addSeparatorsRegex("\\bSon_Sa\\b", "g"), "Son"],
  [addSeparatorsRegex("\\bSON_SA\\b", "g"), "SON"],
  [addSeparatorsRegex("\\bsa_son\\b", "g"), "son"],
  [addSeparatorsRegex("\\bSa_Son\\b", "g"), "Son"],
  [addSeparatorsRegex("\\bSA_SON\\b", "g"), "SON"],
  // Formes abrégées des possessifs (ex: "son·a cousin·e")
  [addSeparatorsRegex("\\bmon_a\\b", "g"), "mon"],
  [addSeparatorsRegex("\\bMon_a\\b", "g"), "Mon"],
  [addSeparatorsRegex("\\bMON_A\\b", "g"), "MON"],
  [addSeparatorsRegex("\\bton_a\\b", "g"), "ton"],
  [addSeparatorsRegex("\\bTon_a\\b", "g"), "Ton"],
  [addSeparatorsRegex("\\bTON_A\\b", "g"), "TON"],
  [addSeparatorsRegex("\\bson_a\\b", "g"), "son"],
  [addSeparatorsRegex("\\bSon_a\\b", "g"), "Son"],
  [addSeparatorsRegex("\\bSON_A\\b", "g"), "SON"],
  [addSeparatorsRegex("en_ennes\\b", "g"), "ens"],
  [addSeparatorsRegex("EN_ENNES\\b", "g"), "ENS"],
  [addSeparatorsRegex("en_enne\\b", "g"), "en"],
  [addSeparatorsRegex("EN_ENNE\\b", "g"), "EN"],
  [addSeparatorsRegex("en_nes\\b", "g"), "ens"],
  [addSeparatorsRegex("EN_NES\\b", "g"), "ENS"],
  [addSeparatorsRegex("ifs_ives\\b", "g"), "ifs"],
  [addSeparatorsRegex("IFS_IVES\\b", "g"), "IFS"],
  [addSeparatorsRegex("if_ves\\b", "g"), "ifs"],
  [addSeparatorsRegex("IF_VES\\b", "g"), "IFS"],
  [addSeparatorsRegex("if_ive\\b", "g"), "if"],
  [addSeparatorsRegex("IF_IVE\\b", "g"), "IF"],
  [addSeparatorsRegex("eur_ses\\b", "g"), "eurs"],
  [addSeparatorsRegex("EUR_SES\\b", "g"), "EURS"],
  [addSeparatorsRegex("eurs_ses\\b", "g"), "eurs"],
  [addSeparatorsRegex("EURS_SES\\b", "g"), "EURS"],
  [addSeparatorsRegex("eaux_elles\\b", "g"), "eaux"],
  [addSeparatorsRegex("EAUX_ELLES\\b", "g"), "EAUX"],
  [addSeparatorsRegex("eau_elle\\b", "g"), "eau"],
  [addSeparatorsRegex("EAU_ELLE\\b", "g"), "EAU"],
  [addSeparatorsRegex("teur_trice", "g"), "teur"],
  [addSeparatorsRegex("TEUR_TRICE", "g"), "TEUR"],
  [addSeparatorsRegex("\\bceux_elles", "g"), "ceux"],
  [addSeparatorsRegex("\\bCeux_Elles", "g"), "Ceux"],
  [addSeparatorsRegex("\\bCEUX_ELLES", "g"), "CEUX"],
  // Pronoms démonstratifs : celui·elle → celui
  [addSeparatorsRegex("\\bcelui_elle\\b", "g"), "celui"],
  [addSeparatorsRegex("\\bCelui_Elle\\b", "g"), "Celui"],
  [addSeparatorsRegex("\\bCELUI_ELLE\\b", "g"), "CELUI"],
  [addSeparatorsRegex("cet_te", "g"), "ce"],
  [addSeparatorsRegex("CET_TE", "g"), "CE"],
  [addSeparatorsRegex("eux_ses\\b", "g"), "eux"],
  [addSeparatorsRegex("EUX_SES\\b", "g"), "EUX"],
  [addSeparatorsRegex("eux_euse\\b", "g"), "eux"],
  [addSeparatorsRegex("EUX_EUSE\\b", "g"), "EUX"],
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
  // Chaînes de pronoms avec séparateurs (elle·iel·il, elle·il, etc.)
  // Les formes à 3 pronoms doivent précéder les formes à 2 pronoms.
  [addSeparatorsRegex("\\belle_iel_il\\b", "g"), "il"],
  [addSeparatorsRegex("\\bElle_Iel_Il\\b", "g"), "Il"],
  [addSeparatorsRegex("\\bELLE_IEL_IL\\b", "g"), "IL"],
  [addSeparatorsRegex("\\bil_iel_elle\\b", "g"), "il"],
  [addSeparatorsRegex("\\bIl_Iel_Elle\\b", "g"), "Il"],
  [addSeparatorsRegex("\\bIL_IEL_ELLE\\b", "g"), "IL"],
  [addSeparatorsRegex("\\belles_iels_ils\\b", "g"), "ils"],
  [addSeparatorsRegex("\\bElles_Iels_Ils\\b", "g"), "Ils"],
  [addSeparatorsRegex("\\bELLES_IELS_ILS\\b", "g"), "ILS"],
  [addSeparatorsRegex("\\bils_iels_elles\\b", "g"), "ils"],
  [addSeparatorsRegex("\\bIls_Iels_Elles\\b", "g"), "Ils"],
  [addSeparatorsRegex("\\bILS_IELS_ELLES\\b", "g"), "ILS"],
  // elle·iel / il·iel (2 pronoms avec iel)
  [addSeparatorsRegex("\\belle_iel\\b", "g"), "il"],
  [addSeparatorsRegex("\\bElle_Iel\\b", "g"), "Il"],
  [addSeparatorsRegex("\\bELLE_IEL\\b", "g"), "IL"],
  [addSeparatorsRegex("\\bil_iel\\b", "g"), "il"],
  [addSeparatorsRegex("\\bIl_Iel\\b", "g"), "Il"],
  [addSeparatorsRegex("\\bIL_IEL\\b", "g"), "IL"],
  [addSeparatorsRegex("\\belles_iels\\b", "g"), "ils"],
  [addSeparatorsRegex("\\bElles_Iels\\b", "g"), "Ils"],
  [addSeparatorsRegex("\\bELLES_IELS\\b", "g"), "ILS"],
  [addSeparatorsRegex("\\bils_iels\\b", "g"), "ils"],
  [addSeparatorsRegex("\\bIls_Iels\\b", "g"), "Ils"],
  [addSeparatorsRegex("\\bILS_IELS\\b", "g"), "ILS"],
  // elle·il / il·elle (sans iel)
  [addSeparatorsRegex("\\belle_il\\b", "g"), "il"],
  [addSeparatorsRegex("\\bElle_Il\\b", "g"), "Il"],
  [addSeparatorsRegex("\\bELLE_IL\\b", "g"), "IL"],
  [addSeparatorsRegex("\\belles_ils\\b", "g"), "ils"],
  [addSeparatorsRegex("\\bElles_Ils\\b", "g"), "Ils"],
  [addSeparatorsRegex("\\bELLES_ILS\\b", "g"), "ILS"],
  // Pronoms compléments : lui·elle → lui, elles·eux → eux
  [addSeparatorsRegex("\\blui_elle\\b", "g"), "lui"],
  [addSeparatorsRegex("\\bLui_Elle\\b", "g"), "Lui"],
  [addSeparatorsRegex("\\bLUI_ELLE\\b", "g"), "LUI"],
  [addSeparatorsRegex("\\belle_lui\\b", "g"), "lui"],
  [addSeparatorsRegex("\\bElle_Lui\\b", "g"), "Lui"],
  [addSeparatorsRegex("\\bELLE_LUI\\b", "g"), "LUI"],
  [addSeparatorsRegex("\\belles_eux\\b", "g"), "eux"],
  [addSeparatorsRegex("\\bElles_Eux\\b", "g"), "Eux"],
  [addSeparatorsRegex("\\bELLES_EUX\\b", "g"), "EUX"],
  [addSeparatorsRegex("\\beux_elles\\b", "g"), "eux"],
  [addSeparatorsRegex("\\bEux_Elles\\b", "g"), "Eux"],
  [addSeparatorsRegex("\\bEUX_ELLES\\b", "g"), "EUX"],
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
  [addSeparatorsRegex("_rice\\b", "g"), ""],
  [addSeparatorsRegex("_ices\\b", "g"), ""],
  [addSeparatorsRegex("_ice\\b", "g"), ""],
  [addSeparatorsRegex("_es\\b", "g"), "s"],
  [addSeparatorsRegex("_ES\\b", "g"), "S"],
  [addSeparatorsRegex("_se\\b", "g"), ""],
  [addSeparatorsRegex("_fe\\b", "g"), ""],
  [addSeparatorsRegex("_ve\\b", "g"), ""],
  [addSeparatorsRegex("_ives\\b", "g"), "s"],
  [addSeparatorsRegex("_IVES\\b", "g"), "S"],
  [addSeparatorsRegex("_ive\\b", "g"), ""],
  [addSeparatorsRegex("_fes\\b", "g"), "s"],
  [addSeparatorsRegex("_FES\\b", "g"), "S"],
  [addSeparatorsRegex("_ales\\b", "g"), ""],
  [addSeparatorsRegex("_euses\\b", "g"), ""],

  // Posait des problèmes avec les expressions comme « faites-les» ou « listez-les » et les noms comme « Morzy-les-Gaillardes »
  // [addSeparatorsRegex("_le\\b"), ""],
  // [addSeparatorsRegex("_les\\b"), ""],
  // [addSeparatorsRegex("_elle\\b"), ""],
  // [/(?<=\w(?<!ez|es))[·|·|·|‧|܁|.|⋅|-|•|∙|-|\/|.|-]le(?!-)\b/gi, ""],
  // [/(?<=\w(?<!ez|es))[·|·|·|‧|܁|.|⋅|-|•|∙|-|\/|.|-]les(?!-)\b/gi, ""],

  [addSeparatorsRegex("_ière\\b", "g"), ""],
  [addSeparatorsRegex("_ère\\b", "g"), ""],
  [addSeparatorsRegex("_ennes\\b", "g"), "s"],
  [addSeparatorsRegex("_ENNES\\b", "g"), "S"],
  [addSeparatorsRegex("_enne\\b", "g"), ""],
  [addSeparatorsRegex("_ne\\b", "g"), ""],
  [addSeparatorsRegex("_nes\\b", "g"), "s"],
  [addSeparatorsRegex("_NES\\b", "g"), "S"],
  // "·e·x" : combinaison féminin + neutre "x" singulier (ex: "représentant·e·x" → "représentant")
  [addSeparatorsRegex("_e_x\\b", "g"), ""],
  [addSeparatorsRegex("_E_X\\b", "g"), ""],
  // Faux positif: ne pas corriger "shift-e"
  [addSeparatorsRegex("(?<=\\w(?<!(?:s|S)hift))_e\\b", "g"), ""],

  // "x" comme marqueur neutre (ex. "adérents·x" → "adérents", "tous·x" → "tous")
  // On restreint aux vrais points médians pour éviter les faux positifs techniques
  // (ex. "grep -x", "v3.x", "usr/x" ne doivent pas être modifiés).
  [/[·‧܁⋅•∙]+x\b/g, ""],
  [/[·‧܁⋅•∙]+X\b/g, ""],

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

  // Mots spécifiques (concaténation directe avec "x")
  [/\bunxe\b/g, "un"],
  [/\bUnxe\b/g, "Un"],
  [/\btousxtes\b/g, "tous"],
  [/\bTousxtes\b/g, "Tous"],
  [/\btouxes\b/g, "tous"],
  [/\bTouxes\b/g, "Tous"],
  [/\bTOUXES\b/g, "TOUS"],
  [/\btouxe\b/g, "tout"],
  [/\bTouxe\b/g, "Tout"],
  [/\bTOUXE\b/g, "TOUT"],

  // Mots spécifiques (séparateur + "x" en fin de mot)
  // On utilise addSeparatorsRegex car le mot complet est ancré, sans risque de faux positif.
  [addSeparatorsRegex("\\btous_x\\b", "g"), "tous"],
  [addSeparatorsRegex("\\bTOUS_X\\b", "g"), "TOUS"],
  [addSeparatorsRegex("\\bTous_x\\b", "g"), "Tous"],
  [addSeparatorsRegex("\\bami_x\\b", "g"), "ami"],
  [addSeparatorsRegex("\\bAMI_X\\b", "g"), "AMI"],
  [addSeparatorsRegex("\\bAmi_x\\b", "g"), "Ami"],
  [addSeparatorsRegex("\\bamis_x\\b", "g"), "amis"],
  [addSeparatorsRegex("\\bAMIS_X\\b", "g"), "AMIS"],
  [addSeparatorsRegex("\\bAmis_x\\b", "g"), "Amis"],

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

  // Terminaisons avec séparateur + "x" (suffixes courants)
  // On utilise addSeparatorsRegex car la terminaison est suffisamment spécifique.
  [addSeparatorsRegex("ants_x\\b", "g"), "ants"],
  [addSeparatorsRegex("ANTS_X\\b", "g"), "ANTS"],
  [addSeparatorsRegex("ant_x\\b", "g"), "ant"],
  [addSeparatorsRegex("ANT_X\\b", "g"), "ANT"],
  [addSeparatorsRegex("ents_x\\b", "g"), "ents"],
  [addSeparatorsRegex("ENTS_X\\b", "g"), "ENTS"],
  [addSeparatorsRegex("ent_x\\b", "g"), "ent"],
  [addSeparatorsRegex("ENT_X\\b", "g"), "ENT"],
  [addSeparatorsRegex("és_x\\b", "g"), "és"],
  [addSeparatorsRegex("ÉS_X\\b", "g"), "ÉS"],
  [addSeparatorsRegex("é_x\\b", "g"), "é"],
  [addSeparatorsRegex("É_X\\b", "g"), "É"],
  [addSeparatorsRegex("eurs_x\\b", "g"), "eurs"],
  [addSeparatorsRegex("EURS_X\\b", "g"), "EURS"],
  [addSeparatorsRegex("eur_x\\b", "g"), "eur"],
  [addSeparatorsRegex("EUR_X\\b", "g"), "EUR"],
  [addSeparatorsRegex("ifs_x\\b", "g"), "ifs"],
  [addSeparatorsRegex("IFS_X\\b", "g"), "IFS"],
  [addSeparatorsRegex("if_x\\b", "g"), "if"],
  [addSeparatorsRegex("IF_X\\b", "g"), "IF"],
  [addSeparatorsRegex("ains_x\\b", "g"), "ains"],
  [addSeparatorsRegex("AINS_X\\b", "g"), "AINS"],
  [addSeparatorsRegex("ain_x\\b", "g"), "ain"],
  [addSeparatorsRegex("AIN_X\\b", "g"), "AIN"],

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
  [/AUTRICE/g, "AUTEUR"],
  // Les noms féminins en “eur” ne prennent pas de “e” (exceptions : heure, demeure).
  [/Auteure/g, "Auteur"],
  [/auteure/g, "auteur"],
  [/AUTEURE/g, "AUTEUR"],

  // *** C ***
  [/\bcelleux/g, "ceux"],
  [/\bCelleux/g, "Ceux"],
  [/\bCELLEUX/g, "CEUX"],
  [/\bcellui/g, "celui"],
  [/\bCellui/g, "Celui"],
  [/\bCELLUI/g, "CELUI"],
  [/\bceus\b/g, "ceux"],
  [/\bCeus\b/g, "Ceux"],
  [/\bCEUS\b/g, "CEUX"],
  [/\bcèx\b/g, "ce"],
  [/\bCèx\b/g, "Ce"],
  [/\bCÈX\b/g, "CE"],
  [/\bcopaines/g, "copains"],
  [/\bCopaines/g, "Copains"],
  [/\bCOPAINES/g, "COPAINS"],

  // *** E ***
  [/\belleux\b/g, "eux"],
  [/\bElleux\b/g, "Eux"],
  [/\bELLEUX\b/g, "EUX"],
  [/\beuxes\b/g, "eux"],
  [/\bEuxes\b/g, "Eux"],
  [/\bEUXES\b/g, "EUX"],

  // *** I ***
  [/\bIel\b/g, "Il"],
  [/\biel\b/g, "il"],
  [/\bIEL\b/g, "IL"],
  [/\bIels\b/g, "Ils"],
  [/\biels\b/g, "ils"],
  [/\bIELS\b/g, "ILS"],
  [/\billes\b/g, "ils"],
  [/\bIlles\b/g, "Ils"],
  [/\bILLES\b/g, "ILS"],

  [/teurices/g, "teurs"],
  [/TEURICES/g, "TEURS"],
  [/teurice/g, "teur"],
  [/TEURICE/g, "TEUR"],

  // PROFESSIONS
  // Afin de prendre en compte les couples type : "déterminant féminin - nom féminin - déterminant masculin - nom masculin".
  // Il faut faire l'opération de substitution en 2 étapes :
  // 1) remplacer le déterminant (s'il est au féminin singulier)
  [/une (?=[a-zA-ZÀ-ÖØ-öø-ÿ-]*trice ou un [a-zA-ZÀ-ÖØ-öø-ÿ-]*teur)/g, "un "],
  [/la (?=[a-zA-ZÀ-ÖØ-öø-ÿ-]*euse ou le [a-zA-ZÀ-ÖØ-öø-ÿ-]*eur)/g, "le "],

  // 2) remplacer la terminaison du nom
  [/trice\b ou un [a-zA-ZÀ-ÖØ-öø-ÿ-]*teur\b/g, "teur"],

  // Rétroréférence \1 = même radical (évite "élégantes et aux éléphants" → "élégants")
  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)euses\b et (?:des |les |de |aux )?\1eurs\b/g, "$1eurs"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)eurs\b et (?:des |les |de |aux )?\1euses\b/g, "$1eurs"],

  [/euse\b ou le [a-zA-ZÀ-ÖØ-öø-ÿ-]*eur\b/g, "eur"],

  [/eur\b ou la [a-zA-ZÀ-ÖØ-öø-ÿ-]*euse\b/g, "eur"],

  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)ens\b et (?:des |les |de |aux )?\1ennes\b/g, "$1ens"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)ennes\b et (?:des |les |de |aux )?\1ens\b/g, "$1ens"],

  [/en\b ou la [a-zA-ZÀ-ÖØ-öø-ÿ-]*enne\b/g, "en"],

  [/enne\b ou le [a-zA-ZÀ-ÖØ-öø-ÿ-]*en\b/g, "en"],

  // el/elle : féminin en "lles" (ex. professionnels et aux professionnelles)
  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)els\b et (?:des |les |de |aux )?\1lles\b/g, "$1els"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)elles\b et (?:des |les |de |aux )?\1els\b/g, "$1els"],

  [/el\b et la [a-zA-ZÀ-ÖØ-öø-ÿ-]*elle\b/g, "el"],

  [/elle\b et le [a-zA-ZÀ-ÖØ-öø-ÿ-]*el\b/g, "el"],

  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)euses\b et (?:des |les |de |aux )?\1eux\b/g, "$1eux"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)eux\b et (?:des |les |de |aux )?\1euses\b/g, "$1eux"],

  [/eur\b \/ [a-zA-ZÀ-ÖØ-öø-ÿ-]*euse\b/g, "eur"],
  [/eur\/[a-zA-ZÀ-ÖØ-öø-ÿ-]*euse\b/g, "eur"],

  // Doublets avec "/" et déterminants (ex: "le directeur/la directrice" → "le directeur")
  // teur/trice avec déterminants
  [/teur\s?\/\s?la [a-zA-ZÀ-ÖØ-öø-ÿ-]*trice\b/g, "teur"],
  [/teur\s?\/\s?[a-zA-ZÀ-ÖØ-öø-ÿ-]*trice\b/g, "teur"],
  // trice/teur avec déterminants (2 étapes : déterminant + nom)
  [/la (?=[a-zA-ZÀ-ÖØ-öø-ÿ-]*trice\s?\/\s?le [a-zA-ZÀ-ÖØ-öø-ÿ-]*teur\b)/g, "le "],
  [/trice\s?\/\s?le [a-zA-ZÀ-ÖØ-öø-ÿ-]*teur\b/g, "teur"],
  [/trice\s?\/\s?[a-zA-ZÀ-ÖØ-öø-ÿ-]*teur\b/g, "teur"],
  // eur/euse avec déterminants
  [/eur\s?\/\s?la [a-zA-ZÀ-ÖØ-öø-ÿ-]*euse\b/g, "eur"],
  [/la (?=[a-zA-ZÀ-ÖØ-öø-ÿ-]*euse\s?\/\s?le [a-zA-ZÀ-ÖØ-öø-ÿ-]*eur\b)/g, "le "],
  [/euse\s?\/\s?le [a-zA-ZÀ-ÖØ-öø-ÿ-]*eur\b/g, "eur"],
  [/euse\s?\/\s?[a-zA-ZÀ-ÖØ-öø-ÿ-]*eur\b/g, "eur"],
  // Variantes pluriel avec "/"
  [/teurs\s?\/\s?[a-zA-ZÀ-ÖØ-öø-ÿ-]*trices\b/g, "teurs"],
  [/trices\s?\/\s?[a-zA-ZÀ-ÖØ-öø-ÿ-]*teurs\b/g, "teurs"],
  [/eurs\s?\/\s?[a-zA-ZÀ-ÖØ-öø-ÿ-]*euses\b/g, "eurs"],
  [/euses\s?\/\s?[a-zA-ZÀ-ÖØ-öø-ÿ-]*eurs\b/g, "eurs"],
  // eur/trice (acteur/actrice) et teur/trice (directeur/directrice)
  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)eurs\b et (?:des |les |de |aux )?\1rices\b/g, "$1eurs"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)trices\b et (?:des |les |de |aux )?\1teurs\b/g, "$1teurs"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)trices\b et (?:des |les |de |aux )?\1eurs\b/g, "$1eurs"],
  [/teur ou une [a-zA-ZÀ-ÖØ-öø-ÿ-]*trice/g, "teur"],
  [/teur ou de [a-zA-ZÀ-ÖØ-öø-ÿ-]*trice/g, "teur"],

  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)antes\b et (?:des |les |de |aux )?\1ants\b/g, "$1ants"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)ants\b et (?:des |les |de |aux )?\1antes\b/g, "$1ants"],

  [/ante\b ou le [a-zA-ZÀ-ÖØ-öø-ÿ-]*ant\b/g, "ant"],
  [/ante\b ou un [a-zA-ZÀ-ÖØ-öø-ÿ-]*ant\b/g, "ant"],

  [/ant\b ou la [a-zA-ZÀ-ÖØ-öø-ÿ-]*ante\b/g, "ant"],
  [/ant\b ou une [a-zA-ZÀ-ÖØ-öø-ÿ-]*ante\b/g, "ant"],

  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)ives\b et (?:des |les |de |aux )?\1ifs\b/g, "$1ifs"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)ifs\b et (?:des |les |de |aux )?\1ives\b/g, "$1ifs"],

  [/ive\b ou le [a-zA-ZÀ-ÖØ-öø-ÿ-]*if\b/g, "if"],
  [/if\b ou la [a-zA-ZÀ-ÖØ-öø-ÿ-]*ive\b/g, "if"],

  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)çaises\b et (?:des |les |de |aux )?\1çais\b/g, "$1çais"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)çais\b et (?:des |les |de |aux )?\1çaises\b/g, "$1çais"],

  // Doublets génériques où féminin = masculin + "e"
  // Utilise une rétroréférence pour couvrir tous les mots (ex: "clientes et clients", "invitées et invités").
  // Doit être APRÈS les règles spécifiques de suffixes pour ne pas interférer.

  // Pluriel avec "et" (le déterminant "les/des/aux" ne change pas)
  [/([a-zA-ZÀ-ÖØ-öø-ÿ]+)es\b et (?:les |des |aux )?\1s\b/g, "$1s"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ]+)s\b et (?:les |des |aux )?\1es\b/g, "$1s"],
  // Singulier avec "ou" et déterminant (le déterminant fait partie du match)
  [/la ([a-zA-ZÀ-ÖØ-öø-ÿ]+)e\b ou le \1\b/g, "le $1"],
  [/une ([a-zA-ZÀ-ÖØ-öø-ÿ]+)e\b ou un \1\b/g, "un $1"],
  [/le ([a-zA-ZÀ-ÖØ-öø-ÿ]+)\b ou la \1e\b/g, "le $1"],
  [/un ([a-zA-ZÀ-ÖØ-öø-ÿ]+)\b ou une \1e\b/g, "un $1"],
  // Singulier avec "ou" sans déterminant
  [/([a-zA-ZÀ-ÖØ-öø-ÿ]+)e\b ou \1\b/g, "$1"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ]+)\b ou \1e\b/g, "$1"],
  // Slash
  [/([a-zA-ZÀ-ÖØ-öø-ÿ]+)es\s?\/\s?\1s\b/g, "$1s"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ]+)s\s?\/\s?\1es\b/g, "$1s"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ]+)e\s?\/\s?\1\b/g, "$1"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ]+)\s?\/\s?\1e\b/g, "$1"],
];
