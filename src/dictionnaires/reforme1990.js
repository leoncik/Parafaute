// Dictionnaire pour convertir l'orthographe de 1990 vers l'orthographe classique
// Structure : [/motModerne/g, "motClassique"]
const reforme1990ToClassique = [
  // VOCABULAIRE

  // *** A ***
  [/ccroit\b/g, "ccroît"],

  // *** B ***
  [/\bBrul/g, "Brûl"],
  [/\bbrul/g, "brûl"],

  // *** C ***
  [/Cout\b/g, "Coût"],
  [/cout\b/g, "coût"],
  [/Connaitre\b/g, "Connaître"],
  [/connaitre\b/g, "connaître"],

  // *** D ***
  [/ouçâtre\b/g, "ouceâtre"],
  [/isparaitr/g, "isparaîtr"],

  // *** E ***
  [/Évènement\b/g, "Événement"],
  [/évènement\b/g, "événement"],
  [/nvoutant/g, "nvoûtant"],
  [/ntraine\b/g, "ntraîne"],
  [/nchainement\b/g, "nchaînement"],

  // *** G ***
  [/\bGout\b/g, "Goût"],
  [/\bgout\b/g, "goût"],

  // *** I ***
  [/\bIle\b/g, "Île"],
  [/\bile\b/g, "île"],

  // *** M ***
  [/Maitre\b/g, "Maître"],
  [/maitre\b/g, "maître"],

  // *** N ***
  [/énufar/g, "énuphar"],

  // *** O ***
  [/Ognon\b/g, "Oignon"],
  [/ognon\b/g, "oignon"],

  // *** P ***
  [/plait\b/g, "plaît"],
  [/\bparait\b/g, "paraît"],

  // *** S ***
  [/agefemme/g, "age-femme"],
  [/\bSurement/g, "Sûrement"],
  [/\bsurement/g, "sûrement"],

  // Tréma
  [/güe/g, "guë"],
  [/güi/g, "guï"],
];

// Dictionnaire pour convertir l'orthographe classique vers l'orthographe de 1990
// Structure : [/motClassique/g, "motModerne"]
const reforme1990ToNouvelle = [
  // VOCABULAIRE

  // *** A ***
  [/ccroît\b/g, "ccroit"],

  // *** B ***
  [/\bBrûl/g, "Brul"],
  [/\bbrûl/g, "brul"],

  // *** C ***
  [/Coût\b/g, "Cout"],
  [/coût\b/g, "cout"],
  [/Connaître\b/g, "Connaitre"],
  [/connaître\b/g, "connaitre"],

  // *** D ***
  [/ouceâtre\b/g, "ouçâtre"],
  [/isparaîtr/g, "isparaitr"],

  // *** E ***
  [/Événement\b/g, "Évènement"],
  [/événement\b/g, "évènement"],
  [/nvoûtant/g, "nvoutant"],
  [/ntraîne\b/g, "ntraine"],
  [/nchaînement\b/g, "nchainement"],

  // *** G ***
  [/\bGoût\b/g, "Gout"],
  [/\bgoût\b/g, "gout"],

  // *** I ***
  [/\bÎle\b/g, "Ile"],
  [/\bîle\b/g, "ile"],

  // *** M ***
  [/Maître\b/g, "Maitre"],
  [/maître\b/g, "maitre"],

  // *** N ***
  [/énuphar/g, "énufar"],

  // *** O ***
  [/Oignon\b/g, "Ognon"],
  [/oignon\b/g, "ognon"],

  // *** P ***
  [/plaît\b/g, "plait"],
  [/\bparaît\b/g, "parait"],

  // *** S ***
  [/age-femme/g, "agefemme"],
  [/\bSûrement/g, "Surement"],
  [/\bsûrement/g, "surement"],

  // Tréma
  [/guë/g, "güe"],
  [/guï/g, "güi"],
];
