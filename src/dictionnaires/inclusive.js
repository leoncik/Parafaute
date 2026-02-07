// Fonction utilitaire : préserve la casse du mot d'origine (minuscule, Majuscule initiale, TOUT MAJUSCULE).
// Utilisée aussi par reforme1990.js (chargé après inclusive.js dans le manifest).
function preserveCase(replacement) {
  return (match) => {
    // TOUT MAJUSCULE (ex: "IEL" → "IL")
    if (match === match.toUpperCase() && match !== match.toLowerCase()) {
      return replacement.toUpperCase();
    }
    // Majuscule initiale (ex: "Iel" → "Il")
    if (
      match[0] === match[0].toUpperCase() &&
      match[0] !== match[0].toLowerCase()
    ) {
      return replacement[0].toUpperCase() + replacement.slice(1);
    }
    // minuscule (ex: "iel" → "il")
    return replacement;
  };
}

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
  // /gi + preserveCase couvre minuscule, Majuscule initiale et TOUT MAJUSCULE.
  [/le ou la/gi, preserveCase("le")],
  [/la ou le/gi, preserveCase("le")],
  [/celles et ceux/gi, preserveCase("ceux")],
  [/ceux et celles/gi, preserveCase("ceux")],
  [/celui\/celle/gi, preserveCase("celui")],
  [/celle\/celui/gi, preserveCase("celui")],
  [/celui ou celle/gi, preserveCase("celui")],
  [/celle ou celui/gi, preserveCase("celui")],
  // Pronoms sujets : il/iel et elle/iel avec "ou" (ex. "il ou iel" → "il")
  [/\bil ou iel\b/gi, preserveCase("il")],
  [/\biel ou il\b/gi, preserveCase("il")],
  [/\belle ou iel\b/gi, preserveCase("il")],
  [/\biel ou elle\b/gi, preserveCase("il")],
  [/\bils ou iels\b/gi, preserveCase("ils")],
  [/\biels ou ils\b/gi, preserveCase("ils")],
  [/\belles ou iels\b/gi, preserveCase("ils")],
  [/\biels ou elles\b/gi, preserveCase("ils")],
  [/auteur\/autrice/gi, preserveCase("auteur")],
  [/à tous et à toutes/gi, preserveCase("à tous")],
  [/à tous et toutes/gi, preserveCase("à tous")],
  [/à toutes et tous/gi, preserveCase("à tous")],
  [/à toutes et à tous/gi, preserveCase("à tous")],
  // Avec fautes d'orthographe :
  [/à toute et à tous/gi, preserveCase("à tous")],
  [/à tous et à toute/gi, preserveCase("à tous")],
  [/toutes et tous/gi, preserveCase("tous")],
  [/tous et toutes/gi, preserveCase("tous")],
  [/toustes/gi, preserveCase("tous")],
  [/\btouste\b/gi, preserveCase("tout")],

  // Formes compactes avec parenthèses (déterminants)
  // Doit être AVANT la section typographie pour que "la(e)" → "le"
  // et non "la(e)" → "la" via la règle générique (e).
  // le(a) → le, la(e) → le
  [/\ble\s?\(a\)/gi, preserveCase("le")],
  [/\bla\s?\(e\)/gi, preserveCase("le")],
  // un(e) → un : couvert par la règle (e|E) ci-dessous
  // du(de la) → du
  [/\bdu\s?\(de la\)/gi, preserveCase("du")],
  // au(à la) → au
  [/\bau\s?\(à la\)/gi, preserveCase("au")],
  // il(elle) → il, ils(elles) → ils
  [/\bil\s?\(elle\)/gi, preserveCase("il")],
  [/\bils\s?\(elles\)/gi, preserveCase("ils")],

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
  // Les patterns commençant par une lettre utilisent /gi + preserveCase (flag par défaut de addSeparatorsRegex).
  // Les patterns commençant par "_" (= séparateur) gardent des doublets minuscule/MAJUSCULE explicites,
  // car preserveCase ne peut pas déterminer la casse depuis un caractère séparateur.

  [addSeparatorsRegex("tou_te_s"), preserveCase("tous")],
  [addSeparatorsRegex("tou_tes"), preserveCase("tous")],
  [addSeparatorsRegex("teur_trice_s"), preserveCase("teurs")],
  [addSeparatorsRegex("teur_euse_s"), preserveCase("teurs")],
  [addSeparatorsRegex("teurs_trices\\b"), preserveCase("teurs")],
  [addSeparatorsRegex("teurs_euses\\b"), preserveCase("teurs")],
  [addSeparatorsRegex("eur_rice_s"), preserveCase("eurs")],
  [addSeparatorsRegex("tous_tes"), preserveCase("tous")],
  [addSeparatorsRegex("er_ère_s"), preserveCase("ers")],
  [addSeparatorsRegex("s_e_s"), preserveCase("s")],

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

  [addSeparatorsRegex("le_a\\b"), preserveCase("le")], // Ajout de "\b" pour les cas comme "Nouvelle-Aquitaine".
  [addSeparatorsRegex("le_la\\b"), preserveCase("le")],
  [addSeparatorsRegex("la_le\\b"), preserveCase("le")],
  // la·e → le (ex: "Je la·e respecte" → "Je le respecte")
  [addSeparatorsRegex("\\bla_e\\b"), preserveCase("le")],
  // Articles partitifs : du·de la → du
  [addSeparatorsRegex("\\bdu_de la\\b"), preserveCase("du")],
  [addSeparatorsRegex("\\bde la_du\\b"), preserveCase("du")],
  // Déterminants possessifs : mon·ma, ton·ta, son·sa
  [addSeparatorsRegex("\\bmon_ma\\b"), preserveCase("mon")],
  [addSeparatorsRegex("\\bma_mon\\b"), preserveCase("mon")],
  [addSeparatorsRegex("\\bton_ta\\b"), preserveCase("ton")],
  [addSeparatorsRegex("\\bta_ton\\b"), preserveCase("ton")],
  [addSeparatorsRegex("\\bson_sa\\b"), preserveCase("son")],
  [addSeparatorsRegex("\\bsa_son\\b"), preserveCase("son")],
  // Formes abrégées des possessifs (ex: "son·a cousin·e")
  [addSeparatorsRegex("\\bmon_a\\b"), preserveCase("mon")],
  [addSeparatorsRegex("\\bton_a\\b"), preserveCase("ton")],
  [addSeparatorsRegex("\\bson_a\\b"), preserveCase("son")],
  [addSeparatorsRegex("en_ennes\\b"), preserveCase("ens")],
  [addSeparatorsRegex("en_enne\\b"), preserveCase("en")],
  [addSeparatorsRegex("en_nes\\b"), preserveCase("ens")],
  [addSeparatorsRegex("ifs_ives\\b"), preserveCase("ifs")],
  [addSeparatorsRegex("if_ves\\b"), preserveCase("ifs")],
  [addSeparatorsRegex("if_ive\\b"), preserveCase("if")],
  [addSeparatorsRegex("eur_ses\\b"), preserveCase("eurs")],
  [addSeparatorsRegex("eurs_ses\\b"), preserveCase("eurs")],
  [addSeparatorsRegex("eaux_elles\\b"), preserveCase("eaux")],
  [addSeparatorsRegex("eau_elle\\b"), preserveCase("eau")],
  [addSeparatorsRegex("teur_trice"), preserveCase("teur")],
  [addSeparatorsRegex("\\bceux_elles"), preserveCase("ceux")],
  // Pronoms démonstratifs : celui·elle → celui
  [addSeparatorsRegex("\\bcelui_elle\\b"), preserveCase("celui")],
  [addSeparatorsRegex("cet_te"), preserveCase("ce")],
  [addSeparatorsRegex("eux_ses\\b"), preserveCase("eux")],
  [addSeparatorsRegex("eux_euse\\b"), preserveCase("eux")],
  [addSeparatorsRegex("s_es\\b"), preserveCase("s")],
  [addSeparatorsRegex("ant_e\\b"), preserveCase("ant")],
  [addSeparatorsRegex("eur_se\\b"), preserveCase("eur")],
  [addSeparatorsRegex("if_ve\\b"), preserveCase("if")],
  [addSeparatorsRegex("é_e\\b"), preserveCase("é")],
  [addSeparatorsRegex("teur_euse\\b"), preserveCase("teur")],
  [addSeparatorsRegex("eur_rice\\b"), preserveCase("eur")],
  [addSeparatorsRegex("eur_euse\\b"), preserveCase("eur")],
  [addSeparatorsRegex("eurs_rices\\b"), preserveCase("eurs")],
  [addSeparatorsRegex("eurs_euses\\b"), preserveCase("eurs")],
  [addSeparatorsRegex("ains_es\\b"), preserveCase("ains")],
  [addSeparatorsRegex("un_une\\b"), preserveCase("un")],
  [addSeparatorsRegex("un_e\\b"), preserveCase("un")],
  [/un\[e\]/gi, preserveCase("un")],
  // Chaînes de pronoms avec séparateurs (elle·iel·il, elle·il, etc.)
  // Les formes à 3 pronoms doivent précéder les formes à 2 pronoms.
  [addSeparatorsRegex("\\belle_iel_il\\b"), preserveCase("il")],
  [addSeparatorsRegex("\\bil_iel_elle\\b"), preserveCase("il")],
  [addSeparatorsRegex("\\belles_iels_ils\\b"), preserveCase("ils")],
  [addSeparatorsRegex("\\bils_iels_elles\\b"), preserveCase("ils")],
  // elle·iel / il·iel (2 pronoms avec iel)
  [addSeparatorsRegex("\\belle_iel\\b"), preserveCase("il")],
  [addSeparatorsRegex("\\bil_iel\\b"), preserveCase("il")],
  [addSeparatorsRegex("\\belles_iels\\b"), preserveCase("ils")],
  [addSeparatorsRegex("\\bils_iels\\b"), preserveCase("ils")],
  // elle·il / il·elle (sans iel)
  [addSeparatorsRegex("\\belle_il\\b"), preserveCase("il")],
  [addSeparatorsRegex("\\belles_ils\\b"), preserveCase("ils")],
  // Pronoms compléments : lui·elle → lui, elles·eux → eux
  [addSeparatorsRegex("\\blui_elle\\b"), preserveCase("lui")],
  [addSeparatorsRegex("\\belle_lui\\b"), preserveCase("lui")],
  [addSeparatorsRegex("\\belles_eux\\b"), preserveCase("eux")],
  [addSeparatorsRegex("\\beux_elles\\b"), preserveCase("eux")],
  // il·elle / ils·elles (il en premier, simplifié avec /gi + preserveCase)
  [addSeparatorsRegex("il_elle\\b"), preserveCase("il")],
  [addSeparatorsRegex("ils_elles\\b"), preserveCase("ils")],

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
  [addSeparatorsRegex("_ives\\b", "g"), "s"],
  [addSeparatorsRegex("_IVES\\b", "g"), "S"],
  [addSeparatorsRegex("_ive\\b"), ""],
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
  [addSeparatorsRegex("_ennes\\b", "g"), "s"],
  [addSeparatorsRegex("_ENNES\\b", "g"), "S"],
  [addSeparatorsRegex("_enne\\b"), ""],
  [addSeparatorsRegex("_ne\\b"), ""],
  [addSeparatorsRegex("_nes\\b", "g"), "s"],
  [addSeparatorsRegex("_NES\\b", "g"), "S"],
  // "·e·x" : combinaison féminin + neutre "x" singulier (ex: "représentant·e·x" → "représentant")
  [addSeparatorsRegex("_e_x\\b"), ""],
  // Faux positif: ne pas corriger "shift-e"
  [addSeparatorsRegex("(?<=\\w(?<!shift))_e\\b"), ""],

  // "x" comme marqueur neutre (ex. "adérents·x" → "adérents", "tous·x" → "tous")
  // On restreint aux vrais points médians pour éviter les faux positifs techniques
  // (ex. "grep -x", "v3.x", "usr/x" ne doivent pas être modifiés).
  [/[·‧܁⋅•∙]+x\b/gi, ""],

  // Gestions spécifiques pour "-le" pour inclure les expressions comme "Teste-le !" et lieux comme "Sennecey-le-Grand"
  [addSeparatorsRegex("il_le(?![-])\\b"), preserveCase("il")],
  [addSeparatorsRegex("ils_les(?![-])\\b"), preserveCase("ils")],
  [addSeparatorsRegex("el_le(?![-])\\b"), preserveCase("el")],

  // ÉCRITURE INCLUSIVE AVEC "X"
  // Le "x" est parfois utilisé comme alternative au point médian
  // (ex : "étudiantxe" au lieu de "étudiant·e").
  // Contrairement au point médian, le "x" est une lettre ordinaire, ce qui nécessite
  // des règles spécifiques pour éviter les faux positifs (axe, luxe, fixe, etc.).

  // Mots spécifiques (concaténation directe avec "x")
  [/\bunxe\b/gi, preserveCase("un")],
  [/\btousxtes\b/gi, preserveCase("tous")],
  [/\btouxes\b/gi, preserveCase("tous")],
  [/\btouxe\b/gi, preserveCase("tout")],

  // Mots spécifiques (séparateur + "x" en fin de mot)
  // On utilise addSeparatorsRegex car le mot complet est ancré, sans risque de faux positif.
  [addSeparatorsRegex("\\btous_x\\b"), preserveCase("tous")],
  [addSeparatorsRegex("\\bami_x\\b"), preserveCase("ami")],
  [addSeparatorsRegex("\\bamis_x\\b"), preserveCase("amis")],

  // Terminaisons composées (suffixe féminin complexe après "x")
  [/teurxtrices\b/gi, preserveCase("teurs")],
  [/teurxtrice\b/gi, preserveCase("teur")],
  [/eurxeuses\b/gi, preserveCase("eurs")],
  [/eurxeuse\b/gi, preserveCase("eur")],
  [/eurxrices\b/gi, preserveCase("eurs")],
  [/eurxrice\b/gi, preserveCase("eur")],
  [/ifxves\b/gi, preserveCase("ifs")],
  [/ifxve\b/gi, preserveCase("if")],
  [/enxnes\b/gi, preserveCase("ens")],
  [/enxne\b/gi, preserveCase("en")],

  // Terminaisons avec séparateur + "x" (suffixes courants)
  // On utilise addSeparatorsRegex car la terminaison est suffisamment spécifique.
  [addSeparatorsRegex("ants_x\\b"), preserveCase("ants")],
  [addSeparatorsRegex("ant_x\\b"), preserveCase("ant")],
  [addSeparatorsRegex("ents_x\\b"), preserveCase("ents")],
  [addSeparatorsRegex("ent_x\\b"), preserveCase("ent")],
  [addSeparatorsRegex("és_x\\b"), preserveCase("és")],
  [addSeparatorsRegex("é_x\\b"), preserveCase("é")],
  [addSeparatorsRegex("eurs_x\\b"), preserveCase("eurs")],
  [addSeparatorsRegex("eur_x\\b"), preserveCase("eur")],
  [addSeparatorsRegex("ifs_x\\b"), preserveCase("ifs")],
  [addSeparatorsRegex("if_x\\b"), preserveCase("if")],
  [addSeparatorsRegex("ains_x\\b"), preserveCase("ains")],
  [addSeparatorsRegex("ain_x\\b"), preserveCase("ain")],

  // Terminaison générique : consonne ou voyelle accentuée + "xe(s)"
  // Les mots français courants en "-xe" sont précédés d'une voyelle
  // non accentuée (axe, boxe, fixe, luxe...), ce qui les exclut de cette règle.
  [/(?<=[bcdfghjklmnpqrstvwyzéèêëàâùûîïôö])xes\b/gi, preserveCase("s")],
  [/(?<=[bcdfghjklmnpqrstvwyzéèêëàâùûîïôö])xe\b/gi, ""],

  // VOCABULAIRE DIVERS
  // *** A ***
  [/autrice/gi, preserveCase("auteur")],
  // Les noms féminins en "eur" ne prennent pas de "e" (exceptions : heure, demeure).
  [/auteure/gi, preserveCase("auteur")],

  // *** C ***
  [/\bcelleux/gi, preserveCase("ceux")],
  [/\bcellui/gi, preserveCase("celui")],
  [/\bceus\b/gi, preserveCase("ceux")],
  [/\bceuxes\b/gi, preserveCase("ceux")],
  [/\bcèx\b/gi, preserveCase("ce")],
  [/\bcopaines/gi, preserveCase("copains")],

  // *** E ***
  [/\belleux\b/gi, preserveCase("eux")],
  [/\beuxes\b/gi, preserveCase("eux")],

  // *** I ***
  [/\biel\b/gi, preserveCase("il")],
  [/\biels\b/gi, preserveCase("ils")],
  [/\billes\b/gi, preserveCase("ils")],

  [/teurices/gi, preserveCase("teurs")],
  [/teurice/gi, preserveCase("teur")],

  // PROFESSIONS
  // Afin de prendre en compte les couples type : "déterminant féminin - nom féminin - déterminant masculin - nom masculin".
  // Il faut faire l'opération de substitution en 2 étapes :
  // 1) remplacer le déterminant (s'il est au féminin singulier)
  [/une (?=[a-zA-ZÀ-ÖØ-öø-ÿ-]*trice ou un [a-zA-ZÀ-ÖØ-öø-ÿ-]*teur)/g, "un "],
  [/la (?=[a-zA-ZÀ-ÖØ-öø-ÿ-]*euse ou le [a-zA-ZÀ-ÖØ-öø-ÿ-]*eur)/g, "le "],

  // 2) remplacer la terminaison du nom
  [/trice\b ou un [a-zA-ZÀ-ÖØ-öø-ÿ-]*teur\b/g, "teur"],

  // Rétroréférence \1 = même radical (évite "élégantes et aux éléphants" → "élégants")
  [
    /([a-zA-ZÀ-ÖØ-öø-ÿ-]+)euses\b et (?:des |les |de |aux )?\1eurs\b/g,
    "$1eurs",
  ],
  [
    /([a-zA-ZÀ-ÖØ-öø-ÿ-]+)eurs\b et (?:des |les |de |aux )?\1euses\b/g,
    "$1eurs",
  ],

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
  [
    /la (?=[a-zA-ZÀ-ÖØ-öø-ÿ-]*trice\s?\/\s?le [a-zA-ZÀ-ÖØ-öø-ÿ-]*teur\b)/g,
    "le ",
  ],
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
  [
    /([a-zA-ZÀ-ÖØ-öø-ÿ-]+)eurs\b et (?:des |les |de |aux )?\1rices\b/g,
    "$1eurs",
  ],
  [
    /([a-zA-ZÀ-ÖØ-öø-ÿ-]+)trices\b et (?:des |les |de |aux )?\1teurs\b/g,
    "$1teurs",
  ],
  [
    /([a-zA-ZÀ-ÖØ-öø-ÿ-]+)trices\b et (?:des |les |de |aux )?\1eurs\b/g,
    "$1eurs",
  ],
  [/teur ou une [a-zA-ZÀ-ÖØ-öø-ÿ-]*trice/g, "teur"],
  [/teur ou de [a-zA-ZÀ-ÖØ-öø-ÿ-]*trice/g, "teur"],

  [
    /([a-zA-ZÀ-ÖØ-öø-ÿ-]+)antes\b et (?:des |les |de |aux )?\1ants\b/g,
    "$1ants",
  ],
  [
    /([a-zA-ZÀ-ÖØ-öø-ÿ-]+)ants\b et (?:des |les |de |aux )?\1antes\b/g,
    "$1ants",
  ],

  [/ante\b ou le [a-zA-ZÀ-ÖØ-öø-ÿ-]*ant\b/g, "ant"],
  [/ante\b ou un [a-zA-ZÀ-ÖØ-öø-ÿ-]*ant\b/g, "ant"],

  [/ant\b ou la [a-zA-ZÀ-ÖØ-öø-ÿ-]*ante\b/g, "ant"],
  [/ant\b ou une [a-zA-ZÀ-ÖØ-öø-ÿ-]*ante\b/g, "ant"],

  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)ives\b et (?:des |les |de |aux )?\1ifs\b/g, "$1ifs"],
  [/([a-zA-ZÀ-ÖØ-öø-ÿ-]+)ifs\b et (?:des |les |de |aux )?\1ives\b/g, "$1ifs"],

  [/ive\b ou le [a-zA-ZÀ-ÖØ-öø-ÿ-]*if\b/g, "if"],
  [/if\b ou la [a-zA-ZÀ-ÖØ-öø-ÿ-]*ive\b/g, "if"],

  [
    /([a-zA-ZÀ-ÖØ-öø-ÿ-]+)çaises\b et (?:des |les |de |aux )?\1çais\b/g,
    "$1çais",
  ],
  [
    /([a-zA-ZÀ-ÖØ-öø-ÿ-]+)çais\b et (?:des |les |de |aux )?\1çaises\b/g,
    "$1çais",
  ],

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
