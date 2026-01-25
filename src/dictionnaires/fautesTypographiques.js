const fautesTypographiques = [
  //  Structure :
  // [/faute/]: "correction",

  // Ajout d'espace fine insécable devant les signes de ponctuation double.
  // Exception : pas d'espace fine insécable devant "http" ou "https".
  [/(?<=\w)!/g, " !"],
  [/(?<=\w)!|\u0020!/g, " !"],
  // Espace fine insécable si le point d'interrogation n'est pas suivi d'un mot
  // et s'il n'est pas précédé par un espace
  [/(?<=\w)\?(?!\w)|\u0020\?(?!\w)/g, " ?"],
  [/(?<=\w(?<!http|https)):|\u0020:/gi, " :"],
  // Espace insécable pour les guillemets
  [/(?<=«)\u0020|(?<=«)\b/g, " "],
  [/\u0020(?=»)|\b(?=»)/g, " "],
  // Pas d'espace avant une virgule ou un point.
  [/(?<=\w) ,/g, ","],
  [/(?<=\w) \./g, "."],
  // Apostrophe courbe
  [/(?<=\w)'/g, "’"],
  // Ligatures
  [/\bOe/g, "Œ"],
  [/\boe/g, "œ"],
  [/oeu\b/g, "œu"],
  [/oeur\b/g, "œur"],
  [/Oeuf\b/g, "Œuf"],
  [/oeuf\b/g, "œuf"],
  [/Oeil\b/g, "Œil"],
  [/oeil\b/g, "œil"],
  [/oenix\b/g, "œnix"],
  [/oetus\b/g, "œtus"],
  [/oeud\b/g, "œud"],
];
