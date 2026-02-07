const fautesCourantes = [
  //  Structure :
  // [/faute/]: "correction",
  // /gi + preserveCase couvre minuscule, Majuscule initiale et TOUT MAJUSCULE.

  // Expressions
  [/en suspend\b/gi, preserveCase("en suspens")],

  [/sa va\b/gi, preserveCase("ça va")],

  [/si il\b/gi, preserveCase("s'il")],

  [/il s'en suit un vif débat\b/gi, preserveCase("s'ensuit un vif débat")],

  [/il s'en suivit un vif débat\b/gi, preserveCase("s'ensuivit un vif débat")],

  [/il s'en est suivi un vif débat\b/gi, preserveCase("s'est ensuivi un vif débat")],

  [/le problème s'empire\b/gi, preserveCase("le problème empire")],

  [/il empire le problème\b/gi, preserveCase("il fait empirer le problème")],

  [/kilomètre-heure\b/gi, preserveCase("kilomètre par heure")],

  [/kilowatt par heure\b/gi, preserveCase("kilowattheure")],

  [/y a t'il\b/gi, preserveCase("y a-t-il")],

  [/aux dépends\b/gi, preserveCase("aux dépens")],
  [/chiffre d'affaire\b/gi, preserveCase("chiffre d'affaires")],
  [/il y à\b/gi, preserveCase("il y a")],

  [/quant même\b/gi, preserveCase("quand même")],
  [/avoir tord\b/gi, preserveCase("avoir tort")],
  [/pallier à /gi, preserveCase("pallier ")],

  // VOCABULAIRE

  // *** A ***
  [/appercevoir\b/gi, preserveCase("apercevoir")],
  [/aquérir\b/gi, preserveCase("acquérir")],
  [/applatir\b/gi, preserveCase("aplatir")],
  [/acceuil\b/gi, preserveCase("accueil")],
  [/aurtographier\b/gi, preserveCase("autographier")],

  // *** B ***
  [/banquaire\b/gi, preserveCase("bancaire")],
  [/bizare\b/gi, preserveCase("bizarre")],
  [/bizard\b/gi, preserveCase("bizarre")],
  [/brebi\b/gi, preserveCase("brebis")],

  // *** C ***
  [/cauchemard\b/gi, preserveCase("cauchemar")],
  [/concour\b/gi, preserveCase("concours")],

  // *** D ***
  [/disfonctionnements\b/gi, preserveCase("dysfonctionnements")],
  [/disfonctionnement\b/gi, preserveCase("dysfonctionnement")],

  // *** E ***
  [/enmener\b/gi, preserveCase("emmener")],
  [/échalotte\b/gi, preserveCase("échalote")],
  [/exepté\b/gi, preserveCase("excepté")],

  // *** F ***
  [/faîtes\b/gi, preserveCase("faites")],

  // *** G ***
  [/\bgiraffe\b/gi, preserveCase("girafe")],

  // *** H ***
  [/hormi\b/gi, preserveCase("hormis")],

  // *** I ***
  [/infractus\b/gi, preserveCase("infarctus")],
  [/inombrable\b/gi, preserveCase("innombrable")],

  // *** J ***
  [/(des|les|ces|mes|nos|ses|tes) jeux vidéos/gi, "$1 jeux vidéo"],

  // *** L ***
  [/language\b/gi, preserveCase("langage")],

  // *** M ***
  [/magazin\b/gi, preserveCase("magasin")],

  // *** O ***
  [/occassion\b/gi, preserveCase("occasion")],

  // *** R ***
  [/repéter\b/gi, preserveCase("répéter")],

  // *** P ***
  [/parmis\b/gi, preserveCase("parmi")],
  [/pillule\b/gi, preserveCase("pilule")],
  [/plusieur\b/gi, preserveCase("plusieurs")],

  // *** S ***
  [/s'appitoyer\b/gi, preserveCase("s'apitoyer")],
  [/syphon\b/gi, preserveCase("siphon")],

  // *** U ***
  [/univer\b/gi, preserveCase("univers")],
];
