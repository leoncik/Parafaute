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
  // Ligatures (oe → œ)
  [/\boe/gi, preserveCase("œ")],       // Mots commençant par oe (œuvre, œil, œuf…)
  [/oeu\b/gi, preserveCase("œu")],     // Suffixe -oeu (vœu…)
  [/oeur\b/gi, preserveCase("œur")],   // Suffixe -oeur (cœur…)
  [/oenix\b/gi, preserveCase("œnix")], // Suffixe -oenix (phœnix…)
  [/oetus\b/gi, preserveCase("œtus")], // Suffixe -oetus (fœtus…)
  [/oeud\b/gi, preserveCase("œud")],   // Suffixe -oeud (nœud…)
];
